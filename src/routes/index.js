const rutas = require('express').Router()

const { userController, postController }  = require('../controller')
const { verifyAuth } = require('../middlewares')

rutas.post('/user/register', userController.registerUser)
rutas.post('/user/login', userController.loginUser)
rutas.get('/user', [ verifyAuth.verifyToken ],  userController.indexUser)


// **** API POST ****
rutas.post('/post/create', [ verifyAuth.verifyToken ], postController.createPost)
rutas.get('/post/read', [ verifyAuth.verifyToken ], postController.readPosts)
// ******************
module.exports = rutas