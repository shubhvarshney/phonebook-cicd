const {
  defineConfig,
} = require('eslint/config');

const globals = require("globals");
const react = require("eslint-plugin-react");
const jest = require("eslint-plugin-jest");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = defineConfig([
    {
    ignores: [
      'dist/**',
      'vite.config.js',
      'eslint.config.js',
      'package.json',
    ],
    },
    { languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.commonjs,
            ...jest.environments.globals.globals,
        },

        "ecmaVersion": 2018,
        "sourceType": "module",

        parserOptions: {
            "ecmaFeatures": {
                "jsx": true,
            },
        },
    },

    extends: compat.extends("eslint:recommended", "plugin:react/recommended"),

    plugins: {
        react,
        jest,
    },

    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": ["error", "always"],

        "arrow-spacing": ["error", {
            "before": true,
            "after": true,
        }],

        "no-console": "error",
        "react/prop-types": 0,
    },
}]);
