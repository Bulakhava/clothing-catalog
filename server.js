var express = require('express');
var path = require('path');

var app = express();

var port = 3030;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

app.get('/', function(req, res, next){
	res.render('index.html');
});

app.get('/inner/:id', function(req, res, next){
	res.render('index.html');
});

app.listen(port, function(){
	console.log('Server started on port ' + port);
});