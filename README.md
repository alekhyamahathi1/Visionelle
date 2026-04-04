# 🧠 TruthLens Kids (Jim & Jam)

## 🌍 Problem Statement

With the rapid rise of AI-generated content, children today are increasingly exposed to misleading, harmful, or manipulative information online. Existing parental control tools focus heavily on blocking or monitoring, but they fail to **educate or guide children toward independent thinking**.

This creates a critical gap:
- Kids cannot differentiate between **real and AI-generated fake content**
- Parents lack **real-time visibility and meaningful insights**
- Current systems are either **too restrictive or too passive**

---

## 💡 Our Solution

**TruthLens Kids** introduces a balanced, intelligent system that not only protects children but also **guides them toward safer and smarter digital behavior**.

The system consists of two core components:

### 👨‍👩‍👧 Jim (Parent Dashboard)
A real-time monitoring and analytics platform that provides parents with **live insights, alerts, and reports** about their child’s online activity.

### 🌐 Jam (Chrome Extension for Kids)
A lightweight browser extension that runs silently in the background, analyzing content in real time and **gently protecting children from harmful or misleading information**.

---

## ✨ Key Features

### 🛡️ Smart Content Monitoring
- Extracts visible text from webpages
- Monitors input fields (for demo simulation)
- Continuously scans browsing activity

### 🤖 AI-Based Content Classification
- Classifies content into:
  - SAFE
  - HARMFUL
  - FAKE (misleading AI-generated content)

### 🚫 Protective Blocking System
- Harmful content:
  - Page blur/block
  - Friendly safety overlay
- Fake content:
  - Warning indicator (not blocked)

### 📊 Real-Time Parent Dashboard (Jim)
- Live alert stream with:
  - Timestamp
  - Content snippet
  - Classification
  - Device ID
- Dashboard analytics:
  - Total alerts
  - Harmful vs Fake detection count
- Historical reports:
  - Daily/weekly summaries
  - Trend visualizations

### ⚡ Real-Time Updates
- Instant sync between extension and dashboard
- Alerts triggered immediately on detection

### 🔔 Notifications
- Popup alerts for harmful activity
- Real-time feedback loop for parents

### 🧩 Keyword Management
- Parents can:
  - Add/remove keywords
- Used to strengthen filtering logic

### 🧪 Demo Mode
- Manual text input simulation
- Live classification preview
- Perfect for hackathon demos

---

## 🏗️ System Architecture

### 🔗 Flow Overview

1. **Jam Extension**
   - Extracts webpage content
   - Sends data to backend

2. **Backend (Hosted on Vultr)**
   - Processes and routes requests
   - Stores logs and keywords

3. **AI Analysis Layer**
   - Content classification (SAFE / HARMFUL / FAKE)

4. **Real-Time Data Layer**
   - Live logs streamed to dashboard

5. **Jim Dashboard**
   - Displays alerts, reports, analytics

---

## 🧱 Tech Stack & Integrations

### 🌐 Frontend
- Chrome Extension (Jam)
- Dashboard UI (Jim)

### ⚙️ Backend
- Hosted APIs (Vultr)
- REST Endpoints:
  - `/analyze`
  - `/logs/live`
  - `/logs/history`
  - `/keywords`

### 🗄️ Database
- Real-time logs storage
- Historical data tracking

### ⚡ Real-Time Systems
- Live alert streaming
- Instant dashboard updates

---

## 📡 API Structure

| Endpoint         | Description                          |
|----------------|--------------------------------------|
| `/analyze`      | Receives content for classification  |
| `/logs/live`    | Streams real-time alerts             |
| `/logs/history` | Fetches historical reports           |
| `/keywords`     | Manage filtering keywords            |

---

## 🧪 Dataset for Simulation

Used for demo/testing:

- SAFE → Normal browsing allowed
- FAKE → Warning shown
- HARMFUL → Block + alert triggered

Each interaction generates:
- Timestamp
- URL (mock)
- Category
- Keywords

---

## 🎨 UI/UX Design

### Jam (Extension)
- Soft gradient theme (Pink, Purple, Blue)
- Minimal, kid-friendly interface
- Non-threatening language

### Jim (Dashboard)
- Clean modern layout
- Sidebar navigation:
  - Dashboard
  - Alerts
  - Reports
  - Settings

---

## 🚀 Innovation Highlights

- Focus on **guidance, not restriction**
- Detects **AI-generated fake content**, not just harmful content
- **Real-time parent awareness**
- Privacy-first approach (no raw intrusive data exposure)
- Designed for **scalability and startup potential**

---

## 📈 Impact

- Encourages **independent thinking in children**
- Reduces exposure to **harmful & misleading content**
- Bridges gap between **parent control and child freedom**

---

## 🏁 Hackathon Alignment (ROVO x HackByte 4.0)

This project is built in alignment with:
- Innovation in real-world problem solving
- Scalable product vision
- Continuous improvement and updates
- Strong potential for incubation into a startup

---

## 🔮 Future Scope

- Multimodal detection (images/videos)
- Cross-device synchronization
- Behavioral insights tracking
- Personalized learning nudges for kids

---

## 👥 Team Collaboration

- Single unified project post
- Continuous updates across development stages
- Demonstrates iterative improvement

---

## 📌 Final Note

TruthLens Kids is not just a safety tool —  
it is a step toward building a **smarter, safer, and more aware digital generation**.
