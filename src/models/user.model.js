const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const schemaUser = new Schema(
    {
        fullname: { type: String },

        username: { type: String },

        password: { type: String },

        rol: {
            type: Schema.Types.String,
            ref: 'collectionUserRol'
        }
    },
    {
        timestamps:{createdAt: true, updatedAt: true}
    }
)

schemaUser.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

schemaUser.methods.decryptPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

schemaUser.methods.toJSON = function () {
    const {__v, ...data}=this.toObject();
    return data;
}

module.exports = model('collectionUser', schemaUser)