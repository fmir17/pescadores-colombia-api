//imports
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Esquema para bitacora
var shipslogSchema = new Schema({
	place: String,
	date: {type: Date},
	//hour
	fish: String,
	bait: String,
	weight: {type: Number},
	size: {type: Number},
	description: String,
	imageURL: String,
	userId: String,
	seasonId: String,
	fishingpartners: String,
});


//exportar Esquema
module.exports = mongoose.model('ShipsLog', shipslogSchema);