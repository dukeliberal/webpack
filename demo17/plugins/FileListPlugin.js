// 文件列表插件
class FileListPlugin{
  constructor({filename}){
    this.filename = filename;
  }
  apply(compiler){
    // 在发射文件之前 在增加一个文件 emit 
    compiler.hooks.emit.tap('FileListPlugin',(compilation,cb)=>{
      let assets = compilation.assets;
      let content = `# 文件的名字     文件的大小\r\n`
      console.log(assets); // {'index.html':{source,size}}
       // 把对象变成数组  [['index.html',{source,size}],['index.html',{source,size}]]
      Object.entries(assets).forEach(([filename,sourceObj]) => {
        content += `- ${filename}    ${sourceObj.size()}\r\n`
      });;
      content += `> 文件的总个数 ${Object.keys(assets).length}`
      assets[this.filename] = {
        source(){
          return content;
        },
        size(){
          return content.length;
        }
      }
     
    })
  }
}
module.exports = FileListPlugin;

// webpack -> node -> commonjs 规范
