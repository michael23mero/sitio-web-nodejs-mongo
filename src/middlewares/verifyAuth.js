const jwt = require('jsonwebtoken')

const { ModelUser, ModelUserRole } = require('../models')

async function verifyToken(req, res, next){
    const token = req.headers['x-access-token']
    if(!token) return res.status(403).json({ msg: 'Invalid token' })
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.id
        next()
    }catch(err){
        return res.status(403).json({ msg: err.message })
    }
}

async function isUser (req, res, next){
    try{
        const user = await ModelUser.findById(req.userId)
        const rol = await ModelUserRole.find({rol: { $in: user.rol }})
        for(let i = 0; i < rol.length; i++){
            if(rol[i].rol === 'user'){
                next()
                return
            }
        }
        return res.status(403).json({ msg: 'Require User Role!' });
    }catch(error){
        console.log(error)
        return res.status(500).json({msg: 'Existe un error que no se cual sea xd'})
    }
}

async function isAdmin (req, res, next){
    try{
        const user = await ModelUser.findById(req.userId)
        const rol = await ModelUserRole.find({rol: { $in: user.rol }})
        for(let i = 0; i < rol.length; i++){
            if(rol[i].rol === 'admin'){
                next()
                return
            }
        }
        return res.status(403).json({ msg: 'Require Admin Role!' });
    }catch(error){
        console.log(error)
        return res.status(500).json({msg: 'Existe un error que no se cual sea xd'})
    }
}

module.exports = { verifyToken, isUser, isAdmin }