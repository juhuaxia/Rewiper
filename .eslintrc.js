module.exports = {
    "parser": 'babel-eslint',
    "env": {
        "browser": true
    },
    "extends": ["eslint:recommended","plugin:react/recommended"],
    "rules": {
        "indent": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console":0
    }
};