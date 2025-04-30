module.exports = {
  extends: '@mate-academy/stylelint-config',
  plugins: ['stylelint-order'],
  rules: {
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['/grid-template/'],
      },
    ],
    'order/properties-order': [
      [
        // 1. Display
        'display',

        // 2. Positioning
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',

        // 3. Flex/Grid layout
        'flex',
        'flex-grow',
        'flex-shrink',
        'flex-basis',
        'flex-direction',
        'flex-wrap',
        'justify-content',
        'align-items',
        'align-content',
        'order',
        'grid',
        'grid-area',
        'grid-template',
        'grid-template-areas',
        'grid-template-rows',
        'grid-template-columns',
        'grid-auto-rows',
        'grid-auto-columns',
        'grid-auto-flow',
        'grid-gap',
        'gap',
        'row-gap',
        'column-gap',

        // 4. Box Model
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

        // 5. Overflow
        'overflow',
        'overflow-x',
        'overflow-y',

        // 6. Typography
        'font',
        'font-family',
        'font-size',
        'font-style',
        'font-weight',
        'line-height',
        'letter-spacing',
        'text-align',
        'text-transform',
        'text-decoration',
        'white-space',
        'color',

        // 7. Visual
        'background',
        'background-color',
        'background-image',
        'background-size',
        'background-position',
        'background-repeat',
        'border',
        'border-width',
        'border-style',
        'border-color',
        'border-radius',
        'box-shadow',
        'opacity',
        'visibility',

        // 8. Animation
        'transition',
        'transition-delay',
        'transition-duration',
        'transition-property',
        'transition-timing-function',
        'animation',
        'transform',

        // 9. Misc
        'cursor',
        'pointer-events',
        'appearance',
      ],
      {
        unspecified: 'bottomAlphabetical',
        emptyLineBeforeUnspecified: 'never',
      },
    ],
  },
};
