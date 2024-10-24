const mongoose = require('mongoose')
const batchSchema = mongoose.Schema(
    {
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        batchName: {
            type: String,
        },
        batchTime: {
            type: String,
        },
        instructorName: {
            type: String,
        },
        instructorId: {
            type: String,
        },
        courseName: {
            type: String,
        },
        courseId: {
            type: String,
        },
        duration: {
            type: Number
        },
        student: {
            type: [{
                name: { type: String },
                studentId: { type: String },
                phone: { type: String }
            }]
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

exports.batchModel = mongoose.model('batch', batchSchema)