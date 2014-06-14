// Se realizar para enlazar las operaciones sobre el recurso Usuario con los métodos HTTP. 
module.exports = function(app){

    var User = require('../models/user');
    var River = require('../models/river');
    var Wall = require('../models/wall');
    var Image = require('../models/image');
    var FishingLog = require('../models/fishinglog');

    //*Metodos para usuario*
    //Crear Nuevo usuario
    user = function(req, res){
        var user = new User({provider: req.body.provider, id: req.body.id, name: req.body.name, familyName: req.body.familyName, email: req.body.email, city: req.body.city});
        user.save();
        res.end();
    };


    //Buscar todos los usuarios
    listUser = function(req, res){
        User.find({}).select('id name familyName email city -_id').exec(function(err, user) {
            res.send(user);
        });
    };

    //Buscar si usuario ya existe con id
    find = (function(req, res) {
        User.findOne({id: req.params.id}, function(error, user) {
	if(user!=null){
            res.send(user);
	}
	else{
		res.send(400, 'Usuario con id: "' + 	req.params.id+'"  no existe.');}
        })
    });

    //Eliminar usuario por id
    remove = (function(req, res){
        User.remove({id: req.params.id}, function(error, user) {
            console.log("eliminado",error);
        });
	res.end();
     }); 

    //*Metodos para rio*
    //Crear Nuevo rio
    river = function(req,res){
	var river = new River({name: req.body.name, coordinates: req.body.coordinates, location: req.body.location, species:req.body.species, comment: req.body.comment});
	river.save();
	res.end();	
    };

    //Consultar todos los rios
    listRiver = function(req, res){
        River.find(function(err, river) {
            res.send(river);
        });
    };

    //*Metodos para Muro*
    //Crear Nuevo comentario en Muro
    wall = function(req,res){
        var date = new Date();

        var datetime= pad2(date.getDate())+'-'+pad2(date.getMonth())+'-'+(date.getYear()+1900) +' '+ pad2(date.getHours()) + ':' + pad2(date.getMinutes()) + ':' +pad2(date.getSeconds()) ;
            
        var wall = new Wall({author: req.body.author, body: req.body.body, created_at:datetime});
        wall.save();
        res.end();
    };
    
    //funcion para establecer el cero en la fecha.
    function pad2(number) {
     return (number < 10 ? '0' : '') + number
    }   

    //Buscar todos los comentarios en el muro
    listWall = function(req, res){
        
        var numberWalls = Number(req.params.count);
        var numberToShow=numberWalls*10;

        Wall.find({}).select('author body created_at -_id').sort('-date').limit(numberToShow).exec(function(err, wall) {
            res.send(wall);
        });

    }; 

    //*Metodos para Imagenes*
    //Consultar ultimas 4 imagenes
    listImage = function(req, res){

        Image.find({}).select('uri -_id').sort('-created_at').limit(4).exec(function(err, image){
            res.send(image);
        });
    };
    //Agregar Imagen
    image = function(req,res){
        var image = new Image({uri: req.body.uri});
        image.save();
        res.end();
    };

    //*Metodos para Bitacora*
    //Enviar Bitacora
    fishinglog= function(req,res){
        var fishinglog = new FishingLog({title:req.body.title,place:req.body.place,date:req.body.date,fish:req.body.fish,bait:req.body.bait,
            weight:req.body.weight,size:req.body.size,description:req.body.description,imageURL:req.body.imageURL,
            userId:req.body.userId,seasonId:req.body.seasonId,fishingpartners:req.body.fishingpartners});
        fishinglog.save();
        res.end();     

    };

    //consultar resumen bitacoras de un usuario
    listfishinglogUser=function(req,res){
        FishingLog.find({userId:req.params.userId}).sort('-date').select('title place date fish -_id ').exec(function(error,fishinglog){
            if(fishinglog!=null)
            {
                res.send(fishinglog);
            }
            else{
                res.send(400, 'El usuario con id "'+req.params.userId+'" no tiene ninguna bitácora');
                }
        })
    };



    //consultar una bitacora determinada de un usuario
    findFishinglogByTitle=function(req,res){
        FishingLog.find({userId:req.params.userId,title:req.params.title}).select('title place date fish bait weight size description imageURL userId seasonId fishingpartners -_id ').exec(function(error,fishinglog){
            if(fishinglog!=null)
            {
                res.send(fishinglog);
            }
            else{
                res.send(400, 'El usuario con id "'+req.params.userId+'" no tiene ninguna bitácora');
                }
        })
    };



    //**Direccionar las peticiones a las funciones
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
    app.get('/wall/:count', listWall);

	//Redireccion para image
    app.post('/image', image);
    app.get('/image', listImage);

    //Redireccion para Bitacora
    app.post('/fishinglog',fishinglog);
    app.get('/fishinglog/:userId',listfishinglogUser);
    app.get('/fishinglog/:userId/:title',findFishinglogByTitle);
}
