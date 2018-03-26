const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ETWP = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        // index: ["babel-polyfill", path.join(__dirname,'../src/index.js')]
        index: ["babel-polyfill", path.join(__dirname,'../example/index.js')]
    },
    output: {
        path: path.join(__dirname,'../dist'),
        filename: '[name].[hash:5].js',
        publicPath: './'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'../src/index.html'),
            filename: 'index.html',
            title: 'shopshop',
            inject: 'body'
        }),
        new ETWP({
            filename: 'index.css',
            disable: false,
            allChunks: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.join(__dirname ,'../src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ETWP.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ],
                    publicPath: '/'
                })
            }
        ]
    }
}