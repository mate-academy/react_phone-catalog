module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
    "prettier",
  ],
  overrides: [
    {
      files: ["declarations.d.ts"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
  rules: {},
};
