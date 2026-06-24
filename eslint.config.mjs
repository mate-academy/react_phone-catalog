// eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/lib/api/config/flat-config-cli";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "**/*.min.js",
      "coverage/",
      "public/",
      ".eslintrc.cjs",
    ],
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        }
      ],
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: [
      "**/*.cjs",
      "**/*.js",
      "*.config.js",
      "*.config.ts",
      "cypress/**/*.js",
      "cypress/**/*.ts",
    ],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: null,
      },
    },

    rules: {
      "no-undef": "error",
    }
  }
];
