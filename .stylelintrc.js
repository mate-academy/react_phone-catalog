module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': ['tailwind']
      }
    ],
  }
};
