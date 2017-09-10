var Koa = require('koa');
var WebSocket = require('ws');
var router = require('koa-router')();
var Cookies = require('cookies');
var static = require('koa-static');
var path = require('path');
var bodyparse = require('koa-bodyparser');
var {tmp} = require('./tmp.js');

var app = new Koa();

app.use(static(path.join(__dirname, 'public')));
app.use(tmp());
app.use(bodyparse());
app.use(async(ctx, next) => {
 
   await next();
});
router.get('/', async(ctx, next) => {
    ctx.render('index.html');
});
router.post('/login', async(ctx, next) => {
       var name = ctx.request.body.name;
    //    http的header字符集支持US-ASCII子集的字符集,故设置中文是'utf8'时就会报上面错误[巨坑]
       name = new Buffer(name).toString('base64');
       console.log(name);
       ctx.cookies.set('user',name,{'httpOnly':false});
    //    name =Buffer(ctx.cookies.get('user'),'base64').toString();
       ctx.render('wechat.html',{user:ctx.request.body.name});
});

app.use(router.routes());
var server = app.listen(3000, function () {
    console.log('[SERVER] listen in 3000');
});
var WebSocketServer = WebSocket.Server;
var wss = new WebSocketServer({
    server: server
})
//由于api改动req已经在第二个参数里了
wss.on('connection',function(ws,req){
    console.log('[SERVER] connecting');
    if(req.headers){
        //不知为什么socket带不上cookies
        var cookies = new Cookies(req,null);
        var name = cookies.get('user');
        //name = new Buffer(name,'base64').toString();
    }
    ws.on('message',function(msg){
        console.log(msg);
        wss.broadcast(`${name}: ${msg}`);
    })
})
wss.broadcast = function (data) {
    wss.clients.forEach(function (client) {
        client.send(data);
    });
};