let check = async (ctx,next) =>{
    console.log('登录check');
    ctx.response.body = '登录check';
};
let loginIn = async (ctx,next) =>{
    console.log('登录login');
    ctx.response.body = '登录login';
}
module.exports = {
    'get /user/check' : check,
    'get /user/loginIn' : loginIn
}