let express = require('express');

let app = express();

app.get('/',function(req,res){
	res.send('你好！');
})

app.listen(8080,function(){
	console.log('8080');
})