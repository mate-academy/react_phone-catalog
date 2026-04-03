module.exports = {
  extends: "@mate-academy/stylelint-config",
  plugins: ["stylelint-order"],
  rules: {
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    'order/properties-order': [
      {
        groupName: 'positioning',
        properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
      },
      {
        groupName: 'box-model',
        properties: [
          'display',
          'flex', 'flex-direction', 'flex-wrap', 'flex-flow',
          'flex-grow', 'flex-shrink', 'flex-basis',
          'justify-content', 'justify-items', 'justify-self',
          'align-content', 'align-items', 'align-self',
          'grid', 'grid-template', 'grid-template-columns', 'grid-template-rows',
          'grid-template-areas', 'grid-area', 'grid-column', 'grid-row',
          'gap', 'column-gap', 'row-gap',
          'width', 'min-width', 'max-width',
          'height', 'min-height', 'max-height',
          'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
          'padding-inline', 'padding-block',
          'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
          'margin-inline', 'margin-block',
          'overflow', 'overflow-x', 'overflow-y',
        ],
      },
      {
        groupName: 'visual',
        properties: [
          'background', 'background-color', 'background-image',
          'background-position', 'background-size', 'background-repeat',
          'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
          'border-width', 'border-style', 'border-color', 'border-radius',
          'box-shadow', 'outline', 'opacity', 'visibility', 'cursor',
        ],
      },
      {
        groupName: 'typography',
        properties: [
          'font', 'font-family', 'font-size', 'font-weight', 'font-style',
          'line-height', 'letter-spacing', 'text-align', 'text-decoration',
          'text-transform', 'text-overflow', 'white-space', 'word-break',
          'color',
        ],
      },
      {
        groupName: 'transitions',
        properties: ['transition', 'animation', 'transform'],
      },
    ],
  },
};
