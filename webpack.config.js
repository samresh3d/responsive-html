const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: ['babel-polyfill', './src/js/main.js']
    },
    output: {
        filename: './js/[name].bundle.js',
        path: path.resolve(__dirname, "dist")
    },
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        open: true,
        contentBase: path.join(__dirname, "./src"),
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            minimize: !isDevelopment
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            autoprefixer: {
                                browsers: ["last 2 versions"]
                            },
                            sourceMap: isDevelopment,
                            plugins: () => [
                                autoprefixer
                            ]
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "css/[id].css"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.hbs',
            filename: 'index.html',
            inject: false,
            minify: !isDevelopment && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: false,
                removeEmptyElements: false
            },
        })
    ]
};

