var thunkify = require('thunkify');
var fs = require('fs');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
    var r1 = yield readFileThunk('thunk.js');
    // console.log(r1.toString());
    var r2 = yield readFileThunk('thunk.js');
    // console.log(r2.toString());
}

var g = gen();
var r1 = g.next();

r1.value(function(err,data){
    r2 = g.next(data);
    r2.value(function(err,data){
        console.log(data.toString());
    })
})


