const { ModelUserRole } = require('../models')

const createUserRole = async (req, res) => {
    const { ...data } = req.body
    const rol = new ModelUserRole(data)
    await rol.save()
    return res.status(201).json({rol: `Role of user created successfully`})
}

const readUserRole = async (req, res) => {
    const data = await ModelUserRole.find({})
    return res.status(200).json(data)
}

module.exports = { createUserRole, readUserRole }