const Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const serve = require('koa-static');
const app = new Koa();

const {tmp} = require('./tmp.js');
app.use(tmp());
router.get('/:name',async (ctx,next)=>{
    ctx.render('index.html',{name:ctx.params.name});
})
console.log(path.join(__dirname,'public'));
app.use(serve(path.join(__dirname,'public')));
app.use(router.routes());

app.listen(8080,function(){
    console.log('listen in  8080');
});
