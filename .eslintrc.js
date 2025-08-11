module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off', // Disable prop-types as we're using TypeScript
    '@typescript-eslint/no-explicit-any': 'warn', // Allow 'any' with warning
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
