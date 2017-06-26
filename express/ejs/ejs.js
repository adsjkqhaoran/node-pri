var ejs = require('ejs');
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static('public'));
app.set('views',path.join(__dirname,'views'));
// app.set('views','./views');
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('index',{title:'ejs pattern'});
})

app.listen(8080,function(){
    console.log('Listen in 8080');
    console.log(__dirname);
})