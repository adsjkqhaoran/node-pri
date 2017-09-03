var events = require('events');
var util = require('util');
var Promise = function(){
    //这句作用只能继承非原型链上的属性,相当于直接运行构造函数获取里面this后的属性,其实不要也可以
    events.EventEmitter.apply(this,arguments);
     
}
// 相当于
// Promise.prototype = new events.EventEmitter();
// Promise.prototype.construct = Promise;
util.inherits(Promise,events.EventEmitter);
Promise.prototype.then = function(fulfilledHandle,unfulfilledHandle,errorHandle){
    if(typeof fulfilledHandle === 'function'){
        this.once('success',fulfilledHandle)
    }
    if(typeof unfulfilledHandle === 'function'){
        this.once('failed',unfulfilledHandle)
    }
    return this;
}
//延迟对象 对内暴露reject,resolve方法,对外暴露promise对象
var Deffer =  function(){
    this.state = 'unfulfilled'; //fulfilled unfulfilled failed
    this.promise = new Promise();//promise其实就是存储事件(任何事件都被抽象话为三种情况),并对外暴露then保存处理方法
}
Deffer.prototype.reject = function(){
    this.state = 'failed';
    this.promise.emit('error');
}
Deffer.prototype.resolve = function(){
    this.state = 'fulfilled';
    this.prommise.emit('success');
}
//把一般的异步操作Promis化
promisy = function(res){
    var deffer = new Deffer();
    //假设这个异步操作的事件为xx,bb
    // res.on('xx',function(){
    //     Deffer.promise.resolve();
    // })
    // res.on('bb',function(){
    //     Deffer.promise.reject();
    // })
    return deffer.promise;
}

var a = promisy({}).then(function(){console.log('111')},function(){console.log('2');});
a.emit('failed');