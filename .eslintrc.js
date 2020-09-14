module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'import/prefer-default-export': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-shadow': [
      'error',
      {
        allow: [
          'state',
          'getter',
        ],
      },
    ],
    radix: ['error', 'as-needed'],
  },
};
