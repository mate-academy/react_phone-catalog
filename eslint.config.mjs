import { defineConfig } from 'eslint';
import globals from 'globals';
import pluginJs from '@eslint/js';
import { config as tsConfig } from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';

export default defineConfig({
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
      languageOptions: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: 'module',
          project: './tsconfig.json',
        },
      },
      plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
      ],
      rules: {},
    },
    {
      files: ['**/*.js'],
      languageOptions: {
        sourceType: 'script',
      },
      extends: [
        'eslint:recommended',
      ],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
});
