module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          'path/to/folder',
          'packages/*/tsconfig.json',
          'packages/module-a/tsconfig.json',
          'packages/module-b/tsconfig.json',
          'other-packages/*/tsconfig.json',
        ],
      },
      node: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort',
    'import',
  ],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
    },
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.spec.js'] },
    ],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'error',
    'react/prop-types': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^react'], ['^antd'], ['^@?\\w'], ['@/(.*)'], ['^[./]']],
      },
    ],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
  },
};
