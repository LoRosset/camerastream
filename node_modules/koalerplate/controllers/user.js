const User = require('../models/user');
const jwt = require('jsonwebtoken');

	async function findAll (ctx) {
		const users = await User.find({})
		ctx.body = users
	}

	async function create (ctx) {
		const newUser = new User(ctx.request.body)
		const savedUser = await newUser.save()
		ctx.body = savedUser
	}

	async function update (ctx) {
		//Find User based on id
		const id = ctx.params.user_id
		const user = await User.findById(id)

		//Update user in database
		const updatedUser = await user.save()
		ctx.body = updatedUser
	}

	async function destroy (ctx) {
		//Find User based on id
		const id = ctx.params.user_id
		const user = await User.findById(id)

		//Delete user from database
		const deletedUser = await user.remove()
		ctx.body = deletedUser
	}

	async function control(ctx) {
		const usernameGiven = ctx.request.body.username
		const passwordGiven = ctx.request.body.password
		var password = ''
		await User.findOne({ 'username': usernameGiven },'name password', function (err, user){
			if (err) return handleError(err);
			password = user.password
		})
		if (passwordGiven === password) {
			ctx.status = 200;
			ctx.body = {
      			token: jwt.sign({ user_id: user._id, admin: true }, 'A very secret key'), //Should be the same secret key as the one used in ./jwt.js
      			message: "Successfully logged in!"
  			};
		}
		else {
			ctx.status = ctx.status = 401;
			ctx.body = {
				message: "Authentication failed"
			};
		}
	}

module.exports = {
	findAll,
	create,
	update,
	destroy,
	control
}