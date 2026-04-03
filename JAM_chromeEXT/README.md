# Jam Extension - Unsupervised Real-Time Content Safety

## Setup
1. Python deps: `pip install fastapi uvicorn sentence-transformers scikit-learn numpy joblib`
2. Start AI server: `uvicorn server:app --host 0.0.0.0 --port 8000 --reload`
3. Load extension in chrome://extensions/ (developer mode)
4. Browse - monitors in real-time, queues data for unsupervised learning

## Features
- **Expanded Dataset**: 500+ examples (SAFE/FAKE/HARMFUL)
- **Unsupervised Model**: IsolationForest anomalies + KMeans clusters, incremental train
- **Real-time**: Scans pages/inputs every 5s, low-conf -> queue -> retrain batches
- **Server**: /analyze, /train/batch, persists model.joblib
- **UI**: Popup shows dataset size, queue length, logs

## Test Server
```bash
curl -X POST http://localhost:8000/analyze \\
  -H "Content-Type: application/json" \\
  -d '{"text":"how to hack accounts"}'
```

## Files
- `expanded_dataset.js`: Large training data
- `model.py`: Enhanced unsupervised model
- `server.py`: FastAPI endpoints
- JS files: Queuing, scanning, UI updates

Dataset grows automatically from web browsing!


