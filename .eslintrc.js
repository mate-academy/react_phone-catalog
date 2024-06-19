module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
  ],
  rules: {},
  overrides: [
    {
      files: [
        'src/modules/Favorites page/Favorites.tsx',
        'src/modules/Home page/components/HotPrices/HotPrices.tsx',
        'src/modules/Home page/components/Phones/Phone.tsx',
      ],
      rules: {
        'prettier/prettier': 'off',
        'quotes': 'off',
      },
    },
  ],
};
