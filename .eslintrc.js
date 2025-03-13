/* eslint-env node */

module.exports = {
  ignorePatterns: ['dist/', 'reports/'],
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/resolver': { typescript: {} },
    react: { version: 'detect' },
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
  },
};
