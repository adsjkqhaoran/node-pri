//javascript 运行机制探讨题
// setTimeout(function() {
//     console.log(1)
// }, 0);
// new Promise(function executor(resolve) {
//     console.log(2);
//     for( var i=0 ; i<10000 ; i++ ) {
//         i == 9999 && resolve();
//     }
//     console.log(3);
// }).then(function() {
//     console.log(4);
// });
// console.log(5);
//关于 javascript 运行机制的问题 同步代码 快于 then 快于 settimeout 虽然都是0延迟的写法 但是会有先后
var promise = function(fn){

    setTimeout((function(self){
        return function(){
            fn(self.resolve);
        }
    })(this),0);
    // fn(this.resolve);
    return this;
}
promise.prototype.then = function(resolve){
    console.log('then');
    this.resolve = function(data){
        resolve(data);
    }

}

new promise(function(resolve){
    console.log('start');
    setTimeout(function(){
        resolve('end');
    },1000)
}).then(function(data){
    console.log(data);
})