import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginCypress from 'eslint-plugin-cypress';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React + Hooks
  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/destructuring-assignment': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/state-in-constructor': [2, 'never'],
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Accessibility (jsx-a11y)
  {
    plugins: {
      'jsx-a11y': pluginJsxA11y,
    },
    rules: {
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
      'jsx-a11y/label-has-for': [2, {
        components: ['Label'],
        required: { some: ['id', 'nesting'] },
        allowChildren: true,
      }],
    },
  },

  // Import
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      'import/prefer-default-export': 'off',
    },
  },

  // TailwindCSS
  {
    plugins: {
      tailwindcss: pluginTailwindcss,
    },
    rules: {
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
    },
  },

  // General Rules (JS/TS)
  {
    rules: {
      semi: 'off',
      'semi': ['error', 'always'],
      'prefer-const': 'error',
      curly: ['error', 'all'],
      'max-len': ['error', {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      }],
      'no-redeclare': ['error', { builtinGlobals: true }],
      'no-console': 'error',
      'operator-linebreak': 'off',
      'brace-style': ['error', '1tbs'],
      'arrow-body-style': 'off',
      'arrow-parens': 'off',
      'no-param-reassign': ['error', { props: true }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],
    },
  },

  // TypeScript Rules
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/ban-types': ['error', {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      }],
    },
  },

  // Cypress
  {
    files: ['cypress/**/*.{ts,js}'],
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.mocha,
        ...globals.browser,
        Cypress: true,
        cy: true,
        JQuery: true,
      },
    },
    rules: {
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
    },
  },

  // Project files
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
  },

  // Configs (Node)
  {
    files: ['*.config.{js,ts}', '*.cjs', 'vite.config.ts', '.stylelintrc.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
  },

  // Ignore specific files/folders
  {
    ignores: [
      'dist',
      'cypress',
      'postcss.config.ts',
      'tailwind.config.ts',
      'vite.config.ts',
      'src/vite-env.d.ts',
    ],
  },
];
