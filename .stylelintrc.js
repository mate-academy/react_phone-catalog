module.exports = {
  extends: '@mate-academy/stylelint-config',
  plugins: ['stylelint-order', 'stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['/grid-template/'],
      },
    ],
    'order/order': [
      'custom-properties',
      'dollar-variables',
      {
        type: 'at-rule',
        name: 'extend',
      },
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: false,
      },
      'declarations',
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: true,
      },
      'rules',
    ],
    'order/properties-order': [
      [
        // 1. Layout
        'display',
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',
        'flex',
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'flex-direction',
        'flex-wrap',
        'justify-content',
        'align-items',
        'align-self',
        'order',

        // 2. Box model
        'box-sizing',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',

        // 3. Border & Shadow
        'border',
        'border-width',
        'border-style',
        'border-color',
        'border-radius',
        'box-shadow',

        // 4. Typography
        'font',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'letter-spacing',
        'text-align',
        'text-decoration',
        'text-transform',
        'white-space',

        // 5. Visual
        'color',
        'background',
        'background-color',
        'background-image',
        'background-size',
        'background-position',
        'background-repeat',
        'object-fit',

        // 6. Effects
        'opacity',
        'visibility',
        'overflow',
        'transition',
        'transform',
        'animation',

        // 7. Misc
        'cursor',
        'pointer-events',
        'user-select',
      ],
      {
        unspecified: 'bottomAlphabetical',
        emptyLineBeforeUnspecified: 'never',
      },
    ],
  },
};
