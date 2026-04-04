// Import required modules

const fs = require("fs");

const {
  harmfulKeywords,
  harmfulPhrases,
  fakeKeywords
} = require("./dataset");



// -------------------------------
// Harmful Detection
// -------------------------------

function containsHarmful(input) {

  const text = input.toLowerCase();

  let harmfulScore = 0;

  // Phrase detection

  harmfulPhrases.forEach(phrase => {

    if (text.includes(phrase)) {
      harmfulScore += 3;
    }

  });

  // Keyword detection

  harmfulKeywords.forEach(word => {

    if (text.includes(word)) {
      harmfulScore += 1;
    }

  });

  return harmfulScore;
}



// -------------------------------
// Fake Detection
// -------------------------------

function containsFake(input) {

  const text = input.toLowerCase();

  let fakeScore = 0;

  fakeKeywords.forEach(word => {

    if (text.includes(word)) {
      fakeScore += 1;
    }

  });

  if (text.includes("100%") && text.includes("guarantee")) {
    fakeScore += 2;
  }

  return fakeScore;
}



// -------------------------------
// Confidence Calculator
// -------------------------------

function getConfidence(score) {

  let percentage = Math.min(score * 20, 100);

  return percentage + "%";
}



// -------------------------------
// Analyzer
// -------------------------------

function analyzeText(input) {

  const harmfulScore = containsHarmful(input);
  const fakeScore = containsFake(input);

  if (harmfulScore >= 2) {

    return {
      category: "HARMFUL",
      confidence: getConfidence(harmfulScore),
      reason: "Harmful intent detected"
    };

  }

  if (fakeScore >= 1) {

    return {
      category: "FAKE",
      confidence: getConfidence(fakeScore),
      reason: "Fake or misleading claim detected"
    };

  }

  return {
    category: "SAFE",
    confidence: "10%",
    reason: "No suspicious patterns detected"
  };

}



// -------------------------------
// FILE READER
// -------------------------------

function analyzeFile(filePath) {

  try {

    const content = fs.readFileSync(filePath, "utf-8");

    const result = analyzeText(content);

    console.log("\nFile Analysis Result:");
    console.log(result);

  }

  catch (error) {

    console.log("\nError reading file.");
    console.log("Check file path.");

  }

}



// -------------------------------
// TEST FILE
// -------------------------------

// Change this filename to test different files

analyzeFile("sample.txt");