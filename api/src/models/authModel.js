const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Login = mongoose.model('users', AuthSchema)

module.exports = Login