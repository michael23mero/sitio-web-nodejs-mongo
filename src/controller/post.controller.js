const { ModelPost, ModelUser } = require('../models')

const createPost = async (req, res) => {
    const { ...data } = req.body
    const post = new ModelPost(data)
    await post.save()
    return res.status(201).json({post: `Post created successfully`})
}

const readPosts = async (req, res) => {
    const user = await ModelUser.findById(req.userId)
    const data = await ModelPost.find({user: user._id})
    return res.status(200).json(data)
}

const updatePost = async (req, res) => {
    const { id } = req.params
    const { ...data } = req.body
    await ModelPost.findByIdAndUpdate(id, data, {new: true})
    return res.status(201).json({msg: 'Post updated successfully'})
}

const removePost = async (req, res) => {
    const { id } = req.params
    await ModelPost.findByIdAndRemove(id)
    return res.status(200).json({msg: 'Post deleted successfully'}) // or status 204
}

const getPost = async (req, res) => {
    const { id } = req.params
    const data = await ModelPost.findById(id)
    return res.status(200).json(data)
}

const getAllPost = async (req, res) => {
    const data = await ModelPost.find({ user: {$nin: [req.userId]} }).populate('user')
    return res.status(200).json(data)
}

module.exports = { 
    createPost, readPosts, updatePost, removePost, getPost,
    getAllPost
}