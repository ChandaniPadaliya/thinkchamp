const mongoose = require('mongoose');
const enrollmentSchema = mongoose.Schema(
    {
        enrollmentNo: {
            type: String
        },
        studentName: {
            type: String
        },
        studentId: {
            type: String
        }
    },
    { timestamps: true }
)
exports.enrollmentModel = mongoose.model('enrollments', enrollmentSchema)