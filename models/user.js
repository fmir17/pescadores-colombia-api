//Esquema para Usuario
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//nombre de variables como las entregaría fb.
var userSchema = new Schema({
    name: String,
    password: String,
    email: String
});

//Exportar esquema
module.exports = mongoose.model('User', userSchema);
