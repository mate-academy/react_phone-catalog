module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
    'prettier',
  ],
  plugins: ['import'],
  rules: {
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react-router-dom',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{shared/**,contexts/**,modules/**}',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
