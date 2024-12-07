module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Wyłącz kolizje między ESLint a Prettier
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
