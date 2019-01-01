let {AsyncSeriesHook } = require('tapable');
let hook = new AsyncSeriesHook();
// async库
hook.tapAsync('xxx',function (cb) {
 cb(null);
})
hook.tapAsync('xxx', function (cb) {
  console.log('xxx')
})
hook.callAsync();