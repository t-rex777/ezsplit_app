module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'react-native/no-inline-styles': 0,
  },
};
