const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = prod => {
    let entry = [path.resolve(__dirname, '../src/')];
    if (!prod) {
        entry = [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            ...entry,
        ];
    }

    const styleLoaders = [
        prod ? MiniCssExtractPlugin.loader : 'style-loader',
        {
            loader: 'css-loader',
            options: {
                sourceMap: !prod,
            },
        },
    ];

    return {
        entry,
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: styleLoaders,
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.jsx', '.mjs', '.json'],
            alias: {
                '@c': path.resolve(__dirname, '../src/'),
            },
        },

        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(
                    prod ? 'production' : 'development',
                ),
            }),
        ],
    };
};
