// Inline dataset for content script (can't import modules)
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

let lastContent = "";
let currentOverlay = null;
let currentBanner = null;

function getPageText() {
  return document.body ? document.body.innerText.substring(0, 3000) : "";
}

function removeOverlays() {
  if (currentOverlay) { currentOverlay.remove(); currentOverlay = null; }
  if (currentBanner) { currentBanner.remove(); currentBanner = null; }
}

function showHarmfulOverlay() {
  removeOverlays();
  const overlay = document.createElement("div");
  overlay.id = "jam-safety-overlay";
  overlay.className = "jam-harmful";
  overlay.innerHTML = `
    <div class="jam-card">
      <div class="jam-emoji">🛡️</div>
      <div class="jam-title">This content is restricted for your safety</div>
      <div class="jam-desc">Jam detected content that isn't safe for you. We've hidden it to keep you protected! 💜</div>
      <button class="jam-btn" onclick="window.history.back()">← Go Back</button>
    </div>
  `;
  document.documentElement.appendChild(overlay);
  currentOverlay = overlay;
}

function showFakeBanner() {
  removeOverlays();
  const banner = document.createElement("div");
  banner.id = "jam-fake-banner";
  banner.innerHTML = `⚠️ Jam detected potentially misleading information on this page. Be careful!`;
  document.documentElement.appendChild(banner);
  currentBanner = banner;
  // Also add a subtle overlay
  const overlay = document.createElement("div");
  overlay.id = "jam-safety-overlay";
  overlay.className = "jam-fake";
  overlay.innerHTML = "";
  document.documentElement.appendChild(overlay);
  currentOverlay = overlay;
  setTimeout(() => { if (currentOverlay) { currentOverlay.remove(); currentOverlay = null; } }, 3000);
}

function scanPage() {
  const text = getPageText();
  if (text === lastContent || text.length < 20) return;
  lastContent = text;

  const result = classifyText(text);

  // Store result
  chrome.storage.local.set({
    lastScan: {
      url: window.location.href,
      category: result.category,
      keywords: result.keywords,
      timestamp: new Date().toISOString(),
      matchedEntry: result.matchedEntry
    }
  });

  // Send log to background
  chrome.runtime.sendMessage({
    type: "LOG",
    data: {
      url: window.location.href,
      category: result.category,
      keywords: result.keywords,
      timestamp: new Date().toISOString()
    }
  });

  // Apply protection
  removeOverlays();
  if (result.category === "HARMFUL") {
    showHarmfulOverlay();
  } else if (result.category === "FAKE") {
    showFakeBanner();
  }
}

// Monitor input fields
document.addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
    const val = e.target.value;
    if (val.length > 10) {
      const result = classifyText(val);
      if (result.category !== "SAFE") {
        chrome.storage.local.set({
          lastScan: {
            url: window.location.href,
            category: result.category,
            keywords: result.keywords,
            timestamp: new Date().toISOString(),
            matchedEntry: result.matchedEntry,
            source: "input"
          }
        });
      }
    }
  }
}, true);

// Initial scan + periodic
scanPage();
setInterval(scanPage, 5000);

// Watch for navigation changes (SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    lastContent = "";
    scanPage();
  }
}).observe(document.body || document.documentElement, { childList: true, subtree: true });
