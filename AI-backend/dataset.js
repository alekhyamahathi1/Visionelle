// -------------------------------
// Harmful Content Keywords
// -------------------------------

const harmfulKeywords = [

  "kill",
  "attack",
  "hack",
  "destroy",
  "bomb",
  "shoot",
  "threat",
  "violence",
  "die",
  "assault",
  "exploit",
  "breach",
  "malware",
  "virus",
  "steal",
  "fraud",
  "phishing",
  "crack",
  "break into",
  "take down",
  "leak data",
  "data theft",
  "illegal access"

];



// -------------------------------
// Harmful Intent Phrases
// (Very Important — Strong Signals)
// -------------------------------

const harmfulPhrases = [

  "i will attack",
  "i will hack",
  "i will kill",
  "i will destroy",
  "i will break into",
  "i will steal",
  "how to hack",
  "how to destroy",
  "how to attack",
  "how to steal data"

];



// -------------------------------
// Fake / Misleading Keywords
// -------------------------------

const fakeKeywords = [

  "miracle cure",
  "guaranteed results",
  "100% cure",
  "instant cure",
  "fake news",
  "click here to win",
  "limited time offer",
  "lose weight instantly",
  "earn money fast",
  "secret formula",
  "shocking truth",
  "doctors hate this",
  "one simple trick"

];



// Export datasets

module.exports = {

  harmfulKeywords,
  harmfulPhrases,
  fakeKeywords

};