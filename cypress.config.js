const { defineConfig } = require("cypress");

module.exports = defineConfig({
    // viewportWidth: 320,
    // viewportHeight: 480,
  e2e: {
    viedo: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
});
