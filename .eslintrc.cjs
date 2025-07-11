module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript'],
  rules: {
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
     '@typescript-eslint/no-duplicate-enum-values': 'off',
  },
};
