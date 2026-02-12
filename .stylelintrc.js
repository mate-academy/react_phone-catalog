module.exports = {
  extends: '@mate-academy/stylelint-config',
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'no-descending-specificity': null,
  },
};
