module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  "rules": {
    "react/display-name": 0,
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/member-delimiter-style": 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "semi": ["error", "never"],
    "no-multi-spaces": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "key-spacing": ["error", { "beforeColon": false }],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0
  },
}
