const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
//***********const paths section************
const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    assets: 'assets/',
    fonts: 'assets/fonts/',
    images: 'assets/img/',
    js: 'js/',
    css: 'css/',
}
const PAGES_DIR = `${PATHS.src}/html`
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith('.html'))

//***********main config object************
module.exports = {
    mode: mode,
    entry: './src/index.js',
    output: {
        //path: PATHS.dist,
        //filename: `${PATHS.js}[name].[contenthash].js`,
        filename: `${PATHS.js}[name].js`,
        clean: (mode === 'development') ? false : true,
    },
    devServer: {
        open: true,
        static: {
            directory: PATHS.src,
            watch: true
        }
    },
    devtool: (mode === 'development') ? 'source-map' : false,
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader', 'template-ejs-loader'],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                exclude: `${PATHS.src}/${PATHS.fonts}`,
                generator: {
                    filename: `${PATHS.images}[name][ext][query]`
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                exclude: `${PATHS.src}/${PATHS.images}`,
                generator: {
                    filename: `${PATHS.fonts}[name][ext][query]`
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            //filename: `${PATHS.css}[name].[contenthash].css`
            filename: `${PATHS.css}[name].css`
        }),
        ...PAGES.map(
            page =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page}`
                })
        )
    ],
}