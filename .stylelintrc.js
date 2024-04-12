module.exports = {
  extends: '@mate-academy/stylelint-config',
  rules: {
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['/grid-template/'],
      },
    ],
  },
};
