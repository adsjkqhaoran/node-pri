let scroll = async(ctx,next) => {
    console.log('scroll');
    ctx.response.body = 'scroll';
}
module.exports ={
    'get /index/scroll': scroll
}