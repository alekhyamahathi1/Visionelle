// dataset.js

const keywordsByAge = {
  "0-6": {
    harmful: ["violence", "drugs"],
    fake: ["miracle cure", "magic trick"]
  },
  "7-12": {
    harmful: ["hack", "exploit", "cheat"],
    fake: ["flat earth", "fake news"]
  },
  "13-18": {
    harmful: ["account hack", "bypass restrictions", "self-harm"],
    fake: ["get rich quick", "miracle diet"]
  }
};

function getKeywordsForAge(age) {
  if (age >= 0 && age <= 6) return keywordsByAge["0-6"];
  if (age >= 7 && age <= 12) return keywordsByAge["7-12"];
  if (age >= 13 && age <= 18) return keywordsByAge["13-18"];
  return { harmful: [], fake: [] };
}

module.exports = { getKeywordsForAge };