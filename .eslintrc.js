module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended' // Adds Prettier as an ESLint rule
  ],
  rules: {
    // Prettier rules
    'prettier/prettier': ['error'],
    // Custom rules
    'max-len': ['error', { code: 80 }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' }
    ],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/semi': ['error', 'always']
  }
};
