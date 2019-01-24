module.exports = {
    extends: [
        'eslint:recommended',
        'prettier',
        'plugin:node/recommended',
        'plugin:jest/recommended'
    ],
    rules: {
        'no-console': 'off',
        'prefer-const': 'error'
    }
};
