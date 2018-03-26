const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig,{
    mode: 'development',
    performance: {
        hints:false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    ],
    devtool:'#eval-source-map',
    devServer: {
        contentBase: false,
        publicPath: '/',
        host: '127.0.0.1',
        port: '3000',
        inline: true,
        hot: true,
        compress: true,
        open: true,
        overlay: true, //编译器报错的时候，直接在页面显示错误
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
    }
})