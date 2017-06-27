const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const serve = require('koa-static');
const app = new Koa();

const { tmp } = require('./tmp.js');
app.use(tmp());
router.get('/:name', async (ctx, next) => {
    ctx.render('index.html', { name: ctx.params.name });
})
//对静态资源进行处理
app.use(serve(path.join(__dirname, 'public')));
//使用路由
app.use(router.routes());

app.listen(8080, function () {
    console.log('listen in  8080');
});
