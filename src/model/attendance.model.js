const mongoose = require('mongoose')
const attendanceSchema = mongoose.Schema({
    batchName: {
        type: String
    },
    student: {
        type: [{
            name: { type: String },
            id: { type: String },
            attendance: { type: String },
        }]
    },
    instructorName: {
        type: String
    },
    instructorId: {
        type: String
    },
    date: {
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
exports.attendanceModel = mongoose.model('attendance', attendanceSchema)