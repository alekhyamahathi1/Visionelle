from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from model import HybridModel
import joblib
import numpy as np
import os
import uvicorn
from sentence_transformers import SentenceTransformer

app = FastAPI(title="Jam AI Server - Unsupervised Content Classifier")

# Global model instance
model = None
MODEL_PATH = "model.joblib"
EMBEDDINGS_PATH = "embeddings.npy"

class TextRequest(BaseModel):
    text: str

class BatchRequest(BaseModel):
    texts: list[str]
    labels: list[str] = None  # Optional for unsupervised

@app.on_event("startup")
async def load_model():
    global model
    model = HybridModel()
    if os.path.exists(MODEL_PATH):
        model.anomaly = joblib.load(MODEL_PATH)
        print("Loaded saved IsolationForest model")
    if os.path.exists(EMBEDDINGS_PATH):
        # Load last embeddings for reference
        print("Loaded saved embeddings")

@app.post("/analyze")
async def analyze(request: TextRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    result = model.predict(request.text)
    return result

@app.post("/train/batch")
async def train_batch(request: BatchRequest):
    global model
    if model is None:
        raise HTTPException(status_code=500, detail="Model not initialized")
    
    texts = request.texts
    if len(texts) == 0:
        return {"status": "no data"}
    
    # Incremental train (unsupervised)
    model.train(texts)
    
    # Save model
    joblib.dump(model.anomaly, MODEL_PATH)
    
    np.save(EMBEDDINGS_PATH, model.embedder.encode(texts))
    print(f"Trained on batch of {len(texts)} texts")
    return {"status": "trained", "count": len(texts)}

@app.post("/retrain/full")
async def retrain_full(request: BatchRequest):
    global model
    texts = request.texts
    model.train(texts)  # Full retrain on all data
    joblib.dump(model.anomaly, MODEL_PATH)
    return {"status": "full retrain complete"}

@app.get("/status")
async def status():
    return {"model_loaded": model is not None, "model_path": MODEL_PATH}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

