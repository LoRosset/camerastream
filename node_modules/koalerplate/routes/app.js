const Router = require('koa-router')
const router = new Router()

//Controller modules
const user_controller = require('../controllers/user')
const camera_controller = require('../controllers/camera')
const box_controller = require('../controllers/box')
const flux_controller = require('../controllers/flux')
const jwt = require('../middlewares/jwt')

//Routes path

			//-----USER ROUTES-----//
//GET a user
router.get('/user/:user_id', jwt, user_controller.find) 

//GET list of all users
router.get('/user', jwt, user_controller.findAll)

//CREATE a user
router.post('/user/create', jwt, user_controller.create)

//UPDATE a user
router.post('/user/:user_id/update', jwt, user_controller.update)

//DELETE a user
router.delete('/user/:user_id', jwt, user_controller.destroy)

//POST login information for authentification
router.post('/login', user_controller.control)


			//-----BOX ROUTES-----//
//GET boxes for a specific home
//router.get('/user/:user_id/home/:home_id/', jwt, box_controller.find)
router.get('/box', jwt, box_controller.find)

router.get('/box/:box_id', jwt, box_controller.findId)
//CREATE a box for a specific home
router.post('/user/:user_id/box/create', jwt, box_controller.create)

//UPDATE a specific box
router.post('/box/:box_id', jwt, box_controller.updateCameras)

//DELETE a specific box
router.delete('/user/:user_id/home/:home_id/box/:box_id', jwt, box_controller.destroy)
			
			//-----CAMERA ROUTES-----//
//GET a specific camera
router.get('/camera/:camera_id/', jwt, camera_controller.find)

//CREATE a camera for a specific box
router.post('/box/:box_id/camera/create', jwt, camera_controller.create)

//UPDATE cameras
router.post('/box/:box_id/camera/:camera_id', jwt, camera_controller.update)

//DELETE a specific camera
router.delete('/user/:user_id/home/:home_id/box/:box_id/camera/:camera_id', jwt, camera_controller.destroy)

			//-----CONNEXION ROUTE-----//
router.get('/flux', jwt, flux_controller.findPort)

router.post('/flux', jwt, flux_controller.createProxy)

module.exports = router.routes()
