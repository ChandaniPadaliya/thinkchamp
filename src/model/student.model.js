const mongoose = require('mongoose')
const {courseModel} = require("../model/course.model")
const studentSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    fullName: {
        type: String,
        default: ""
    },
    age: {
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
    admissionDate: {
        type: String,
        default: ""
    },
    enrollmentNo: {
        type: String,
        default: ""
    },
    fatherName: {
        type: String,
        default: ""
    },
    qualification: {
        type: String
    },
    collegeORcompany: {
        type: String
    },
    email: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    courseName: {
        type: String,
        default: ""
    },
    courseId:[ {
             type: mongoose.Schema.Types.ObjectId,
             ref: courseModel
    }],
    batchTime: {
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
    instructorName: {
        type: String,
        default: ""
    },
    instructorId: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    image: {
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
    userId: {
        type: String,
        default: ""
    },
    interviewLink: {
        type: String,
        default: ""
    },
    interviewDate: {
        type: String,
        default: "",
    },
    interviewStarTime: {
        type: String,
        default: "",
    },
    interviewEndTime: {
        type: String,
        default: "",
    },
    notification: {
        type: String,
        default: ""
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
}, { timestamps: true })

const studentModel = mongoose.model('Student', studentSchema)
exports.studentModel = studentModel;