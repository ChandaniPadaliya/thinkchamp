const mongoose = require('mongoose')
const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        default: ""
    },
    thumbnail: {
        type: String,
        default: ""
    },
    batchesCount: {
        type: Number,
        default: 0
    },
    studentCount: {
        type: Number,
        default: 0
    },
    instructorCount: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        type: String
    },
    mode: {
        type: String,
        default: "telugu"
    },
    batchStartDate: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
)
exports.courseModel = mongoose.model('course', courseSchema)
