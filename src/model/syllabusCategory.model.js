const mongoose = require('mongoose');
const syllabusCategorySchema = mongoose.Schema({
    syllabusCategoryName: {
        type: String,
    },
    email: {
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
}, {
    timestamps: true,
})
exports.syllabusCategoryModel = mongoose.model('syllabusCategory', syllabusCategorySchema);