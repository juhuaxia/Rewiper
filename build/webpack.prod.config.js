const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig,{
    mode: 'production',
    performance: {
        hints:"error"
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin()
        ],
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new ClearWebpackPlugin(['../dist']),
    ]
})