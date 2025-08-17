const reporter = require("multiple-cucumber-html-reporter");
const fs = require("fs");

// Ensure report directory exists
fs.mkdirSync("./reports/html", { recursive: true });

reporter.generate({
  jsonDir: "./reports",
  reportPath: "./reports/html",
  pageTitle: "Insight FC – BDD Report",
  reportName: "Insight FC – Cucumber Report",
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "CI Pipeline",
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
});
