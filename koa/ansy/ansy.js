const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    let result = await next(); // 调用下一个middleware
    console.log(result);
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    //如果是异步的话必须要是promise 不然会立刻执行
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            ctx.response.type = 'text/html';
            ctx.response.body = '<h1>Hello, koa2!</h1>';
            resolve('ok');
        },2000);
    })

});
app.listen(8080);
console.log('app 8080');