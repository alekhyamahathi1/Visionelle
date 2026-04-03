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

  // Check dataset matches first
  for (const item of DATASET) {
    const similarity = item.keywords.filter(k => lower.includes(k.toLowerCase())).length;
    if (similarity > 0) {
      return { category: item.category, keywords: item.keywords.filter(k => lower.includes(k.toLowerCase())), matchedEntry: item.text };
    }
  }

  // Keyword-based fallback
  const harmfulHits = HARMFUL_KEYWORDS.filter(k => lower.includes(k));
  if (harmfulHits.length > 0) return { category: "HARMFUL", keywords: harmfulHits, matchedEntry: null };

  const fakeHits = FAKE_KEYWORDS.filter(k => lower.includes(k));
  if (fakeHits.length > 0) return { category: "FAKE", keywords: fakeHits, matchedEntry: null };

  return { category: "SAFE", keywords: [], matchedEntry: null };
}
