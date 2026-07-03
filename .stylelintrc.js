module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [true, {
      "ignorePseudoClasses": ["global", "local"]
    }],
  }
};
