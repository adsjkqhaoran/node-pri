let http = require('http');
let url  = require('url');
let superagent = require('superagent');
let qs = require('querystring');
//获取post 和 get 数据的方法
//这里使用superagent来模拟请求
var httpServer = http.createServer(function(request,response){
    if(request.method == 'POST'){
        var body = '';
        request.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        request.on('end', function () {
            let postObj = JSON.parse(body);
            console.log("Body: " + postObj);
            console.log(typeof  postObj);
            console.log(postObj.a);
        });
    }
    if(request.method == 'GET'){
      var queryObj =  qs.parse(url.parse(request.url).query);
      console.log(queryObj);
    }

})

httpServer.listen(8080);

superagent.post('http://127.0.0.1:8080').send({'a':1,'b':2}).end(function(err,res){

})

superagent.get('http://127.0.0.1:8080?c=1&d=3').end(function(err,res){

})