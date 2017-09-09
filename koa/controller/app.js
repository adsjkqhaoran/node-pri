let koa = require('koa');
let app = new koa();
//路由控制器
let controller = require('./lib/controller');
app.use(async(ctx,next)=>{
    try{
        await next();
        if (ctx.status == '404') {
            console.log(404);
            ctx.response.body = '404';
        }
    }catch(err){
        console.log(err);
        ctx.response.body = '500';
    }
})
app.use(controller());
app.listen(8080,function(){
    console.log('8080');
});