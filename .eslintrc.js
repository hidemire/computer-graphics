module.exports = {
  root: true,
  extends: process.env.REACT_APP_DEV_DISABLE_ESLINT ? [] : ['react-app', 'airbnb'],
  env: {
    es6: true,
    browser: true,
  },
  rules: process.env.REACT_APP_DEV_DISABLE_ESLINT ? {} : {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prop-types': ['off'],
    'import/no-unresolved': 'off',
    'no-console': ['error'],
    'react/jsx-props-no-spreading': ['error', {
      custom: 'ignore',
      exceptions: ['div'],
    }],
    'jsx-a11y/label-has-associated-control': ['error', {
      assert: 'htmlFor',
    }],
    'no-underscore-dangle': ['error', {
      allowAfterThis: true,
    }],
  },
};
