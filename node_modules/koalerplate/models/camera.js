 const mongoose = require('mongoose');
 
 // Declare Schema
 const CameraSchema = new mongoose.Schema(
 	{
 		name: { type: String},
	 	ip: { type: String},
	 	box: { type: mongoose.Schema.ObjectId, ref: 'Box'}
	 	//type: { type: String},
	 	//status: { type: Boolean}
 	}, 
 	{ timestamps: true }
 );
 
 // Declare Model to mongoose with Schema
 const Camera = mongoose.model('Camera', CameraSchema);
 
 // Export Model to be used in Node
 module.exports = mongoose.model('Camera');