 const mongoose = require('mongoose');
 
 // Declare Schema
 const BoxSchema = new mongoose.Schema(
 	{
 		user: { type: mongoose.Schema.ObjectId, ref: 'User'},
	 	ip: { type: String},
	 	mac: { type: String},
	 	//status: { type: Boolean},
	 	cameras: [{ type: mongoose.Schema.ObjectId, ref: 'Camera'}]
 	}, 
 	{ timestamps: true }
 );
 
 // Declare Model to mongoose with Schema
 const Box = mongoose.model('Box', BoxSchema);
 
 // Export Model to be used in Node
 module.exports = mongoose.model('Box');