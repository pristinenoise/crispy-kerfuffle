const path = require('path');

module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_"
      }
    ],
  },
  parserOptions: {
    project: path.resolve(__dirname, "./tsconfig.json"),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module"
  }
};

