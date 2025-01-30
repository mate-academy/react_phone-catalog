module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    "property-no-unknown": [true, {
      ignoreProperties: ["composes"]
    }]
  }
};
