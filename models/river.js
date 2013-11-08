//Esquema para Rio
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Esquema para Rio vs 1.0
var riverSchema = new Schema({
    comment: String
});

//Exportar esquema
module.exports = mongoose.model('River', riverSchema);
