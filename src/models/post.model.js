const { Schema, model } = require('mongoose')
const date = require('date-and-time')

const now = new Date()

const schemaPost = new Schema(
    {
        title: { type: String },

        descp: { type: String },

        url: { type: String },

        date: {
            type: String,
            default: date.format(now, 'YYYY/MM/DD HH:mm:ss')
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'collectionUser'
        }
    },
    {
        timestamps:{createdAt: true, updatedAt: true}
    }
)

schemaPost.methods.toJSON = function () {
    const {__v, ...data}=this.toObject();
    return data;
}

module.exports = model('collectionPost', schemaPost)
