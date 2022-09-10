const rutas = require('express').Router()
const axios = require('axios')

const URL = 'http://localhost:3000/api/v1'

rutas.get('/home', (req, res) =>{
    axios.get(`${URL}/admin`, {
        headers: { 'x-access-token': req.cookies.token }
    }).then(resp => {
        axios.get(`${URL}/users`, {
            headers: { 'x-access-token': req.cookies.token }
        }).then(resp2 => {
            res.render('views-admin/home', { title: 'Home', admin: resp.data, users: resp2.data })
        }).catch(err => {
            res.redirect('/login')
        })
    }).catch(err => {
        res.redirect('/login')
    })
})

module.exports = rutas