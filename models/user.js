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

// userSchema.methods.hasSamePassword = function(password) {
//     const user = this
//     return bcrypt.compareSync(password, user.password)
// }

userSchema.statics.authValid = async function (email, password) {
    const foundUser = await this.findOne({ email })
    const checkPass = await bcrypt.compare(password, foundUser.password)
    return checkPass ? foundUser : false
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()

    // const user = this
    // const saltRounds = 10
    // bcrypt.genSalt(saltRounds, function (err, salt) {
    //     bcrypt.hash(user.password, salt, function (err, hash) {
    //         this.password = hash
    //         next()
    //     })
    // })
})

module.exports = mongoose.model('User', userSchema)