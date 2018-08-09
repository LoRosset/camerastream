 const mongoose = require('mongoose');
 
 // Declare Schema
 const HomeSchema = new mongoose.Schema(
 	{
	 	name: { type: String},
	 	box: { type: mongoose.Schema.ObjectId, ref: 'Box'}
 	}, 
 	{ timestamps: true }
 );
 
 // Declare Model to mongoose with Schema
 const Home = mongoose.model('Home', HomeSchema);
 
 // Export Model to be used in Node
 module.exports = mongoose.model('Home');