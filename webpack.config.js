const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

let prod_state = process.env.NODE_ENV==="production"

const config = {
    entry: {
        bundle: './src/index.js',
        jquery: ["jquery"],
        lazysizes: ['lazysizes']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: {importLoader: 1 }},
                        'postcss-loader'
                    ],
                    publicPath: '../'
                }),
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                loaders: [
                    'file-loader?limit=10000&hash=sha512&digest=hex&name=image/[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 4,
                            },
                        },
                    }
                ],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new webpack.LoaderOptionsPlugin({
            debug: !prod_state,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["chunk","lazysizes",'jquery'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['jquery','lazysizes', 'chunk', 'bundle'],
            chunksSortMode: 'manual'
        }),
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[contenthash].css'
        })
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery',
        //     Popper: ['popper.js', 'default']
        // })
    ]
}

config.plugins = config.plugins || []

if(!prod_state){
    config.devtool = "#source-map"
}

module.exports = config;