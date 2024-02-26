module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-standard-scss'],
  rules: {
    'selector-pseudo-element-colon-notation': 'double',
    'string-quotes': 'single',
  },
  ignoreFiles: ['**/node_modules/**'],
};
