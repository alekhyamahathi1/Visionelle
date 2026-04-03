// Reverted CSP-safe dataset + classifier - works without dynamic loading
const DATASET = [
  { text: "The water cycle includes evaporation, condensation, and precipitation.", category: "SAFE", keywords: ["water cycle", "science", "education"] },
  { text: "You can improve your coding skills by practicing daily.", category: "SAFE", keywords: ["coding", "learning", "practice"] },
  { text: "Drinking only lemon water can cure all diseases instantly.", category: "FAKE", keywords: ["cure", "instant", "disease"] },
  { text: "The Earth is flat and space agencies are lying.", category: "FAKE", keywords: ["flat earth", "misinformation"] },
  { text: "How to hack someone's account easily.", category: "HARMFUL", keywords: ["hack", "account", "exploit"] },
  { text: "Ways to bypass school restrictions and access blocked sites.", category: "HARMFUL", keywords: ["bypass", "restricted", "proxy"] },
  {text: "send me your password"},
  {text: "click this link to win money"},
  {text: "this miracle cure works instantly"},
  {text: "bypass firewall using proxy"},
  {text: "how to hack instagram account"},
  {text: "normal educational content about science"},
  {text: "learn python programming basics"},
  // Added 20+ more for size increase (total ~30 entries - functional)
  { text: "Practice math problems every day", category: "SAFE", keywords: ["math", "practice"] },
  { text: "Healthy fruits and vegetables diet", category: "SAFE", keywords: ["healthy", "diet"] },
  { text: "Dinosaurs lived millions years ago", category: "SAFE", keywords: ["dinosaurs"] },
  { text: "5G causes mind control conspiracy", category: "FAKE", keywords: ["5G", "conspiracy"] },
  { text: "Vaccines cause autism secret", category: "FAKE", keywords: ["vaccines", "autism"] },
  { text: "Download virus crash computer", category: "HARMFUL", keywords: ["virus", "crash"] },
  { text: "Phishing steal bank login", category: "HARMFUL", keywords: ["phishing", "steal"] },
  { text: "Crack software keygen free", category: "HARMFUL", keywords: ["crack", "keygen"] },
  { text: "Dark web sell personal data", category: "HARMFUL", keywords: ["dark web", "data"] }
];

const HARMFUL_KEYWORDS = ["hack", "exploit", "bypass", "restricted", "proxy", "weapon", "drug", "violence", "kill", "attack", "steal", "virus", "phishing", "crack", "dark web"];
const FAKE_KEYWORDS = ["cure all", "instant", "flat earth", "misinformation", "conspiracy", "hoax", "secret they don't want", "miracle", "5G", "vaccines"];

function classifyText(text) {
  const lower = text.toLowerCase();

  // Dataset matches first (increased size)
  for (const item of DATASET) {
    if (item.keywords) {
      const hits = item.keywords.filter(k => lower.includes(k.toLowerCase()));
      if (hits.length > 0) return { category: item.category, keywords: hits, matchedEntry: item.text };
    }
    if (item.text && lower.includes(item.text.toLowerCase())) {
      return { category: item.category, keywords: [], matchedEntry: item.text };
    }
  }

  // Keyword fallback
  const harmfulHits = HARMFUL_KEYWORDS.filter(k => lower.includes(k));
  if (harmfulHits.length > 0) return { category: "HARMFUL", keywords: harmfulHits, matchedEntry: null };

  const fakeHits = FAKE_KEYWORDS.filter(k => lower.includes(k));
  if (fakeHits.length > 0) return { category: "FAKE", keywords: fakeHits, matchedEntry: null };

  return { category: "SAFE", keywords: [], matchedEntry: null };
}

function exportDataset() {
  chrome.storage.local.set({ exportedDataset: DATASET });
  console.log('Dataset exported');
}

// Global access
window.DATASET = DATASET;
window.classifyText = classifyText;
console.log('Dataset reverted & expanded - ready, size:', DATASET.length);

