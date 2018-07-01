const Home = require('../models/home');

	async function find (ctx) {
		const homes = await Todo.find({})
		ctx.body = homes
	}

	async function create (ctx) {
		const newHouse = new House(ctx.request.body)
		const savedHouse = await newHouse.save()
		ctx.body = savedHouse
	}

	async function update (ctx) {
		//Find Home based on id
		const id = ctx.params.home_id
		const home = await Home.findById(id)

		//Update home in database
		const updatedHome = await home.save()
		ctx.body = updatedHome
	}

	async function destroy (ctx) {
		//Find Home based on id
		const id = ctx.params.home_id
		const home = await Home.findById(id)

		//Delete home from database
		const deletedHome = await home.remove()
		ctx.body = deletedHome
	}



module.exports = {
	find,
	create,
	update,
	destroy
}