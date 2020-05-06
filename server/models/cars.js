const mongoose = require ('mongoose')

var Car = mongoose.model('Car', {
    regNo: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    make: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    seatingCapacity: {
        type: Number,
        required: true,
        trim: true
    },
    rentPerDay: {
        type: Number,
        required: true,
        trim: true
    }
})

module.exports = { Car }