let path = require('path');
let fs = require('fs');
let http = require('http');
let url  = require('url');
//使用fs.stat检测文件状态 并把文件以流管道的形式输出
//下面的写法甚至可以直接输出正在运行的该js文件感觉有点危险

let httpServer = http.createServer(function(request,response){
    // console.log(url.parse(request.url));
    // path.resolve('.')  == __dirname
    // console.log(path.resolve('.'));
    // console.log(__dirname);
    var notFound = function(){
        console.log('404');
        response.writeHead(404);
        response.end('404 not found');
    }
    let fileName = url.parse(request.url).pathname.split('/').reverse()[0];
    let tail = fileName.split('.')[1];
    let filePath = path.join(__dirname,fileName);
    if(tail=='js'){
        notFound();
        return false;
    }

    fs.stat(filePath,function(err,data){
        if(!err&&data.isFile()){
            response.writeHead(200,{'Content-Type':'text/'+tail});
            fs.createReadStream(filePath).pipe(response);
        }else{
            notFound();
        }

    });

});

httpServer.listen(8080,function(){
    console.log('listen on 8080');
});
