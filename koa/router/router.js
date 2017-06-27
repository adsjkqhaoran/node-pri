const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();
app.use(async (ctx,next) =>{
    console.log(ctx.request.url);
    await next();
});
router.get('/',async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});
router.get('/home',async (ctx, next) => {
    ctx.response.body = '<h1>home</h1>';
});
app.use(router.routes());
app.listen(8080);