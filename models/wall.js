//Esquema para Muro Compartido
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Esquema para Muro
var wallSchema = new Schema({
    author: String,
    body: String
});

//Exportar esquema
module.exports = mongoose.model('Wall', wallSchema);
