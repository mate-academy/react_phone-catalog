module.exports = {
  extends: ['@mate-academy/stylelint-config', 'stylelint-config-clean-order'],

  rules: {
    'lightness-notation': null,
    'keyframes-name-pattern': null,
    'scss/double-slash-comment-empty-line-before': null,

    'order/properties-order': null,
    'declaration-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'order/order': null,
  },
};
