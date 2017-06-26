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