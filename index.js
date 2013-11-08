//Module dependencies.
var express = require('express'),  
  mongoose = require('mongoose'),  
  http = require('http');   
var app = express();  
  
//Uso de metodos del fw express, para implementar los metodos GET/POST
app.configure(function(){  
  app.use(express.bodyParser());  
  app.use(express.methodOverride());  
  app.use(app.router);  
});  
  
app.configure('development', function(){  
  app.use(express.errorHandler());  
});  
  
routes = require('./routes/Router')(app);  
  
//Se crea con el fin de encontrar una base de datos apropiada para conectar.
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/bdpescacolombia';
  
// Servidor http escuchara en un puerto apropiado, o el puerto 5050 por defecto
var port = process.env.PORT || 5050; 

//Conexion a la b.d. 
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

//Se inicia el servidor
http.createServer(app).listen(port); 

console.log('Pescadores Colombia API listening on port', port);



