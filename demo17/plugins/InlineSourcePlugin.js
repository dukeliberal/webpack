let HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourcePlugin {
  constructor({match}){
    this.match = match; // 正则
  }
  processTag(tag, compilation){ // tag表示头部的或者身体的标签
    console.log(tag);
    let newTag,url;
    if (tag.tagName === 'link' && this.match.test(tag.attributes.href)){
      newTag = {
        tagName:'style',
        attributes:{type:'text/css'}
      }
      url = tag.attributes.href
    }
    if (tag.tagName === 'script' && this.match.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: { type: 'application/javascript' }
      }
      url = tag.attributes.src
    }
    if(url){
      newTag.innerHTML = compilation.assets[url].source(); // 把内容赋予到标签中
      delete compilation.assets[url];//删除资源
      return newTag
    }
    return tag;
  }
  processTags(data, compilation){ // compiation.assets
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag=>{
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation));
    })
    return { ...data, headTags, bodyTags}
  }
  apply(compiler){
    // 把插入html的标签进行替换 在assets 将资源删除掉
    // 标签什么时候插入到了文件内
    compiler.hooks.compilation.tapAsync('InlineSourcePlugin', (compilation)=>{
      // 这个插件自己定义的
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'MyPlugin',
        (data, cb) => { // data就是源文件中的内容 是个对象
          data = this.processTags(data, compilation); 
          cb(null, data);// null表示错误
        }
      )
    });
  }
}
module.exports = InlineSourcePlugin;

// 打包后发布 发布到cdn上 这里我就使用qiniu

let {AsyncSeriesHook} = require('tapable');
let hook = new AsyncSeriesHook([]);
hook.tapAsync('xxx',function (cb) {
  cb(null,'xxx')
})

hook.callAsync();