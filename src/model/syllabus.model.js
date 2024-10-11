const mongoose = require('mongoose')
const syllabusSchema = mongoose.Schema({
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
    content: {
        type: String
    },
    topics: {
        type: [{ title: { type: String }, description: { type: String }, video: { type: String } }]
    },
    categoryName: {
        type: String
    },
    categoryId: {
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

exports.syllabusModel = mongoose.model('syllabus', syllabusSchema)