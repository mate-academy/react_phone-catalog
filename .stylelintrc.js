module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    "scss/at-import-partial-extension": null,
    "declaration-empty-line-before": null,
    "length-zero-no-unit": null,
    "color-hex-length": null,
    "scss/double-slash-comment-whitespace-inside": null,
    "declaration-block-no-duplicate-properties": null,
    "at-rule-empty-line-before": null,
    "rule-empty-line-before": null
  },
  ignoreFiles: [
    "src/**/*.module.scss",
    "src/styles/variables.scss"
  ]
};
