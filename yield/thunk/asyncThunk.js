let fs = require('fs');

// 用Generator 函数处理异步
//任何有回调的函数都可以写成thunk函数 即把callback单独传入
//其实就是把异步函数传入 generator每一步返回的对象{value:FUNCTIONG,done:boolen}的value中 并再其中执行的回调中next
thunk = function(fn){
    return function(){
        var args = Array.prototype.slice.apply(arguments); //转成数组这样可以用数组的方法
        return function(callback){
            args.push(callback);
            fn.apply(null,args);
        }
    }
}

let readFileThunk = thunk(fs.readFile);
let gen =function*(){
    var file = yield  readFileThunk('hellow.txt');
    console.log(file.toString());
    var file2 = yield readFileThunk('hellow2.txt')
    console.log(file.toString() + file2.toString());
}

let auto = gen();
// 这是一个生成器生成的迭代对象


// 手动迭代方案
// auto.next().value(function(err,data){
//     var temp = auto.next(data);
//     console.log(temp.done);
//     temp.value(function(err,data){
//         var temp = auto.next(data);
//         console.log(temp.done);
//     });
// })

//下面将其改写为 自动运行的函数 目标将迭代对象传入自动迭代

let run = function(auto){
    function next(data){
        var step = auto.next(data);
        if(!step.done){
            step.value(function(err,data){
                next(data);
            })
        }
    }
    next();
}
run(auto);
