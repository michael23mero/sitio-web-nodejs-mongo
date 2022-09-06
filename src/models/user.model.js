const { Schema, model } = require('mongoose')

const schemaUser = new Schema(
    {
        fullname: { type: String },

        username: { type: String },

        password: { type: String },
    },
    {
        timestamps:{createdAt: true, updatedAt: true}
    }
)

schemaUser.methods.toJSON = function () {
    const {__v, ...data}=this.toObject();
    return data;
}

module.exports = model('collectionUser', schemaUser)