const Camera = require('../models/camera');
const Box = require('../models/box');

	async function find (ctx) {
		const cameras = await Camera.find({})
		ctx.body = cameras
	}

	async function create (ctx) {
		const newCamera = new Camera(ctx.request.body)
		const boxId = ctx.params.box_id
		newCamera.box = boxId
		const box = await Box.findById(boxId)
		box.populate('cameras').exec(function (err, newCamera) {
			if (err) console.log(err);
			
		})

		const savedBox = await box.save()
		const savedCamera = await newCamera.save()
		ctx.body = savedCamera
	}

	async function update (ctx) {
		//Find Camera based on id
		const id = ctx.params.camera_id
		const camera = await Camera.findById(id)

		//Update camera in database
		const updatedCamera = await camera.save()
		ctx.body = updatedCamera
	}

	async function destroy (ctx) {
		//Find Camera based on id
		const id = ctx.params.camera_id
		const camera = await Camera.findById(id)

		//Delete camera from database
		const deletedCamera = await camera.remove()
		ctx.body = deletedCamera
	}

module.exports = {
	find,
	create,
	update,
	destroy
}
