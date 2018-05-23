// 配置文件全字段详细说明:  https://doc.webpack-china.org/configuration/
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const vuxLoader = require('vux-loader');

const CSSPlugin = new ExtractTextPlugin({filename: "css/index.css", allChunks: true});

const webpackConfig = {
    mode: 'development',    // production,development
    devtool: 'source-map',
    context: path.resolve(__dirname),
    entry: {
        index:'./src/js/index.js',

        //index: './src/js/index.js',     // 必须放在最后, 确保公共CSS正确生成
    },
    output: {               // 默认 ./dist
        filename: './js/[name].js',
        path: path.resolve(__dirname, './dist'),
        chunkFilename: './js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', 'less'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                fastclick: {
                    chunks: 'all',
                    test: /\\fastclick/,
                    name: 'fastclick',
                    priority: -100,
                    enforce: true
                },
                vue: {
                    chunks: 'all',
                    test: /\\node_modules\\vue\\/,
                    name: 'vue',
                    priority: -100,
                    enforce: true
                },
                vux: {
                    chunks: 'all',
                    test: /node_modules\\vux/,
                    name: 'vux',
                    priority: -100,
                    enforce: true
                },
                jquery_weui: {
                    chunks: 'all',
                    test: /\\node_modules\\jquery-weui\\/,
                    name: 'jquery_weui',
                    priority: -200,
                    enforce: true
                },
                modules: {
                    chunks: 'all',
                    test: /\\node_modules\\/,
                    name: 'modules',
                    priority: -300,
                    enforce: true
                },
                es_vue: {
                    chunks: 'all',
                    test: /\\src\\.*\.vue/,
                    name: 'es_vue',
                    priority: -400,
                    enforce: true
                }
            }
        },
        "runtimeChunk": {
            "name": "manifest"
        }
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'manual',
            chunks: ['manifest', 'fastclick', 'vue', 'vux', 'jquery_weui', 'modules', 'es_vue', 'index']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        CSSPlugin,
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'source-map-loader',
                enforce: "pre"
            },
             {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 loader: 'babel-loader',
                 options: {
                     presets: ['env', 'stage-3'],
                     plugins: [
                         "transform-runtime",
                     ]
                 }
             },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: CSSPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: {
                    and: [/\.css$/, /node_modules/]
                },
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'url-loader?limit=1000000'
            },
            {
                test: /\.(html)$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // css: VueCSSPlugin.extract({
                        //     fallback: 'vue-style-loader',
                        //     use: 'css-loader'
                        // }),
                        js: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env', 'stage-3'],
                            }
                        }
                    }
                }
            }
        ]
    }
};

module.exports = vuxLoader.merge(webpackConfig, {
    plugins: [
        {
            name: 'vux-ui'
        },
        // {
        //     name: 'duplicate-style'
        // }
    ]
});
