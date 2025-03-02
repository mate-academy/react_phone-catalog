module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: {} },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
  },
};
