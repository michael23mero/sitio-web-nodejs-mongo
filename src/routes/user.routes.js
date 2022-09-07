const rutas = require('express').Router()
const axios = require('axios')

const URL = 'http://localhost:3000/api/v1'

rutas.get('/home', (req, res) =>{
    axios.get(`${URL}/user`, {
        headers: { 'x-access-token': req.cookies.token }
    }).then(resp => {
        console.log(resp.data)
        res.render('views-user/home', { title: 'Home', user: resp.data })
    }).catch(err => {
        res.redirect('/login')
    })
})

module.exports = rutas