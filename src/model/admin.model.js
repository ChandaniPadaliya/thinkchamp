const mongoose = require('mongoose')
const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            default: ""
        },
        gender: {
            type: String,
            default: ""
        },
        dateOfBirth: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            default: ""
        },
        roleName: {
            type: String,
            default: ""
        },
        roleId: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            default: ""
        },
        token: {
            type: String,
            default: ""
        },        
        isLogin: {
            type: Boolean,
            default: false
        },
        isDelete: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isVerify: {
            type: Boolean,
            default: false
        },
        otp: {
            type: Number
        }
    },
    { timestamps: true }
)

exports.adminModel = mongoose.model('admin', adminSchema)