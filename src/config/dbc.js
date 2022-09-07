const mongoose = require('mongoose')

module.exports.dbc = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Conexion exitosa con la base de datos`)

    }catch(err){
        console.log('err')
        throw new Error('Error de conexion con la base de datos')
    }
}

/*module.exports.drop = async () => {
    try{
        const drop = await mongoose.connect(process.env.MONGO_URI)
        drop.connection.db.dropDatabase()
        console.log(`Drop database`)

    }catch(err){
        console.log('err')
        throw new Error('Error de conexion con la base de datos')
    }
}*/