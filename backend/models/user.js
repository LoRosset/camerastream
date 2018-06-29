 const mongoose = require('mongoose');
 require('mongoose-type-email');
 
 // Declare Schema
 const UserSchema = new mongoose.Schema(
 	{
	 	name: { type: String, required: true},
	 	home: { type: mongoose.Schema.ObjectId, ref: 'Home'},
	 	username: {type: String, required: true, min: 3, max:20},
	 	password: {type: String, required: true, min: 6, max: 40},
	 	email: {type: mongoose.SchemaTypes.Email, required: true}
 	}, 
 	{ timestamps: true }
 );
 
 // Declare Model to mongoose with Schema
 const User = mongoose.model('User', UserSchema);
 
 // Export Model to be used in Node
 module.exports = mongoose.model('User');