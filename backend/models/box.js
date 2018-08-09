 const mongoose = require('mongoose');
 
 // Declare Schema
 const BoxSchema = new mongoose.Schema(
 	{
	 	ipaddress: { type: String},
	 	type: { type: String},
	 	status: { type: Boolean},
	 	camera: { type: mongoose.Schema.ObjectId, ref: 'Camera'}
 	}, 
 	{ timestamps: true }
 );
 
 // Declare Model to mongoose with Schema
 const Box = mongoose.model('Box', BoxSchema);
 
 // Export Model to be used in Node
 module.exports = mongoose.model('Box');