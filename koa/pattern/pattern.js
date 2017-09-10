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
//学习如何处理静态资源文件 https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501628911140e1cb6ce7d42e5af81480f7ecd5802000
//基本思路通过判断资源是否位于静态文件夹里 并对其进行处理 其中为了输出不为txt文本
// 查找文件的mime:
//ctx.response.type = mime.lookup(rpath); 通过该方法设置文件输出的content-type
app.use(serve(path.join(__dirname, 'public')));
//使用路由
app.use(router.routes());

app.listen(8080, function () {
    console.log('listen in  8080');
});
