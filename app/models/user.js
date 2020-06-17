// CALL packages
const mongoose = require('mongoose');

// INITIALIZE objects
const Schema = mongoose.Schema

// DEFINE schema
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min:8,
        max: 1024,
    },
})

// EXPORT model
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
