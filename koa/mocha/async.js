var fs = require('mz/fs'); //把异步读取文件由callback改为promise的库
 
module.exports = async () =>{
   var file = await  fs.readFile('./test.txt','utf-8');
   var r = new Function('return ' + file);
   return r() ;
}  