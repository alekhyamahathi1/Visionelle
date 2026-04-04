const { callGeminiAPI } = require("./geminiAPI");

(async () => {
  try {
    const result = await callGeminiAPI("The Earth is flat.");
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
})();