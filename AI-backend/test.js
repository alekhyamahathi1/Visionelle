// Import datasets

const {
  harmfulKeywords,
  harmfulPhrases,
  fakeKeywords
} = require("./dataset");

const readline = require("readline");



// -------------------------------
// Harmful Detection
// -------------------------------

function containsHarmful(input) {

  const text = input.toLowerCase();

  let harmfulScore = 0;

  // Phrase detection (STRONG)

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

  // Suspicious patterns

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
// Main Analyzer
// -------------------------------

function analyzeText(input) {

  const harmfulScore = containsHarmful(input);
  const fakeScore = containsFake(input);


  // Harmful priority

  if (harmfulScore >= 2) {

    return {
      category: "HARMFUL",
      confidence: getConfidence(harmfulScore),
      reason: "Harmful intent detected"
    };

  }


  // Fake detection

  if (fakeScore >= 1) {

    return {
      category: "FAKE",
      confidence: getConfidence(fakeScore),
      reason: "Fake or misleading claim detected"
    };

  }


  // Safe

  return {
    category: "SAFE",
    confidence: "10%",
    reason: "No suspicious patterns detected"
  };

}



// -------------------------------
// Interactive Input Loop
// -------------------------------

const rl = readline.createInterface({

  input: process.stdin,
  output: process.stdout

});


function askInput() {

  rl.question(
    "\nEnter text to analyze (type 'exit' to quit): ",
    function(userInput) {

      if (userInput.toLowerCase() === "exit") {

        console.log("\nExiting program...");
        rl.close();
        return;

      }

      const result = analyzeText(userInput);

      console.log("\nAnalysis Result:");
      console.log(result);

      // Loop again

      askInput();

    }
  );

}



// Start system

console.log("\n=== TruthLens Content Analyzer ===");

askInput();