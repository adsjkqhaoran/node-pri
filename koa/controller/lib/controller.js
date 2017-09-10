let fs = require('fs');
let router = require('koa-router')();
let path = require('path');
// console.log(__dirname); 代码所在目录
// console.log(process.cwd()); 程序根目录
//遍历所有文件
let readController = function(path,callback){
    let files = fs.readdirSync(path);
    files.map(function(item){
        let stat = fs.statSync(path +'/'+ item);
        if(stat.isDirectory()){
            console.log('文件夹：'+item);
            readController(path +'/'+ item,callback);
        }else{
            //不是目录的话 进行载入
            console.log('文件:'+item);
            callback?callback(path,item):'';
        }
    })
}
let loadController = function(path,item){
    let action = require(path+'/'+item);//把所有方法暴露出来
    for(let i in action){
        if(i.startsWith('get')){
            //注册路由
            router.get(i.substring(3).trim(),action[i]);
        }

    }
}

module.exports = function(){
    let controllerPath = path.resolve(process.cwd(),'controllers');
    readController(controllerPath,loadController);
    return router.routes();
} ;