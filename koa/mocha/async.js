var fs = require('mz/fs'); //把异步读取文件由callback改为promise的库
 //没有es7的话 需要自己调用done函数来结束
// 参考 http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
module.exports = async () =>{
   var file = await  fs.readFile('./test.txt','utf-8');
   var r = new Function('return ' + file);
   return r() ;
}  