module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {
    "@typescript-eslint/no-shadow": "off",
  },
};
