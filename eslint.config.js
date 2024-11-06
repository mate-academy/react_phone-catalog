module.exports = {
  env: {
    browser: true,
    es2024: true,
  },
  extends: [
    'plugin:react/recommended',
    "plugin:react-hooks/recommended",
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  overrides: [
    {
      files: ['**/*.spec.jsx'],
      rules: {
        'react/jsx-filename-extension': ['off'],
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'jsx-a11y',
    'import',
    'react-hooks',
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'src/vite-env.d.ts', 'cypress'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};