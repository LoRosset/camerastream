const User = require('../models/user');

	async function find (ctx) {
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
		const id = ctx.params.id
		const user = await User.findById(id)

		//Update user in database
		const updatedUser = await user.save()
		ctx.body = updatedUser
	}

	async function delete (ctx) {
		//Find User based on id
		const id = ctx.params.id
		const user = await User.findById(id)

		//Delete user from database
		const deletedUser = await user.remove()
		ctx.body = deletedUser
	}

	exports.control = function(req, res) {
		res.send('NOT IMPLEMENTED : login');
	}



module.exports = {
	find,
	create,
	update,
	delete
}