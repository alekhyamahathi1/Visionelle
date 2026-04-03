from sentence_transformers import SentenceTransformer
from sklearn.ensemble import IsolationForest
from sklearn.cluster import KMeans
import numpy as np
import joblib
import os

class HybridModel:
    def __init__(self):
        self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
        self.anomaly = IsolationForest(contamination=0.15, random_state=42)
        self.cluster = KMeans(n_clusters=3, random_state=42)  # 0:SAFE, 1:FAKE, 2:HARMFUL approx
        self.is_fitted = False

    def train(self, texts):
        if not texts:
            return
        embeddings = self.embedder.encode(texts)
        
        # Unsupervised anomaly detection
        self.anomaly.fit(embeddings)
        
        # Clustering for multi-class
        self.cluster.fit(embeddings)
        self.is_fitted = True
        
        print(f"Trained on {len(texts)} texts | embeddings shape: {embeddings.shape}")

    def incremental_fit(self, new_texts):
        if self.is_fitted and new_texts:
            new_emb = self.embedder.encode(new_texts)
            # Partial fit approximation (refit with combined if small)
            if hasattr(self, 'known_embeddings'):
                combined = np.vstack([self.known_embeddings, new_emb])
            else:
                combined = new_emb
            self.train([t for t in new_texts])  # Retrain on new
            self.known_embeddings = new_emb

    def predict(self, text):
        vec = self.embedder.encode([text]).flatten()
        
        # Anomaly first
        anomaly_score = self.anomaly.predict(vec.reshape(1, -1))[0]
        if anomaly_score == -1:
            return {"category": "HARMFUL", "confidence": 0.95, "method": "anomaly"}
        
        # Cluster for fine-grained
        if self.is_fitted:
            cluster_id = self.cluster.predict(vec.reshape(1, -1))[0]
            categories = ["SAFE", "FAKE", "HARMFUL"]  # Approximate mapping
            conf = 0.8 - abs(cluster_id - 0) * 0.1  # Bias to SAFE
            return {"category": categories[cluster_id], "confidence": conf, "method": "cluster"}
        
        return {"category": "SAFE", "confidence": 0.7, "method": "fallback"}

    def save(self, model_path="model.joblib", emb_path="embeddings.npy"):
        joblib.dump(self.anomaly, model_path)
        joblib.dump(self.cluster, model_path.replace('.joblib', '_kmeans.joblib'))
        print("Model saved")

    @classmethod
    def load(cls, model_path="model.joblib"):
        model = cls()
        model.anomaly = joblib.load(model_path)
        kmeans_path = model_path.replace('.joblib', '_kmeans.joblib')
        if os.path.exists(kmeans_path):
            model.cluster = joblib.load(kmeans_path)
        model.is_fitted = True
        return model
