// geminiAPI.js
/**
 * Mock Gemini API for content analysis
 * Simulates AI analysis for SAFE, HARMFUL, FAKE
 */

async function analyzeText(text, age) {
  const lowerText = text.toLowerCase();

  // Default keywords
  const harmfulKeywords = ["hack", "exploit", "bypass"];
  const fakeKeywords = ["flat earth", "cure all", "miracle"];

  // Age-based extra checks
  if (age <= 6) {
    harmfulKeywords.push("violent", "kill");
    fakeKeywords.push("trick");
  } else if (age <= 12) {
    harmfulKeywords.push("cheat", "bully");
    fakeKeywords.push("fake news");
  } else if (age <= 18) {
    harmfulKeywords.push("drugs", "fight");
    fakeKeywords.push("conspiracy");
  }

  let category = "SAFE";
  let detectedKeywords = [];

  for (const word of harmfulKeywords) {
    if (lowerText.includes(word)) {
      category = "HARMFUL";
      detectedKeywords.push(word);
    }
  }

  if (category === "SAFE") {
    for (const word of fakeKeywords) {
      if (lowerText.includes(word)) {
        category = "FAKE";
        detectedKeywords.push(word);
      }
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve({ category, detectedKeywords }), 500);
  });
}

module.exports = { analyzeText };