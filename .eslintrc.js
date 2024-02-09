module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'no-plusplus': 'off',
    "react/no-array-index-key": "off",
    "no-param-reassign": ["error", { props: false }],
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-use-before-define": "off",
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/no-cycle': 'off',
    'max-len': ['error', {
      code: 100,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
