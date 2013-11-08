// Se realizar para enlazar las operaciones sobre el recurso Usuario con los métodos HTTP. 
module.exports = function(app){

    var User = require('../models/user');
    var River = require('../models/river');

    //Crear Nuevo usuario
    //Por ahora se guardará el id,nombre, apellido, email y ciudad
    user = function(req, res){
        var user = new User({id: req.body.id, name: req.body.name, familyName: req.body.familyName, email: req.body.email, city: req.body.city});
        user.save();
        res.end();
    };

    //Crear Nuevo rio
    //Se guardara solo un comentario
    river = function(req,res){
	var river = new River({comment: req.body.comment});
	river.save();
	res.end();	
    };

	  //Buscar todos los usuarios
    list = function(req, res){
        User.find(function(err, user) {
            res.send(user);
        });
    };

    //Buscar si usuario ya existe con id
    find = (function(req, res) {
        User.findOne({id: req.params.id}, function(error, user) {
            res.send(user);
        })
    });

    //Link de las funciones
    app.post('/user', user);
    app.post('/river', river);
    app.get('/user', list);
    app.get('/user/:id', find);
}
