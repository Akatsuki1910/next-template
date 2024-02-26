module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-standard-scss'],
  rules: {
    'selector-pseudo-element-colon-notation': 'double',
  },
  ignoreFiles: ['**/node_modules/**'],
};
