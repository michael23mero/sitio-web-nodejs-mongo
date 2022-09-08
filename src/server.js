const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

class Servidor{
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        require('./config/dbc').dbc()

        this.middlewares()
        this.routes()
        this.views()
    }

    middlewares(){
        this.app.use(cookieParser())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes(){
        this.app.use('/api/v1', require('./routes'))
        this.app.use(require('./routes/auth.routes'))
        this.app.use(require('./routes/user.routes'))
        this.app.use(require('./routes/admin.routes'))
    }

    views(){
        this.app.set('views', path.join(__dirname, 'views'))
        this.app.set('view engine', 'hbs')

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor a su servicio en el puerto ${this.port}`)
        })
    }
}

module.exports = Servidor