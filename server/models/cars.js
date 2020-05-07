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
    },
    bookings: [{
        customerName: {
            type: String,
            required: true,
            trim: true
        },
        customerPhNo: {
            type: Number,
            required: true,
            trim: true
        },
        issueDate: {
            type: Date,
            min: () => Date.now()
        },
        returnDate: {
            type: Date,
            min: () => Date.now() + 2*24*60*60*1000
        }
    }]
})

module.exports = { Car }