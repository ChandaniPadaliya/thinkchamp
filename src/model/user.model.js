const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    qualification: {
        type: String
    },
    collegeORcompany: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    Password: {
        type: String
    },
    token: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
exports.userModel = mongoose.model('users', userSchema)