//Esquema para Usuario
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//nombre de variables como las entregaría fb.
var userSchema = new Schema({
    id: String,
    name: String,
    familyName: String,
    email: String,
    city: String
});

//Exportar esquema
module.exports = mongoose.model('User', userSchema);
