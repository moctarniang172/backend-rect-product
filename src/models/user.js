const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: String,
    email: {
        type: String,
        unique: true
    },
    images: {
        type: String,
        default: null
    },
    password: String,
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    },
    resetCode: {
        type: String,
        default: null
    },
    resetCodeExpire: {
        type: Date,
        default: null
    },
    resetAttempts: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('user', userSchema);