const webpack = require('webpack');
const HtmlWebpackPlugin = require('../node_modules/html-webpack-plugin');
const ExtractTextPlugin = require('../node_modules/extract-text-webpack-plugin');
const CleanWebpackPlugin = require("../node_modules/clean-webpack-plugin");

module.exports = {
  devtool: 'eval-source-map',
  entry: './main.js',
  output: {
    path: __dirname + "/build",
    filename: "bundle-[hash].js"
  },
  devServer: {
    contentBase: "./public",
    port: 2222,
    historyApiFallback: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "env", "react"
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader",
            options: {
              modules: true,
              //localIdentName: '[name]__[local]--[hash:base64:5]'
            },
          }, {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css"),
    new CleanWebpackPlugin('build/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    })
  ],
};
