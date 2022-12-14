const rutas = require('express').Router()
const axios = require('axios')

const URL = 'http://localhost:3001/api/v1'

rutas.get('/register', (req, res) =>{ res.render('register', {title: 'Register', alert: false}) })

rutas.post('/register', (req, res) => {
    console.log(req.body)
    axios.post(`${URL}/user/register`, {
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password
    }).then(resp => {
        console.log(resp.data.user)
        res.redirect('/login')
    }).catch(err => {
        console.log(err.response.data.msg)
        res.render('register', {
            alert: true, alertMessage: err.response.data.msg, alertIcon: 'info',time: 1500, ruta: 'register'
        })
    })
})

rutas.get('/login', (req, res) =>{ res.render('login', {title: 'Login', alert: false}) })

rutas.post('/login', (req, res) => {
    console.log(req.body)
    axios.post(`${URL}/user/login`, {
        username: req.body.username,
        password: req.body.password
    }).then(resp => {
        console.log(resp.data)
        const cookie_ = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('token', resp.data.accessToken, cookie_)
        if(resp.data.role === 'user') res.redirect('/')
        if(resp.data.role === 'admin') res.redirect('/home')
    }).catch(err => {
        console.log(err.response.data.msg)
        res.render('login', {
            alert: true, alertMessage: err.response.data.msg, alertIcon: 'info',time: 1500, ruta: 'login'
        })
    })
})

rutas.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
})

module.exports = rutas