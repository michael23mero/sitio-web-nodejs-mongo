const jwt = require('jsonwebtoken')
const { ModelUser, ModelPost} = require('../models')

const registerUser = async (req, res) => {
    const { ...data } = req.body
    const existe = await ModelUser.findOne({ username: data.username})
    if(existe){
        return res.status(400).json({msg: `El usuario: ${data.username} ya se encuentra registrado`})
    }
    const user = new ModelUser(data)
    user.password = await user.encryptPassword(data.password)
    await user.save()
    
    return res.status(201).json({user: `User created successfully`})
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
            return res.status(200).json({ msg: 'Welcome', auth: true, accessToken: token, role: existe.rol })
        }
    }
}

const deleteAccount = async (req, res) => {
    const { id } = req.params
    await ModelUser.findByIdAndRemove(id)
    await ModelPost.deleteMany({user: id})
    return res.status(200).json({msg: `Account deleted successfully`})
}

const changeStatus = async (req, res) => {
    const { id } = req.params
    const estado = await ModelUser.findById(id)
    estado.status = !estado.status
    await estado.save()
    return res.status(200).json({msg: 'User status updated successfully'})
}

const indexUser = async (req, res) => {
    const user = await ModelUser.findById(req.userId, {password: 0})
    return res.status(200).json(user)
}

const readUser = async (req, res) => {
    const data = await ModelUser.find({ rol: {$nin:'admin'}})
    return res.status(200).json(data)
}

const updateUser = async (req, res) =>{
    const { id } = req.params
    const { ...data } = req.body
    await ModelUser.findByIdAndUpdate(id, data, {new: true})
    res.status(200).json({msg: `User updated successfully`})
}

const removeUser = async (req, res) => {
    const { id } = req.params
    await ModelUser.findByIdAndRemove(id)
    res.status(200).json({msg: 'User deleted successfully'})
}

const getUser = async (req, res) => {
    const { id } = req.params
    const data = await ModelUser.findById(id)
    return res.status(200).json(data)
}

module.exports = { 
    registerUser, loginUser, deleteAccount, changeStatus, indexUser,
    readUser, updateUser, removeUser, getUser
}