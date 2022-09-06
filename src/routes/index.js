const rutas = require('express').Router()
const { userController }  = require('../controller')
const { verifyAuth } = require('../middlewares')

rutas.post('/user/register', userController.registerUser)
rutas.post('/user/login', userController.loginUser)
rutas.get('/user', [ verifyAuth.verifyToken ],  userController.indexUser)

module.exports = rutas