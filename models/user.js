const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: 10,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updateAt: {
        type: Date,
        default: () => Date.now(),
    }
})