const Router = require('koa-router')
const router = new Router()

//Controller modules
const home_controller = require('../controllers/home')
const user_controller = require('../controllers/user')
const camera_controller = require('../controllers/camera')
const box_controller = require('../controllers/box')
const jwt = require('../middlewares/jwt')

//Routes path

			//-----USER ROUTES-----//
//GET a user
router.get('/user/:user_id', user_controller.find) 

//GET list of all users
router.get('/user', jwt, user_controller.findAll)

//CREATE a user
router.post('/user/create', user_controller.create)

//UPDATE a user
router.post('/user/:user_id/update', user_controller.update)

//DELETE a user
router.delete('/user/:user_id', jwt, user_controller.destroy)

//POST login information for authentification
router.post('/login', user_controller.control)


			//-----HOME ROUTES-----//
//GET account page with homes of user
router.get('/user/:user_id', jwt, home_controller.find)

//CREATE a home for a specific user
router.post('/user/:user_id/home/create', jwt, home_controller.create)

//UPDATE a specific home
router.post('/user/:user_id/home/:home_id/update', jwt, home_controller.update)

//DELETE a specific home
router.delete('/user/:user_id/home/:home_id', jwt, home_controller.destroy)


			//-----BOX ROUTES-----//
//GET boxes for a specific home
//router.get('/user/:user_id/home/:home_id/', jwt, box_controller.find)
router.get('/box', box_controller.find)
router.get('/box/:box_id', box_controller.findId)
//CREATE a box for a specific home
router.post('/user/:user_id/box/create', box_controller.create)

//UPDATE a specific box
router.post('/user/:user_id/home/:home_id/box/:box_id', jwt, box_controller.update)

//DELETE a specific box
router.delete('/user/:user_id/home/:home_id/box/:box_id', jwt, box_controller.destroy)
			
			//-----CAMERA ROUTES-----//
//GET cameras for a specific box
router.get('/user/:user_id/home/:home_id/box/:box_id/', jwt, camera_controller.find)

//CREATE a camera for a specific box
router.post('/box/:box_id/camera/create', camera_controller.create)

//UPDATE a specific camera
router.post('/user/:user_id/home/:home_id/box/:box_id/camera/:camera_id', jwt, camera_controller.update)

//DELETE a specific camera
router.delete('/user/:user_id/home/:home_id/box/:box_id/camera/:camera_id', jwt, camera_controller.destroy)

module.exports = router.routes()
