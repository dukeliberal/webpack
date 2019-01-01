class AsyncPlugin{
  apply(compiler){
    // 在文件发射之前 做一些动作 
    // 等一秒 在执行打包的操作
    // 发布订阅
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation,cb)=>{
      console.log(compilation.assets); // 每次编译出来的资源文件
      setTimeout(() => {
        console.log('等一等')
        //cb();
      }, 1000);
    })
    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          console.log('等一等')
          resolve();
        }, 1000);
      })
    })
  }
}
// 给事件绑定方法 tap tapPrimise tapAsync -> 这个钩子是异步的
// 有功能的插件 1) 统计打包文件的大小 给我输出一个列表 输出文件的总个数
// 2) 内联标签的功能
// 3) 打包后自动发布的功能
module.exports = AsyncPlugin;