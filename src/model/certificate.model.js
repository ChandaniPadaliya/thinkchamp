const mongoose = require('mongoose')
const certificateSchema = mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

exports.certificateModel = mongoose.model('certificate', certificateSchema)