module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    'no-console': 'off',
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  env: {
    node: true,
  },
};