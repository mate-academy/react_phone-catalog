module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    "react/require-default-props": "off",
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
      ignorePattern: "<path([\\s\\S]*?)/>",
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
