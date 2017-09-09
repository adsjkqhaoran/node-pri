var fs = require('mz/fs'); //把异步读取文件由callback改为promise的库
 //没有es7的话 需要自己调用done函数来结束
 // 参考 http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html
 // 测试http的话 可以配合.expect('Content-Type', /text\/html/)断言响应体 和 .expect(200, '<h1>Hello, Bob!</h1>')响应内容
module.exports = async () =>{
   var file = await  fs.readFile('./test.txt','utf-8');
   var r = new Function('return ' + file);
   return r() ;
}  