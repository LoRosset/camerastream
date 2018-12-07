const Camera = require('../models/camera');
const Box = require('../models/box');

	async function find (ctx) {
		const id = ctx.params.camera_id
		const camera = await Camera.findById(id)
		ctx.body = camera
	}

	async function create (ctx) {
		const newCamera = new Camera(ctx.request.body)
		const boxId = ctx.params.box_id
		newCamera.box = boxId
		const box = await Box.findById(boxId)
		box.cameras.push(newCamera)

		const savedBox = await box.save()
		const savedCamera = await newCamera.save()
		ctx.body = savedCamera
	}

	async function destroy (ctx) {
		//Find Camera based on id, remove it from box
		const id = ctx.params.camera_id
		const camera = await Camera.findById(id)
		const box = await Box.findById(camera.box)
		box.cameras.splice(box.cameras.indexOf(id), 1)
		const savedBox = await box.save()

		//Delete camera from database
		const deletedCamera = await camera.remove()
		ctx.body = deletedCamera
	}

module.exports = {
	find,
	create,
	destroy
}
