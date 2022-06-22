const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    username: {
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

userSchema.methods.hasSamePassword = function(inputPassword) {
    const user = this
    return bcrypt.compareSync(inputpassword, user.password)
}

userSchema.pre('save', function(next) {
    const user = this
    const saltRounds = 10

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', userSchema)