const { Schema, model } = require('mongoose')

const schemaPost = new Schema(
    {
        title: { type: String },

        descp: { type: String },

        url: { type: String },

        user: {
            type: Schema.Types.String,
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

module.exports = model('collecionPost', schemaPost)
