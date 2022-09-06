const { ModelUser } = require('../models')

const registerUser = async (req, res) => {
    const { ...data } = req.body
    const existe = await ModelUser.findOne({ username: data.username})
    if(existe){
        return res.json({msg: `El usuario: ${data.username} ya se encuentra registrado`})
    }
    const user = new ModelUser(data)
    await user.save()
    return res.status(200).json({msg: `User created successfully`})
}

const loginUser = async (req, res) => {
    const { username, password } = req.body
    const existe = await ModelUser.findOne({ username: username })
    if(!existe){
        return res.status(404).json({ msg: 'User not found' })
    }else{
        return res.status(200).json({ msg: 'Welcome' })
    }
}

module.exports = { registerUser, loginUser }