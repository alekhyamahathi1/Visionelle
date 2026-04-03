# Jam Extension - Unsupervised AI Enhancement TODO
Current Progress: 0/14 steps complete

## Approved Plan Breakdown

### Phase 1: Dataset Expansion (Steps 1-3)
- [x] 1. Create expanded_dataset.js with 500+ synthetic SAFE/FAKE/HARMFUL examples.
- [x] 2. Update dataset.js to import expanded data and add data export fn.

**Progress: 2/14 complete**
**Next: Phase 1 step 3 - Data collection in content.js**
- [x] 3. Add data collection logic to content.js (queue page snippets to storage).

**Progress: 7/14 complete**
**Next: Phase 3 step 8 - Update popup.js for dataset size/retrain status**

### Phase 2 Complete:
- [x] 4. Extend model.py: add save/load, incremental fit, KMeans clustering for 3 classes.
- [x] 5. Create server.py (FastAPI): /analyze, /train/batch, /retrain/full endpoints.
- [x] 6. Update background.js: unsupervised queue, periodic retrain batches.
- [x] 7. Update content.js: batch sends, low-confidence queuing, use clustering preds.
- [ ] 7. Update content.js: batch sends, low-confidence queuing, use clustering preds.

### Phase 3: Integration & UI (Steps 8-11)
- [x] 8. Update popup.js: show dataset size, retrain status, export btn.

**Progress: 8/14 complete**
**Next: Phase 3 step 9 - UI minor updates**
- [x] 9. Minor: popup.html add retrain UI; manifest.json permissions if needed.
 - [x] 10. Test Python deps/server: pip install + uvicorn server.py:8000.

**Progress: 10/14 complete**
**Next: Phase 3 step 11 - Test extension**
- [ ] 11. Test extension: reload, browse, check logs/retrain.

### Phase 4: Polish & Real-time (Steps 12-14)
- [ ] 12. Add TF-IDF fallback in content.js classifyTextLocal.
- [ ] 13. Persist model state (model.joblib/embeddings.npy).
- [ ] 14. Full test: collect 100+ unsupervised samples, verify real-time updates.

**Next Action**: Implement step 1 (expanded_dataset.js). Mark complete as done.


