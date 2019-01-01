// webpack配置文件

let path = require('path');
// 在文件打包后输出一句 编译完成
let DonePlugin = require('./plugins/DonePlugin');
let AsyncPlugin = require('./plugins/AsyncPlugin');
let FileListPlugin = require('./plugins/FileListPlugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let InlineSourcePlugin = require('./plugins/InlineSourcePlugin');
let UploadPlugin = require('./plugins/UploadPlugin')
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'aa.js',
    publicPath:'http://img.fullstackjavascript.cn',
    path: path.resolve(__dirname,'dist'),// 绝对路径
  },
  module:{
    rules:[
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader,'css-loader']}
    ]
  },
  plugins:[
    // new DonePlugin(), // 使用这个插件
    // new AsyncPlugin()
    new MiniCssExtractPlugin({
      filename:'aa.css'
    }),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'aa.html'
    }),
    // new FileListPlugin({
    //   filename:'md/detail.md'
    // }),
    new InlineSourcePlugin({ // 配置需要转化的文件
      match:/\.(js|css)$/
    }),
    new UploadPlugin({
      bucket: 'jwstatic',
      domain:"img.fullstackjavascript.cn", 
      accessKey: 'uimQ1Inof5KwcA5ETlLMnwoJzrIhigEEilWMpJtg', 
      secretKey: 'zNoP0z1XzHFGN0JMJsxSEvLRcFPXxAVaXEDWOwdH'
    })
  ]
};