//Module dependencies.
var express = require('express');
var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.use(express.logger('dev'));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// routes
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
	

app.listen(app.get('port'), function(){
	console.log('Pescadores Colombia API listening on port ' + app.get('port'));
});
