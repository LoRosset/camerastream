const Camera = require('../models/camera');

	async function find (ctx) {
		const cameras = await Camera.find({})
		ctx.body = cameras
	}

	async function create (ctx) {
		const newCamera = new Camera(ctx.request.body)
		const savedCamera = await newCamera.save()
		ctx.body = savedCamera
	}

	async function update (ctx) {
		//Find Camera based on id
		const id = ctx.params.id
		const camera = await Camera.findById(id)

		//Update camera in database
		const updatedCamera = await camera.save()
		ctx.body = updatedCamera
	}

	async function delete (ctx) {
		//Find Camera based on id
		const id = ctx.params.id
		const camera = await Camera.findById(id)

		//Delete camera from database
		const deletedCamera = await camera.remove()
		ctx.body = deletedCamera
	}

module.exports = {
	find,
	create,
	update,
	delete
}