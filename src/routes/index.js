const rutas = require('express').Router()

const { userController, postController, userRolController }  = require('../controller')
const { verifyAuth } = require('../middlewares')

rutas.post('/user/register', userController.registerUser)
rutas.post('/user/login', userController.loginUser)

// **** API INDEX USER ****
rutas.get('/user', [ verifyAuth.verifyToken, verifyAuth.isUser ],  userController.indexUser)
rutas.get('/admin', [ verifyAuth.verifyToken, verifyAuth.isAdmin ],  userController.indexUser)
// ************************


// **** API POST ****
rutas.post('/post/create', [ verifyAuth.verifyToken, verifyAuth.isUser, ], postController.createPost)
rutas.get('/post/read', [ verifyAuth.verifyToken, verifyAuth.isUser ], postController.readPosts)
rutas.put('/post/update/:id', [ verifyAuth.verifyToken, verifyAuth.isUser ], postController.updatePost)
rutas.delete('/post/remove/:id', [ verifyAuth.verifyToken, verifyAuth.isUser ], postController.removePost)
rutas.get('/post/get/:id', [ verifyAuth.verifyToken, verifyAuth.isUser ], postController.getPost)
// ******************


// **** API USER ROLE ****
rutas.post('/rol-user/create', userRolController.createUserRole)
rutas.get('/rol-user/read', userRolController.readUserRole)
// *********************** 
module.exports = rutas