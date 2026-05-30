module.exports = {
  extends: "@mate-academy/stylelint-config",
  rules: {
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['picker', 'checkmark', 'picker-icon'],
      },
    ],
  }
};
