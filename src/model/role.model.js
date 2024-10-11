const mongoose = require('mongoose')
const roleSchema = mongoose.Schema({
    roleName: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
exports.roleModel = mongoose.model('roles', roleSchema)