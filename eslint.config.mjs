// eslint.config.mjs

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 1. Base JavaScript Rules & Ignore List
  {
    // Define files this config block applies to (all supported files)
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],

    // Ignore files and directories typically ignored in React projects
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "**/*.min.js",
      "coverage/",
      "public/",
      ".eslintrc.cjs", // Your old config file
    ],

    // Apply recommended standard JS rules
    ...js.configs.recommended,
  },

  // 2. TypeScript/React/Browser Setup
  {
    // Apply this block to JavaScript and TypeScript files that might contain React code
    files: ["**/*.{js,jsx,ts,tsx}"],

    // Define global variables (browser environments, needed for React)
    languageOptions: {
      globals: {
        ...globals.browser,
        // Add environment-specific globals if needed (e.g., node, jest, etc.)
      },
      parserOptions: {
        // Specify the directory for the tsconfig.json file
        project: './tsconfig.json',
      },
    },

    // 3. Recommended TypeScript Rules
    ...tseslint.configs.recommended,

    // 4. Recommended React Rules (using the 'flat' structure)
    // NOTE: This includes the rules for hooks and general React practices.
    ...pluginReact.configs.flat.recommended,

    // 5. Custom Project Rules (Example)
    rules: {
      // You can override/add any rule here
      "react/react-in-jsx-scope": "off", // Generally safe to turn off for React 17+
      "react/prop-types": "off", // Recommended to turn off when using TypeScript
      // Example of enabling a TS rule:
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        }
      ],
      // Add more specific rules as needed...
    },

    // 6. Settings for React Plugin
    settings: {
      react: {
        // Set React version to "detect" to automatically find the installed version
        version: "detect",
      },
    },
  },
]);
