module.exports = {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "@mate-academy/eslint-config-react",
  ],
  "plugins": [
    "@typescript-eslint",
    "react-hooks"
  ],
  "rules": {
    // typescript
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    "no-unused-expressions": ["warn", {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",

    // react
    "react/jsx-filename-extension": ["warn", {
      "extensions": [".jsx", ".tsx"]
    }],
    "react/prop-types": "off", // Incompatible with TS props type?
    "react-hooks/rules-of-hooks": "error",
    "react/no-danger": "off",

    "import/extensions": "off",
    "arrow-body-style": "off",
    "arrow-parens": "off"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
