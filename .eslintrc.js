module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {
    'eslint-disable react/display-name': 'off',
    'react/display-name': 'off',
    'max-len': ['error', { code: 100 }],
  },
};
