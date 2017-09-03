//目标:实现先完成一个异步 再完成下一个异步的链式功能
//思路:1先通过then把所有方法，保存到第一个promise的queue队列里,
//     2 接着每个异步完成后都返回一个新的promise
//     3 把上一个promise的 queue 去除首个 然后 传入新的promise中
//所以promise是不同的promise 但是队列确实同一条队列
var util = require('util');
var fs = require('fs');
var path = require('path');
var Deferred = function(){
    this.promise = new Promise();
}
Deferred.prototype.resolve = function(data){
   var handle = this.promise.queue.shift();
   if(handle&&handle.fulfilled){
      var repromise = handle.fulfilled(data);
      if(!repromise){
           return ; 
      }
      repromise.queue = this.promise.queue; 
   }
   return repromise;
}
Deferred.prototype.reject = function(){

}
Promise = function(){
    this.queue = [];
}
Promise.prototype.then = function(fulfilled,failed,error){
    var handle = {};
    handle.fulfilled  = fulfilled;
    handle.failed = failed;
    handle.error = error;
    this.queue.push(handle);
    return this;
}
Deferred.prototype.callback = function(){
    var that = this;
    return function(err,file){
        if(err){
            return that.reject(err);
        }
        that.resolve(file);
    }

}
var readFile1 = function(file,encoding){
    var deferred = new Deferred();
    fs.readFile(file,encoding,deferred.callback());
    return deferred.promise;
}
var readFile2 = function(file,encoding){
    var deferred = new Deferred();
    fs.readFile(file,encoding,deferred.callback());
    return deferred.promise;
}
readFile1(path.join(__dirname,'file1.txt'),'utf8').then(function(file1){
    return readFile2(file1.trim(),'utf8');
}).then(function(file2){
    console.log(file2);
})