module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  ignorePatterns: ["node_modules/", "lib/"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        arrowParens: "avoid",
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "es5",
        useTabs: false,
      },
    ],
  },
};
