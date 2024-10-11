const mongoose = require('mongoose')
const quizSchema = mongoose.Schema({
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
    questions: {
        type: [{
            que: { type: String },
            option1: { type: String },
            option2: { type: String },
            option3: { type: String },
            option4: { type: String },
            correctAns: { type: String }
        }]
    },
    isMinusMarking: {
        type: Boolean,
        default: false
    },
    minusMark: {
        type: Number
    },
    marksForEachQue: {
        type: Number
    },
    totalMarks: {
        type: Number
    },
    batchName: {
        type: String,
    },
    totalTime: {
        type: String,
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

exports.quizModel = mongoose.model('quiz', quizSchema)