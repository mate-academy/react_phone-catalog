module.exports = {
  extends: [
    "@mate-academy/stylelint-config",
    "stylelint-config-standard-scss"
  ],
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    // suppress deprecated at-import-partial-extension blacklist warnings from extended configs
    "scss/at-import-partial-extension-blacklist": null,
    "scss/at-import-partial-extension-disallowed-list": null,
    "scss/at-import-partial-extension": null,
  }
};

