module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["config"]
      }
    ]
  }
};
