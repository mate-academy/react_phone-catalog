// eslint.config.js
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    languageOptions: {
      parser: tsParser, // тепер об’єкт, а не рядок
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        React: "readonly",
        JSX: "readonly",
        NodeJS: "readonly",
      },
    },

    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
    },

    settings: {
      react: { version: "detect" },
    },

    ignores: ["node_modules/**", "dist/**", "build/**"], // замість .eslintignore
  },
]);
