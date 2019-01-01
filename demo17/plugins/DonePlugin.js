class DonePlugin{
  apply(compiler){ // 插件的结构就是这个样子
    //console.log('编译完成'); // 分一些阶段的

    // 在某些阶段来触发特定的插件
    // tapable 库的用法
    // tap是同步的方法
    compiler.hooks.done.tap('DonePlugin',()=>{
      console.log('编译完成');
    });
    // 我的插件可能很复杂  异步处理 回调的方式  promise
  }
}
module.exports = DonePlugin;