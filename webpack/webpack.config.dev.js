const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig(false), {
    mode: 'development',
    output: {
        path: '/public',
        publicPath: '/',
        filename: 'dist/app.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../template/index.html'),
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, '../public'),
        }),
    ],
});
