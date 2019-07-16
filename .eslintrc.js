module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  rules: {
    "no-console": "off",
    "no-debugger": "error",
    "vue/mustache-interpolation-spacing": "error",
    "vue/array-bracket-spacing": "warning",
    "vue/arrow-spacing": "warning",
    "vue/block-spacing": "warning",
    "vue/brace-style": "warning",
    "vue/comma-dangle": "warning",
    "vue/eqeqeq": "warning",
    "vue/key-spacing": "warning",
    "vue/object-curly-spacing": "warning",
    "vue/script-indent": "warning",
    "vue/space-infix-ops": "warning",
    "vue/space-unary-ops": "warning",
    "vue/singleline-html-element-content-newline": "warning",
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false
      }
    ],
    "prettier/prettier": [
      {
        singleQuote: true
      }
    ]
  },

  parserOptions: {
    parser: "babel-eslint"
  }
};
