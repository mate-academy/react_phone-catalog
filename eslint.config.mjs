import js from "@eslint/js"; 
import globals from "globals"; // Для визначення глобальних змінних
import tseslint from "typescript-eslint"; // Плагін і парсер для TypeScript
import pluginReact from "eslint-plugin-react"; // Плагін для React
import pluginReactHooks from "eslint-plugin-react-hooks"; // Плагін для React Hooks
import pluginPrettier from "eslint-plugin-prettier"; // Плагін для інтеграції Prettier (для правила "prettier/prettier")
import configPrettier from "eslint-config-prettier"; // Конфігурація Prettier (вимикає конфліктні правила ESLint)
import pluginImport from "eslint-plugin-import"; // Плагін для перевірки імпортів

export default tseslint.config(
  js.configs.recommended,

  ...tseslint.configs.recommended, // Розгортаємо рекомендовані правила TypeScript

  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs.recommended, // Рекомендовані правила для React Hooks

  // 4. Основна конфігурація для вашого проєкту (застосовується до певних файлів)
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"], // Застосовуємо до JS/TS/JSX файлів

    languageOptions: {
      parser: tseslint.parser, // Вказуємо парсер TypeScript для TS/JS
      parserOptions: {
        ecmaVersion: "latest", // Використовуємо найновіший синтаксис ECMAScript
        sourceType: "module",
        project: "./tsconfig.json", // Шлях до вашого tsconfig.json
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser, // Додаємо глобальні змінні браузера (наприклад, `window`, `document`)
      },
    },

    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "@typescript-eslint": tseslint.plugin,
      import: pluginImport, // Для `eslint-plugin-import`
      prettier: pluginPrettier, // Для `eslint-plugin-prettier`
    },

    settings: {
      react: {
        version: "detect", // Автоматично визначає версію React для правил
      },
      "import/resolver": {
        typescript: true, // Включає `eslint-import-resolver-typescript`
      },
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off", // Зазвичай відключається, коли використовується TypeScript
    },
  },

  configPrettier, // Вимикає правила ESLint, що конфліктують з Prettier
  {
    rules: {
      "prettier/prettier": "error", // Вмикає правило, яке запускає Prettier як частину ESLint
    },
  },
);