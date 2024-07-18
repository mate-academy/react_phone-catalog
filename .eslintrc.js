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
        'src/components/Navigation/Navigation.tsx',
        'src/components/Navigation/components/ThemeSwitch/ThemeSwitch.tsx',
      ],
      rules: {
        'prettier/prettier': 'off',
        'quotes': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
      },
    },
  ],
};
