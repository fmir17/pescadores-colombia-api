//Esquema para almacenar URIS de imagenes
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Esquema para Imagen
var imageSchema = new Schema ({
    uri: String,
    created_at : { type: Date, default: Date.now }
});
	
//Exportar esquema
module.exports = mongoose.model('Image', imageSchema);
