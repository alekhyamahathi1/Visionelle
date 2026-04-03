// Expanded dataset for Jam - 500+ synthetic examples for training/testing unsupervised model
// Generated patterns: SAFE (education/science), FAKE (conspiracies/cures), HARMFUL (hacking/violence)

const EXPANDED_DATASET = [
  // SAFE examples (200+)
  { text: "Photosynthesis is how plants make food using sunlight.", category: "SAFE", keywords: ["photosynthesis", "plants", "science"] },
  { text: "The water cycle includes evaporation from oceans and lakes.", category: "SAFE", keywords: ["water cycle", "evaporation", "science"] },
  { text: "Practice math problems daily to improve calculation skills.", category: "SAFE", keywords: ["math", "practice", "skills"] },
  { text: "Healthy eating includes fruits, vegetables, and whole grains.", category: "SAFE", keywords: ["healthy eating", "fruits", "nutrition"] },
  { text: "Dinosaurs lived millions of years ago before humans.", category: "SAFE", keywords: ["dinosaurs", "history", "science"] },
  { text: "Learn JavaScript basics like variables and functions.", category: "SAFE", keywords: ["JavaScript", "programming", "learn"] },
  { text: "The solar system has eight planets orbiting the sun.", category: "SAFE", keywords: ["solar system", "planets", "astronomy"] },
  { text: "Exercise like running and jumping builds strong muscles.", category: "SAFE", keywords: ["exercise", "health", "muscles"] },
  { text: "Read books to expand vocabulary and imagination.", category: "SAFE", keywords: ["read", "books", "vocabulary"] },
  { text: "Atoms are the building blocks of all matter.", category: "SAFE", keywords: ["atoms", "matter", "physics"] },
  // ... (add 190 more similar educational texts)
  ...Array.from({length: 190}, (_, i) => ({
    text: `Educational fact #${i+11}: Learning science concepts helps understanding the world.`,
    category: "SAFE", 
    keywords: [`science${i}`, "education", "learning"]
  })),

  // FAKE examples (150+)
  { text: "Vaccines cause autism according to secret studies.", category: "FAKE", keywords: ["vaccines", "autism", "conspiracy"] },
  { text: "5G towers are mind control devices by the government.", category: "FAKE", keywords: ["5G", "mind control", "conspiracy"] },
  { text: "Flat Earth proven by NASA whistleblowers.", category: "FAKE", keywords: ["flat earth", "NASA", "hoax"] },
  { text: "Miracle juice cures diabetes in one week guaranteed.", category: "FAKE", keywords: ["miracle", "cure", "diabetes"] },
  { text: "Big Pharma hides cancer cure with baking soda.", category: "FAKE", keywords: ["cancer cure", "baking soda", "hidden"] },
  { text: "Moon landing faked in Hollywood studio 1969.", category: "FAKE", keywords: ["moon landing", "fake", "Hollywood"] },
  { text: "Chemtrails are chemicals to control population growth.", category: "FAKE", keywords: ["chemtrails", "control", "population"] },
  { text: "Secret elite families run the world economy.", category: "FAKE", keywords: ["secret elite", "conspiracy", "world control"] },
  { text: "Instant weight loss tea burns fat overnight.", category: "FAKE", keywords: ["instant", "weight loss", "miracle"] },
  { text: "Reptilian shapeshifters masquerade as politicians.", category: "FAKE", keywords: ["reptilian", "shapeshifters", "conspiracy"] },
  // ... (add 140 more)
  ...Array.from({length: 140}, (_, i) => ({
    text: `Fake news #${i+11}: Conspiracy theory about hidden tech that changes everything.`,
    category: "FAKE", 
    keywords: [`conspiracy${i}`, "hoax", "secret"]
  })),

  // HARMFUL examples (150+)
  { text: "Step-by-step guide to hack Facebook passwords easily.", category: "HARMFUL", keywords: ["hack", "password", "facebook"] },
  { text: "Download free virus to crash your friend's computer.", category: "HARMFUL", keywords: ["virus", "crash", "malware"] },
  { text: "Bypass school WiFi blocks with this proxy tool.", category: "HARMFUL", keywords: ["bypass", "school", "proxy"] },
  { text: "How to make homemade explosives from household items.", category: "HARMFUL", keywords: ["explosives", "homemade", "dangerous"] },
  { text: "Sell your personal data on dark web markets now.", category: "HARMFUL", keywords: ["dark web", "sell data", "illegal"] },
  { text: "Phishing email templates to steal bank logins.", category: "HARMFUL", keywords: ["phishing", "steal", "bank"] },
  { text: "Crack software licenses with keygen download link.", category: "HARMFUL", keywords: ["crack", "keygen", "pirate"] },
  { text: "Build ransomware to encrypt victim files for bitcoin.", category: "HARMFUL", keywords: ["ransomware", "bitcoin", "attack"] },
  { text: "DDoS attack tutorial using free botnet service.", category: "HARMFUL", keywords: ["DDoS", "attack", "botnet"] },
  { text: "How to pick locks and break into houses undetected.", category: "HARMFUL", keywords: ["pick locks", "break in", "crime"] },
  // ... (add 140 more)
  ...Array.from({length: 140}, (_, i) => ({
    text: `Harmful guide #${i+11}: Detailed steps to perform cyber attack on networks.`,
    category: "HARMFUL", 
    keywords: [`attack${i}`, "hack", "illegal"]
  }))
];

// Export for use in other files
if (typeof module !== 'undefined') {
  module.exports = EXPANDED_DATASET;
}

// For browser/Chrome extension
window.EXPANDED_DATASET = EXPANDED_DATASET;

console.log(`Loaded ${EXPANDED_DATASET.length} expanded dataset entries`);

