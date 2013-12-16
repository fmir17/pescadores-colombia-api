// Se realizar para enlazar las operaciones sobre el recurso Usuario con los métodos HTTP. 
module.exports = function(app){

    var User = require('../models/user');
    var River = require('../models/river');
    var Wall = require('../models/wall');

    //Crear Nuevo usuario
    //
    user = function(req, res){
        var user = new User({provider: req.body.provider, id: req.body.id, name: req.body.name, familyName: req.body.familyName, email: req.body.email, city: req.body.city});
        user.save();
        res.end();
    };

    //Crear Nuevo rio
    //
    river = function(req,res){
	var river = new River({name: req.body.name, coordinates: req.body.coordinates, location: req.body.location, species:req.body.species, comment: req.body.comment});
	river.save();
	res.end();	
    };

    //Crear Nuevo comentario en Muro
    //
    wall = function(req,res){
        var wall = new Wall({author: req.body.author, body: req.body.body});
        wall.save();
        res.end();
    };

    //Buscar todos los comentarios en el muro
    listWall = function(req, res){
        Wall.find(function(err, wall) {
            res.send(wall);
        });

    };
	  //Buscar todos los usuarios
    listUser = function(req, res){
        User.find(function(err, user) {
            res.send(user);
        });
    };

    listRiver = function(req, res){
        River.find(function(err, river) {
            res.send(river);
        });
    };


    //Buscar si usuario ya existe con id
    find = (function(req, res) {
        User.findOne({id: req.params.id}, function(error, user) {
	if(user!=null){
            res.send(user);
	}
	else{
		res.send(400, 'Usuario con id ' + 	req.params.id+' no encontrado');}
        })
    });

    //Eliminar por id
    remove = (function(req, res){
        User.remove({id: req.params.id}, function(error, user) {
            console.log("eliminado",error);
        });
	res.end();
     });

    //Se direcciona las peticiones a las funciones
	//Redireccion para user
    app.post('/user', user);
    app.get('/user', listUser);
    app.get('/user/:id', find);
    app.delete('/user/:id', remove);	

	//Redireccion para river
    app.post('/river', river);
    app.get('/river', listRiver);

	//Redireccion para wall
    app.post('/wall', wall);
    app.get('/wall', listWall);
}
