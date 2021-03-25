const mongoose = require('mongoose')

const savedSchema = new mongoose.Schema({
    movies: {
        type: Array,
        required: true
    },
    shorts: {
        type: Array,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Saved', savedSchema)