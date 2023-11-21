const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  "reporterOptions": {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: "https://www.nba.com",
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    screenshotsFolder: "mochawesome-report/mochawesome-report/screenshots",
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
      
    },
  },
});
