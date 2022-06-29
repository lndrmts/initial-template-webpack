const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

//PATHS
const src = path.resolve(__dirname, '..', 'src');
const dist = path.resolve(__dirname, '..', 'dist');

module.exports = {
    entry: `${src}/site.js`,
    output: {
        filename: './scripts/main.js',
        path: dist
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|otf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                            publicPath: '../',
                            useRelativePaths: true,
                        },
                    },
                ],
            },
            {
                test: /\.font\.js/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'webfonts-loader',
                        options: {
                            outputPath: 'fonts',
                            publicPath: '../',
                            useRelativePaths: true,
                        },
                    },
                ],
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: function () {
                                    return [require('autoprefixer')];
                                },
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(jpe?g|svg|gif|png)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images',
                            publicPath: '../',
                            useRelativePaths: true,
                        },
                    },
                ],
                type: 'asset',
            },
        ]
    },
    plugins: [
        new ESLintPlugin(),
        new MiniCssExtractPlugin({
            filename: './styles/site.min.css',
        }),
        new ImageminWebpWebpackPlugin({
            config: [
                {
                    test: /\.(jpe?g|png)/,
                    options: {
                        quality: 75,
                    },
                },
            ],
            overrideExtension: true,
            detailedLogs: false,
            silent: false,
            strict: true,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
};