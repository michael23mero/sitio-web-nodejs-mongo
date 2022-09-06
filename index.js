if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const Servidor = require('./src/server')
const server = new Servidor()
server.listen()