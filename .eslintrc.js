module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended"
    // "@vue/prettier"
  ],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "no-unused-vars": [
      "off",
      {
        vars: "local"
      }
    ],
    "vue/html-self-closing": "off",
    "vue/require-v-for-key": "off",
    "vue/valid-v-for": "off",
    "vue/no-use-v-if-with-v-for": "off"
  },
  globals: {
    Console: true,
    Vuex: true
  }
};
