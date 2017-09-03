
// 当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。
let async = require('async');



let urls = [];
for(var i = 0; i < 10 ; i++){
	urls.push('http://baidu.com_'+i);
}

let fetchUrl = function(url,callback){
	let delay  = 2000 * Math.random();
	console.log(url);
	setTimeout(function(){
		 callback(null,url);
	},delay);
}
async.mapLimit (urls,5,function(url,callback){
	fetchUrl(url,callback);
},function(err,result){
	console.log(result);
})