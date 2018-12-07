const Box = require('../models/box')
const User = require('../models/user')
const Camera = require('../models/camera')
const camera_controller = require('./camera')

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

	async function updateCameras (ctx) {
		//Find Box based on id
		const id = ctx.params.box_id
		const box = await Box.findById(id)

		var obj = ctx.request.body
		if(box.cameras.length != 0){
			//delete all current cameras from the box
			for (var i = box.cameras.length - 1; i >= 0; i--) {
				const camera = await Camera.findById(box.cameras[i])
				const deletedCamera = await camera.remove()
			}
			box.cameras = []
		}
		
		//create new cameras
		if(obj.cameras.length != 0){
			for (var i = obj.cameras.length - 1; i >= 0; i--) {
				const newCamera = new Camera(obj.cameras[i])
				newCamera.box = box._id
				box.cameras.push(newCamera)
				const savedCamera = await newCamera.save()
			}
		}

		//Update box in database
		const updatedBox = await box.save()
		ctx.body = updatedBox
	}

	async function destroy (ctx) {
		//Find Box User Cameras based on id
		const id = ctx.params.box_id
		const box = await Box.findById(id)
		const user = await User.findById(box.user)
		user.box = 0
		if(box.cameras.length != 0){
			//delete all current cameras from the box
			for (var i = box.cameras.length - 1; i >= 0; i--) {
				const camera = await Camera.findById(box.cameras[i])
				const deletedCamera = await camera.remove()
			}
			box.cameras = []
		}		
		
		//Update user
		const savedUser = await user.save()
		//Delete box from database
		const deletedBox = await box.remove()
		ctx.body = deletedBox
	}

module.exports = {
	find,
	findId,
	create,
	updateCameras,
	destroy
}