const fs = require("fs");
const { getKeywordsForAge } = require("./dataset");
const { analyzeWithGemini } = require("./geminiAPI");

// Local keyword-based analyzer
function analyzeContentLocal(text, age) {
  const keywords = getKeywordsForAge(age);
  const lowerText = text.toLowerCase();
  let category = "SAFE";
  let detectedKeywords = [];

  for (const word of keywords.harmful) {
    if (lowerText.includes(word)) {
      category = "HARMFUL";
      detectedKeywords.push(word);
    }
  }

  if (category === "SAFE") {
    for (const word of keywords.fake) {
      if (lowerText.includes(word)) {
        category = "FAKE";
        detectedKeywords.push(word);
      }
    }
  }

  return { category, detectedKeywords };
}

// Main function (Gemini + fallback)
async function analyzeFile(filePath, age) {
  const content = fs.readFileSync(filePath, "utf-8");

  try {
    const geminiResult = await analyzeWithGemini(content);
    return {
      category: geminiResult.category,
      confidence: geminiResult.confidence,
      detectedKeywords: [],
      source: "GEMINI",
    };
  } catch (err) {
    const localResult = analyzeContentLocal(content, age);
    return {
      ...localResult,
      confidence: null,
      source: "LOCAL_BACKUP",
    };
  }
}

module.exports = { analyzeFile };