module.exports = {
  extends: '@mate-academy/stylelint-config',

  rules: {
    'selector-max-id': null,

    'custom-property-pattern': [
      '^[a-zA-Z0-9_-]+$',
      {
        message: 'Expected custom property name to be valid',
      },
    ],

    'scss/at-mixin-pattern': null,

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],

    'no-empty-source': null,

    'keyframes-name-pattern': null,
  },
};
