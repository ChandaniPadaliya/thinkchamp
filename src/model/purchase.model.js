const mongoose = require('mongoose')
const PurchaseSchema = mongoose.Schema({
    date: {
        type: String
    },
    courseName: {
        type: String,
    },
    courseId: {
        type: String,
    },
    duration: {
        type: Number,
    },
    price: {
        type: Number,
    },
    userId: {
        type: String,
    },
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
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

exports.purchaseModel = mongoose.model('coursePurchase', PurchaseSchema)