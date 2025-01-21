import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier, // This is a config, so it goes under "extends"
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react, // We register the "eslint-plugin-react" plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules, // This way we use recommended set of rules from "eslint-plugin-react" plugin

      'react/react-in-jsx-scope': 'off', // This rule is included in "recommended", but since React 17 it is not needed!

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
