module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: [
        'airbnb-base',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        indent: ['error', 4],
        'no-unused-vars': ['warn', { vars: 'local', 'args': 'none' }],
        'no-plusplus': 0,
        'max-len': ['warn', 180],
        'one-var': 0,
        'no-console': 'off',
        'arrow-body-style': 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'arrow-parens': 'off',
        'no-underscore-dangle': 'off',
        'lines-between-class-members': 'off',
        'no-multi-spaces': ["error", { ignoreEOLComments: true }],
        'import/extensions': 0,
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/extensions': ['.js','.jsx','.ts','.tsx'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts','.tsx']
         },
         'import/resolver': {
             'node': {
                 'extensions': ['.js','.jsx','.ts','.tsx']
             }
         }
    }
};