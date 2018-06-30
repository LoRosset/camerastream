 const mongoose = require('mongoose');
 require('mongoose-type-email');
 
 // Declare Schema
 const UserSchema = new mongoose.Schema(
 	{
	 	name: { type: String},
	 	//home: { type: mongoose.Schema.ObjectId, ref: 'Home'},
	 	username: {type: String, min: 3, max:20},
	 	password: {type: String, min: 6, max: 40},
	 	email: {type: mongoose.SchemaTypes.Email}
 	}, 
 	{ timestamps: true }
 );
 
 // Declare Model to mongoose with Schema
 const User = mongoose.model('User', UserSchema);
 
 // Export Model to be used in Node
 module.exports = mongoose.model('User');