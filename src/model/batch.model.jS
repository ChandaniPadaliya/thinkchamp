const { studentModel } = require("./student.model")
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
        student: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:studentModel,
        }],
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