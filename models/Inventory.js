var mongoose = require('mongoose');

// Sample Kit Schema
var InventorySchema = mongoose.Schema({
	samplekit: {
		type: String,
		unique: true
	},
	quantity: {
		type: Number
	}
});

var Inventory = module.exports = mongoose.model('Inventory', InventorySchema);

