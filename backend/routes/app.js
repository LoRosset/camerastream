const Router = require('koa-router')
const router = new Router()

//Controller modules
const home_controller = require('../controllers/home')
const user_controller = require('../controllers/user')
const camera_controller = require('../controllers/camera')
const box_controller = require('../controllers/box')


//Routes path

			//-----USER ROUTES-----//
//GET login page
router.get('/', function(req,res){
	res.redirect('/login')
})

//GET list of all users
router.get('/user', user_controller.find)

//CREATE a user
router.post('/user/create', user_controller.create)

//UPDATE a user
router.post('/user/:id/update', user_controller.update)

//DELETE a user
router.delete('/user/:id', user_controller.destroy)

//POST login information for authentification
//router.post('/login', user_controller.control)


			//-----HOME ROUTES-----//
//GET account page with homes of user
router.get('/user/:id', home_controller.find)

//CREATE a home for a specific user
router.post('/user/:id/home/create', home_controller.create)

//UPDATE a specific home
router.post('/user/:id/home/:id/update', home_controller.update)

//DELETE a specific home
router.delete('/user/:id/home/:id', home_controller.destroy)


			//-----BOX ROUTES-----//
//GET boxes for a specific home
router.get('/user/:id/home/:id/', box_controller.find)

//CREATE a box for a specific home
router.post('/user/:id/home/:id/box/create', box_controller.create)

//UPDATE a specific box
router.post('/user/:id/home/:id/box/:id', box_controller.update)

//DELETE a specific box
router.delete('/user/:id/home/:id/box/:id', box_controller.destroy)
			
			//-----CAMERA ROUTES-----//
//GET cameras for a specific box
router.get('/user/:id/home/:id/box/:id/', camera_controller.find)

//CREATE a camera for a specific box
router.post('/user/:id/home/:id/box/:id/camera/create', camera_controller.create)

//UPDATE a specific camera
router.post('/user/:id/home/:id/box/:id/camera/:id', camera_controller.update)

//DELETE a specific camera
router.delete('/user/:id/home/:id/box/:id/camera/:id', camera_controller.destroy)

module.exports = router.routes()