let express = require('express');
let superagent = require('superagent');
let cheerio = require('cheerio');
let app = express();
app.get('/',function(req,res){
	superagent.get('https://cnodejs.org/')
	.end(function(err,sres){
		console.log('111');
		if(err){
			console.log(err);
			res.send('出错了!');
			return false;
		}
		let $ = cheerio.load(sres.text);
		let items = [];
		$('.header').find('a').each(function(ids,el){
			items.push($(el).html());
		})
		console.log(items.join('|'));
		res.send(items.join('|'));
	})
});
app.listen(8080,function(){
	console.log('8080');
})
setTimeout(function() {
	superagent.get('http://127.0.0.1:8080').end(
		function(){
			console.log('self');
		}
	);
}, 2000);