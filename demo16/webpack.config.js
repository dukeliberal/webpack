const path = require('path');
const DonePlugin = require('./plugin/DonPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


const devMode = false //process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(css|less)$/,
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader
                , 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        new DonePlugin({
            filename: 'count-file.md'
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist/'))

    ],optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

}