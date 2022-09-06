const jwt = require('jsonwebtoken')

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

module.exports = { verifyToken }