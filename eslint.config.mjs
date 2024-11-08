import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import compat from 'eslint-plugin-compat';
import globals from 'globals';

import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  compat.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    overrides: [
      {
        files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
        rules: {
          'simple-import-sort/imports': [
            'error',
            {
              groups: [
                ['^react', '^@?\\w'],
                ['^\\u0000'],
                ['^(@|components)(/.*|$)', '^@locales', '^@hooks', '^@context'],
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ['^.+\\.(css|scss)$'],
              ],
            },
          ],
        },
      },
    ],
  },
];
