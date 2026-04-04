const readline = require("readline");
const { analyzeFile } = require("./fileAnalyzer");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter child age: ", (ageInput) => {
  const age = parseInt(ageInput);
  if (isNaN(age) || age < 0) {
    console.log("Invalid age entered!");
    rl.close();
    return;
  }

  rl.question("Enter file path to analyze: ", async (filePath) => {
    if (!fs.existsSync(filePath)) {
      console.log("File does not exist!");
      rl.close();
      return;
    }

    try {
      const result = await analyzeFile(filePath, age);
      console.log("\nAnalysis Result:");
      console.log(result);
    } catch (err) {
      console.error("Error analyzing file:", err.message);
    }
    rl.close();
  });
});