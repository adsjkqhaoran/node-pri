let eventproxy = require('eventProxy');
let superagent = require('superagent');
let cheerio = require('cheerio');

let url = require('url');
let express = require('express');

let app = express();

let cnodeUrl = 'https://cnodejs.org';

// $('.topic_title').attr('href');
app.get('/',function(req,res){
	superagent.get(cnodeUrl,function(err,rres){
		if(err){
			
		}
		let $ = cheerio.load(rres.text);
		let topicUrl =  [];
		$('.topic_title').each(function(ids,el){
			let topUrl = url.resolve(cnodeUrl,$(el).attr('href'));
			topicUrl.push(topUrl);
		})
		// $('.changes').find('span').eq(0).html;
		//并发控制
		let eq = new eventproxy();
		//enterLoad 被触发topicUrl.length次后执行 result包含所有次数的数据
		eq.after('enterLoad',topicUrl.length,function(result){
			res.send(result.join('|'));
		})
		topicUrl.map(function(itemUrl){
			superagent.get(itemUrl,function(err,rres){
				if(err){
					
				}
				let $ = cheerio.load(rres.text);
				eq.emit('enterLoad',$('.signature').text());
			})
		})
	})
});
app.listen(8080,function(){
	console.log('8080');
})