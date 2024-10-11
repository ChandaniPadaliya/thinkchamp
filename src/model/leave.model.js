const mongoose = require('mongoose')
const leaveSchema = mongoose.Schema(
    {
        batchName: {
            type: String
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        studentName: {
            type: String
        },
        studentId: {
            type: String
        },
        description: {
            type: String
        },
        leaveStatus: {
            type: Number,
            enum: [0, 1, 2],
            default: 0
        },
        isDelete: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
)

exports.leaveModel = mongoose.model('leaveManagement', leaveSchema)