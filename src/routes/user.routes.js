const rutas = require('express').Router()
const axios = require('axios')

const URL = 'http://localhost:3000/api/v1'

rutas.get('/home', (req, res) =>{
    axios.get(`${URL}/user`, {
        headers: { 'x-access-token': req.cookies.token }
    }).then(resp => {
        console.log(resp.data)
        axios.get(`${URL}/post/read`, {
            headers: { 'x-access-token': req.cookies.token }
        }).then(resp2 => {
            console.log(resp2.data)
            res.render('views-user/home', { title: 'Home', user: resp.data, data: resp2.data })
        }).catch(err => {
            res.redirect('/login')
        })
    }).catch(err => {
        res.redirect('/login')
    })
})

rutas.get('/post-create', (req, res) => {
    axios.get(`${URL}/user`, {
        headers: { 'x-access-token': req.cookies.token }
    }).then(resp => {
        res.render('views-user/form', { title: 'Home', user: resp.data })
    }).catch(err => { res.redirect('/post-save')})
})

rutas.post('/post-save', (req, res) => {
    console.log(req.body)
    axios({ method: 'POST',
        url: `${URL}/post/create`,
        data: {
            title: req.body.title,
            descp: req.body.descp,
            url: req.body.url,
            user: req.body.user
        }, headers:{ 'x-access-token': req.cookies.token }
    }).then(resp => { res.redirect('/home')
    }).catch(err => { res.redirect('/post-create')
    })
})

module.exports = rutas