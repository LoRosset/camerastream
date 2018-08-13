const Box = require('../models/box');
const User = require('../models/user')
	async function find (ctx) {
		const boxs = await Box.find({})
		ctx.body = boxs
	}

	async function findId (ctx) {
		const boxId = ctx.params.box_id
		const box = await Box.findById(boxId)
		ctx.body = box
	}

	async function create (ctx) {
		const newBox = new Box(ctx.request.body)
		const userId = ctx.params.user_id
		newBox.user = userId
		const user = await User.findById(userId)
		user.box = newBox._id

		const savedUser = await user.save()
		const savedBox = await newBox.save()
		ctx.body = savedBox
	}

	async function update (ctx) {
		//Find Box based on id
		const id = ctx.params.box_id
		const box = await Box.findById(id)

		//Update box in database
		const updatedBox = await box.save()
		ctx.body = updatedBox
	}

	async function destroy (ctx) {
		//Find Box based on id
		const id = ctx.params.box_id
		const box = await Box.findById(id)

		//Delete box from database
		const deletedBox = await box.remove()
		ctx.body = deletedBox
	}

module.exports = {
	find,
	findId,
	create,
	update,
	destroy
}