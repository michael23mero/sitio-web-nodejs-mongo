const { ModelPost, ModelUser } = require('../models')

const createPost = async (req, res) => {
    const { ...data } = req.body
    const post = new ModelPost(data)
    await post.save()
    return res.status(201).json({post: `Post created successfully`})
}

const readPosts = async (req, res) => {
    const user = await ModelUser.findById(req.userId)
    const data = await ModelPost.find({user: user.username})
    return res.status(200).json(data)

}

module.exports = { createPost, readPosts }