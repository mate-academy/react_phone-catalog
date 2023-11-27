module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'max-len': ["error", { "code": 130 }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
