const Box = require('../models/box');

	async function find (ctx) {
		const boxs = await Box.find({})
		ctx.body = boxs
	}

	async function create (ctx) {
		const newBox = new Box(ctx.request.body)
		const savedBox = await newBox.save()
		ctx.body = savedBox
	}

	async function update (ctx) {
		//Find Box based on id
		const id = ctx.params.id
		const box = await Box.findById(id)

		//Update box in database
		const updatedBox = await box.save()
		ctx.body = updatedBox
	}

	async function destroy (ctx) {
		//Find Box based on id
		const id = ctx.params.id
		const box = await Box.findById(id)

		//Delete box from database
		const deletedBox = await box.remove()
		ctx.body = deletedBox
	}

module.exports = {
	find,
	create,
	update,
	destroy
}