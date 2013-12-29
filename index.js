//Module dependencies.
var express = require('express'),  
  mongoose = require('mongoose'),  
  http = require('http');
//Aplicación
var app = express();  
  
//Configuración de la aplicación
app.configure(function(){
//parsear el cuerpo del request para uso del POST.
  app.use(express.bodyParser());  
//middleware que hace posible el soporte de requests tipo PUT o DELETE 
  app.use(express.methodOverride());  
  app.use(app.router);  
});  
  
app.configure('development', function(){  
  app.use(express.errorHandler());  
});  

//add
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
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

//Se Crea y se Inicia el servidor indicandole en que puerto vamos a estar escuchando
http.createServer(app).listen(port); 

console.log('Pescadores Colombia API listening on port', port);

