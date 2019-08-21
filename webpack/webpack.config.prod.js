const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const ProgressBarPlugin = require('progress-bar-webpack-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = webpackMerge(baseConfig(true), {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../public/dist'),
        filename: '[name].[chunkhash:10].js',
        publicPath: '/dist',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../template/index.html'),
            filename: path.resolve(__dirname, '../public/index.html'),
        }),

        // new MiniCssExtractPlugin({
        //     filename: '[name].[contenthash:10].css',
        // }),
        // new ProgressBarPlugin(),
        // new OptimizeCssAssetsPlugin({}),
    ],
});
