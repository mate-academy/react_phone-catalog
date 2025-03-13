module.exports = {
  extends: ['@mate-academy/stylelint-config', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': null,
    'selector-class-pattern': null,
  },
};
