const rutas = require('express').Router()
const { userController }  = require('../controller')

rutas.post('/user/register', userController.registerUser)
rutas.post('/user/login', userController.loginUser)

module.exports = rutas