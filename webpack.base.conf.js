const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    entry: './src/main.ts',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'js-core.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
}