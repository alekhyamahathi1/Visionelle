// fileAnalyzer.js
const fs = require("fs");
const { getKeywordsForAge } = require("./dataset");

// Function to generate descriptive reason
function generateReason(category, detectedKeywords) {
  if (category === "SAFE") return "No harmful or fake content detected.";
  
  if (category === "HARMFUL") {
    return `Harmful content detected due to keywords: ${detectedKeywords.join(", ")}.`;
  }

  if (category === "FAKE") {
    return `Potentially misleading or fake content detected: ${detectedKeywords.join(", ")}.`;
  }

  return "Content analysis completed.";
}

// Function to analyze content
function analyzeContent(text, age) {
  const keywords = getKeywordsForAge(age);
  const lowerText = text.toLowerCase();

  let category = "SAFE";
  let detectedKeywords = [];

  // Check harmful keywords
  for (const word of keywords.harmful) {
    if (lowerText.includes(word)) {
      category = "HARMFUL";
      detectedKeywords.push(word);
    }
  }

  // Check fake keywords if not harmful
  if (category === "SAFE") {
    for (const word of keywords.fake) {
      if (lowerText.includes(word)) {
        category = "FAKE";
        detectedKeywords.push(word);
      }
    }
  }

  const reason = generateReason(category, detectedKeywords);

  return {
    category,
    detectedKeywords,
    reason
  };
}

// Function to analyze file content
function analyzeFile(filePath, age) {
  const content = fs.readFileSync(filePath, "utf-8");
  return analyzeContent(content, age);
}

module.exports = { analyzeContent, analyzeFile };