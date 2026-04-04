// Dataset for classification
const DATASET = [
  { text: "The water cycle includes evaporation, condensation, and precipitation.", category: "SAFE", keywords: ["water cycle", "science", "education"] },
  { text: "You can improve your coding skills by practicing daily.", category: "SAFE", keywords: ["coding", "learning", "practice"] },
  { text: "Drinking only lemon water can cure all diseases instantly.", category: "FAKE", keywords: ["cure", "instant", "disease"] },
  { text: "The Earth is flat and space agencies are lying.", category: "FAKE", keywords: ["flat earth", "misinformation"] },
  { text: "How to hack someone's account easily.", category: "HARMFUL", keywords: ["hack", "account", "exploit"] },
  { text: "Ways to bypass school restrictions and access blocked sites.", category: "HARMFUL", keywords: ["bypass", "restricted", "proxy"] }
];
const HARMFUL_KEYWORDS = ["hack", "exploit", "bypass", "restricted", "proxy", "weapon", "drug", "violence", "kill", "attack", "steal"];
const FAKE_KEYWORDS = ["cure all", "instant", "flat earth", "misinformation", "conspiracy", "hoax", "secret they don't want", "miracle"];

function classifyText(text) {
  const lower = text.toLowerCase();
  for (const item of DATASET) {
    const hits = item.keywords.filter(k => lower.includes(k.toLowerCase()));
    if (hits.length > 0) return { category: item.category, keywords: hits, matchedEntry: item.text };
  }
  const harmfulHits = HARMFUL_KEYWORDS.filter(k => lower.includes(k));
  if (harmfulHits.length > 0) return { category: "HARMFUL", keywords: harmfulHits, matchedEntry: null };
  const fakeHits = FAKE_KEYWORDS.filter(k => lower.includes(k));
  if (fakeHits.length > 0) return { category: "FAKE", keywords: fakeHits, matchedEntry: null };
  return { category: "SAFE", keywords: [], matchedEntry: null };
}

const STATUS_MAP = {
  SAFE: { icon: "✅", label: "All Clear!", className: "status-safe" },
  HARMFUL: { icon: "🛡️", label: "Blocked – Stay Safe!", className: "status-harmful" },
  FAKE: { icon: "⚠️", label: "Misleading Content", className: "status-fake" }
};

function updateStatus(scan) {
  const card = document.getElementById("statusCard");
  const info = STATUS_MAP[scan.category] || STATUS_MAP.SAFE;
  card.className = "status-card " + info.className;
  document.getElementById("statusIcon").textContent = info.icon;
  document.getElementById("statusLabel").textContent = info.label;
  document.getElementById("statusUrl").textContent = scan.url || "Demo analysis";
  document.getElementById("statusTime").textContent = scan.timestamp ? new Date(scan.timestamp).toLocaleTimeString() : "";

  const kw = document.getElementById("statusKeywords");
  kw.innerHTML = "";
  (scan.keywords || []).forEach(k => {
    const span = document.createElement("span");
    span.className = "keyword";
    span.textContent = k;
    kw.appendChild(span);
  });
}

function renderLogs(logs) {
  const area = document.getElementById("logsArea");
  if (!logs || logs.length === 0) {
    area.innerHTML = '<div style="text-align:center;padding:20px;color:#b0bec5;font-size:12px;">No activity yet</div>';
    return;
  }
  area.innerHTML = "";
  logs.slice(-10).reverse().forEach(log => {
    const div = document.createElement("div");
    div.className = "log-item";
    div.innerHTML = `
      <div class="log-dot ${log.category.toLowerCase()}"></div>
      <div class="log-text">${log.url || "Unknown"}</div>
      <div class="log-time">${new Date(log.timestamp).toLocaleTimeString()}</div>
    `;
    area.appendChild(div);
  });
}

// Load last scan
chrome.storage.local.get(["lastScan", "activityLogs"], (data) => {
  if (data.lastScan) updateStatus(data.lastScan);
  if (data.activityLogs) renderLogs(data.activityLogs);
});

// Listen for updates
chrome.storage.onChanged.addListener((changes) => {
  if (changes.lastScan) updateStatus(changes.lastScan.newValue);
  if (changes.activityLogs) renderLogs(changes.activityLogs.newValue);
});

// Demo mode
document.getElementById("demoBtn").addEventListener("click", () => {
  const text = document.getElementById("demoInput").value.trim();
  if (!text) return;

  const result = classifyText(text);
  const el = document.getElementById("demoResult");
  el.className = "demo-result " + result.category.toLowerCase();

  const messages = {
    SAFE: "✅ This content looks safe!",
    HARMFUL: "🛡️ This content is harmful and would be blocked.",
    FAKE: "⚠️ This content appears misleading or fake."
  };

  el.textContent = messages[result.category];
  if (result.keywords.length > 0) {
    el.textContent += " Keywords: " + result.keywords.join(", ");
  }

  // Update status card with demo result
  updateStatus({
    url: "Demo Analysis",
    category: result.category,
    keywords: result.keywords,
    timestamp: new Date().toISOString()
  });
});
