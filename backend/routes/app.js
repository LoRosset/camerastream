const Router = require('koa-router')
const router = new Router()

//Controller modules
const user_controller = require('../controllers/user')
const camera_controller = require('../controllers/camera')
const box_controller = require('../controllers/box')
const flux_controller = require('../controllers/flux')
const jwt = require('../middlewares/jwt')

//Routes path

//POST login information for authentification
router.post('/login', user_controller.control)

			//-----USER ROUTES-----//
//GET a user
router.get('/user/:user_id', jwt, user_controller.find) 
//GET list of all users
router.get('/user', jwt, user_controller.findAll)
//CREATE a user
router.post('/user/create', jwt, user_controller.create)
//DELETE a user
router.delete('/user/:user_id', jwt, user_controller.destroy)

			//-----BOX ROUTES-----//
//GET list of all boxes
router.get('/box', jwt, box_controller.find)
//GET a box
router.get('/box/:box_id', jwt, box_controller.findId)
//UPDATE a specific box
router.post('/box/:box_id', jwt, box_controller.updateCameras)
//DELETE a specific box
router.delete('/box/:box_id', jwt, box_controller.destroy)
//CREATE a box for a user
router.post('/box/create/user/:user_id', jwt, box_controller.create)
			
			//-----CAMERA ROUTES-----//
//GET a specific camera
router.get('/camera/:camera_id/', jwt, camera_controller.find)
//CREATE a camera for a specific box
router.post('/camera/create/box/:box_id', jwt, camera_controller.create)
//DELETE a specific camera
router.delete('/camera/:camera_id', jwt, camera_controller.destroy)

			//-----CONNEXION ROUTES-----//
//CREATE a connexion and a proxy
router.get('/flux/:box_id/:camera_id', jwt, flux_controller.createProxy)
//DELETE a connexion and a proxy
router.delete('/flux/:box_id/:camera_id', jwt, flux_controller.destroyConnection)
//GET actual list of cameras of a box
router.get('/flux/:box_id', jwt, flux_controller.getCameras)

module.exports = router.routes()
