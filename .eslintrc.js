module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    "jsx-a11y/control-has-associated-label": ["off", {
      "labelComponents": [],
      "labelAttributes": [],
      "controlComponents": [],
      "assert": "both",
      "depth": 25
    }],
    "jsx-a11y/label-has-associated-control": ["off", {
      "labelComponents": [],
      "labelAttributes": [],
      "controlComponents": [],
      "assert": "both",
      "depth": 25
    }],
    "jsx-a11y/click-events-have-key-events": ["off", {
      "labelComponents": [],
      "labelAttributes": [],
      "controlComponents": [],
      "assert": "both",
      "depth": 25
    }],
    "jsx-a11y/no-static-element-interactions": ["off", {
      "labelComponents": [],
      "labelAttributes": [],
      "controlComponents": [],
      "assert": "both",
      "depth": 25
    }],
    "jsx-a11y/label-has-for": ["error", {
      "components": [],
      "required": {
        "some": ["nesting", "id"]
      },
      "allowChildren": false
    }]
  },
};
