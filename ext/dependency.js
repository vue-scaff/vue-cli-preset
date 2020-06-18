// Script
const scripts = {
  serve: "vue-cli-service serve --mode=development"
};

// Runtime
const dependencies = {
  // Scaff
  "@scaff/vue-cli-scaff": "^5.2.10",
  // Core
  "core-js": "^3.3.2",
  // Service Worker
  "register-service-worker": "^1.6.2"
};

// Development
const devDependencies = {};

// Export
module.exports = template => {
  // Result
  return {
    // Origin Template
    template: { scripts, dependencies, devDependencies },
    // Admin Template
    admin: {
      scripts,
      dependencies: Object.assign(dependencies, {
        clipboard: "^2.0.6",
        deepmerge: "^4.2.2",
        echarts: "^4.8.0",
        screenfull: "^5.0.2",
        "driver.js": "^0.9.8",
        "element-ui": "^2.13.2",
        "fuse.js": "^6.0.1",
        "js-cookie": "^2.2.1",
        "vue-count-to": "^1.0.13"
      }),
      devDependencies
    }
  }[template];
};
