const jwt = require('jsonwebtoken')
const { ModelUser } = require('../models')

const registerUser = async (req, res) => {
    const { ...data } = req.body
    const existe = await ModelUser.findOne({ username: data.username})
    if(existe){
        return res.json({msg: `El usuario: ${data.username} ya se encuentra registrado`})
    }
    const user = new ModelUser(data)
    user.password = await user.encryptPassword(data.password)
    await user.save()
    return res.status(200).json({msg: `User created successfully`})
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    const existe = await ModelUser.findOne({ username: username })
    if(!existe){
        return res.status(404).json({ msg: 'User not found' })
    }else{
        const match = await existe.decryptPassword(password)
        if(!match){
            return res.status(404).json({ msg: 'Password is incorrect' })
        }else{
            const token = jwt.sign({id: existe._id}, process.env.JWT_SECRET, { expiresIn: 60*60*24 })
            return res.status(200).json({ msg: 'Welcome', auth: true, accessToken: token })
        }
    }
}

const indexUser = async (req, res) => {
    const user = await ModelUser.findById(req.userId, {password: 0})
    return res.json(user)
}

module.exports = { registerUser, loginUser, indexUser }