# 🧠 SafeNet — AI-Powered Child Content Protection

SafeNet is an intelligent system designed to protect children online by analyzing and classifying text content into **SAFE, HARMFUL, or FAKE** categories. It combines the **Gemini AI API** as the primary detection engine with a **locally built keyword-based analyzer** for backup, ensuring reliable performance even during AI service downtime.

---

## 🚀 Workflow

1. **Text Input**  
   Text is received from the **Kid Chrome Extension (Jam)** or **Parent Dashboard (Jim)** via a POST request to `/analyze`.

2. **Primary Detection (Gemini AI)**  
   - Processes content using context-aware AI  
   - Returns **category** (SAFE / HARMFUL / FAKE) and **confidence score**  

3. **Backup Detection (Local Analyzer)**  
   - Activates if Gemini fails or API is unavailable  
   - Uses **predefined harmful keywords**, **harmful intent phrases**, and **fake content indicators**  
   - Automatically classifies content without interrupting service  

---

## 🎯 Age-Based Categorization

SafeNet adapts detection according to the child's age:

- **0–6 years:** strict filtering, prevent exposure to harmful/fake content  
- **7–12 years:** moderate filtering, context-aware  
- **13–18 years:** advanced detection for complex content  

Keywords and patterns vary per age group for **tailored protection**.

---

## ⚡ Features

- **Real-Time Monitoring:** Continuous webpage analysis via Jam Extension  
- **AI-Based Classification:** Gemini AI + backup keyword analyzer  
- **Protective Measures:** Blocks harmful content, warns on fake content  
- **Parent Dashboard:** Live alerts, activity reports, keyword management  
- **Secure & Scalable:** Node.js backend, `.env` for API keys, CORS enabled  

---

## 🛠️ Tech Stack

- **Gemini AI API:** Primary intelligent engine  
- **Local Backup Analyzer:** Keyword-based fallback detection  
- **Node.js + Express.js:** Backend API  
- **MongoDB Atlas:** Logs, reports, historical data storage  
- **SpacetimeDB + Superplane:** Real-time processing & UI updates  
- **Vultr:** Backend hosting and deployment  

---

## 🔗 Integration

- Both **Jam Extension** and **Jim Dashboard** communicate with the same `/analyze` endpoint  
- Automatic **try-catch failover** ensures smooth AI + backup workflow  
- Age-based keyword filtering improves detection accuracy  

---

## 💡 Benefits

- AI intelligence with offline reliability  
- Age-based content safety  
- Continuous operation during API/service failures  
- Scalable for future features: alerts, reports, file/image scanning  

---

## 📦 Setup

1. Clone repository  
2. Install dependencies: `npm install`  
3. Add Gemini API key in `.env` file  
4. Run backend: `node run.js`  
5. Use Jam Extension and Jim Dashboard to test detection  

---

**SafeNet ensures children browse safely while keeping parents informed, blending AI intelligence with robust backup protection.**
