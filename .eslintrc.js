module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.ts', '.tsx'],
  },
  ignorePatterns: ['**/src/app/hooks/*.js'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ['error', {
      assert: 'either',
    }],
  },
};
