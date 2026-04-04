# 🛡️ Jim & Jam — SafeNet

> *Protecting young minds online — not by locking them out, but by lighting the way.*

---

## 🌍 Problem Statement

Children today browse the internet largely unsupervised, exposed to harmful content and AI-generated misinformation they cannot yet critically evaluate. Existing parental control tools focus on blocking or screen-time limits but fail to detect misleading content in real time or give parents meaningful visibility into what their child actually encounters.

**The gap:** No current tool combines real-time AI content analysis, child-friendly intervention, and live parent awareness in a single system.

---

## 💡 Our Solution

SafeNet is a two-component system:

**Jam** — a Chrome extension installed on the child's browser that silently scans webpage content and intervenes when harmful or misleading content is detected.

**Jim** — a web dashboard for parents that receives real-time alerts from Jam, showing what was detected, when, and on which page.

Together they give children a safer browsing experience and give parents real-time awareness — without invasive surveillance.

---

## ⚙️ How It Works

1. Jam reads visible text from the webpage the child is visiting
2. The text is sent to the backend hosted on Vultr
3. The backend passes it to the Gemini API for classification
4. Content is classified as **SAFE**, **FAKE**, or **HARMFUL**
5. Jam applies the appropriate response on the child's screen
6. The event is logged and pushed to Jim in real time

---

## ✨ Features

### Jam (Chrome Extension)
- Scans page content every 5 seconds and on page load
- Classifies content using the Gemini API
- **HARMFUL** content — blurs the page and shows a friendly block overlay
- **FAKE** content — shows a dismissible warning banner at the top of the page
- **SAFE** content — no interruption, browsing continues normally
- Popup UI showing current page status in a pink/purple/blue theme
- Demo mode — manual text input to simulate and test classifications

### Jim (Parent Dashboard)
- Live activity feed showing timestamp, URL, classification, and detected keywords
- Summary stats — total alerts, harmful count, fake count
- Keyword management — parents can add or remove custom filter keywords
- Reports page — daily and weekly trend charts from historical logs
- Popup notification when harmful content is detected
- Demo mode — manual input to simulate a detection and watch it appear in the live feed

---

## 🏗️ System Architecture

| Layer | Technology | Role |
|-------|-----------|------|
| Chrome Extension | Manifest V3, Vanilla JS | Content scanning, overlays, popup UI |
| AI Classification | Google Gemini API | SAFE / FAKE / HARMFUL classification |
| Backend | Node.js on Vultr | API routing, logging, keyword storage |
| Live Data | SpacetimeDB | Real-time alert streaming to Jim |
| Historical Data | DynamoDB | Log storage for reports |
| Real-Time Transport | WebSocket / Superplane | Instant push updates to dashboard |
| Parent Dashboard | HTML, CSS, Chart.js | Monitoring UI |

---

## 📡 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/analyze` | POST | Send content for AI classification |
| `/logs/live` | GET | Fetch live alerts for Jim feed |
| `/logs/history` | GET | Fetch historical data for reports |
| `/keywords` | GET / POST / DELETE | Manage parent-defined keywords |

---

## 🗃️ Classification Dataset (Demo/Fallback)

Used when the backend is unavailable, for testing and demo purposes:

| Category | Example | Response |
|----------|---------|----------|
| SAFE | "The water cycle includes evaporation and condensation." | ✅ Allow |
| FAKE | "Drinking lemon water cures all diseases instantly." | ⚠️ Warning |
| FAKE | "The Earth is flat and space agencies are lying." | ⚠️ Warning |
| HARMFUL | "How to hack someone's account easily." | 🚫 Block |
| HARMFUL | "Ways to bypass school restrictions using proxy." | 🚫 Block |

---

## 🎨 Design

**Jam** uses a soft pink, purple, and blue gradient palette on a dark background. Language in all overlays is friendly and age-appropriate — never alarming.

**Jim** uses a clean dark dashboard layout with sidebar navigation (Dashboard, Alerts, Reports, Keywords, Demo). Color coding is consistent: green for safe, amber for fake, red for harmful.

---

## 🚀 What Makes This Different

- Uses a large language model (Gemini) to understand content in context, not just match keywords — so it catches misleading content that contains no flagged words
- Specifically targets AI-generated misinformation, not just explicit content
- Tiered response system — fake content warns, harmful content blocks — avoiding unnecessary over-restriction
- Real-time parent alerts in seconds, not end-of-day reports

---

## 🔮 Future Scope

- Image and video content analysis
- Mobile browser support
- Multiple child profiles per parent account
- School and institutional dashboard version
- Multi-language detection

---

## 🏁 Built For

**ROVO x HackByte 4.0**

> *Because every child deserves a smarter, safer digital world.*

---

## 📄 License

MIT License
