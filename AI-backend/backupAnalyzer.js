// backupAnalyzer.js
const { analyzeContent } = require("./fileAnalyzer");

/**
 * Runs backup analysis
 * @param {string} text - Text to analyze
 * @param {number} age - Child's age
 * @returns {object} - { category, detectedKeywords }
 */
function runBackupAnalysis(text, age) {
  try {
    const result = analyzeContent(text, age);
    return {
      source: "backup",
      ...result
    };
  } catch (err) {
    return {
      source: "backup",
      category: "SAFE",
      detectedKeywords: []
    };
  }
}

module.exports = { runBackupAnalysis };