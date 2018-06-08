const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'js-core'
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:3000' }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});