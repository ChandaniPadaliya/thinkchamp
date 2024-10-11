const mongoose = require('mongoose');
const instructorSchema = mongoose.Schema({
    firstName: {
        type: String,
        default:""
    },
    lastName: {
        type: String,
        default: ""
    },
    fullName: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default:""
    },
    dateOfBirth: {
        type: String,
        default:""
    },
    email: {
        type: String,
        default:""
    },
    password: {
        type: String,
        default:""
    },
    joiningDate: {
        type: String,
        default:""
    },
    phone: {
        type: String,
        default:""
    },
    designation: {
        type: String,
        default: ""
    },
    qualification: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    dutyTime: {
        type: String,
        default: ""
    },
    totalBatches: {
        type: Number,
        default:0
    },
    roleName: {
        type: String,
        default: ""
    },
    roleId: {
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

exports.instructorModel = mongoose.model('instructor', instructorSchema)