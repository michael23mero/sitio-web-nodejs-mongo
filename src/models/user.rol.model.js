const { Schema, model } = require('mongoose')

const schemaUserRol = new Schema(
    {
        rol: { type: String }
    },
    {
        timestamps: { createdAt: true, updatedAt: true }
    }
)

schemaUserRol.methods.toJSON = function () {
    const {__v, ...data}=this.toObject();
    return data;
}

module.exports = model('collectionUserRol', schemaUserRol)