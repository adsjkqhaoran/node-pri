const nunjucks = require('nunjucks'); //模板引擎
function createEnv(path, opts) {
    var
        autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
})
var tmp = function () {
    return async(ctx, next) => {
        //给ctx添加render方法 
        ctx.render = function (file, data) {
            ctx.response.body = env.render(file, data);
        }
        //继续执行后面的中间件
        await next();
    }
}

exports.tmp = tmp;