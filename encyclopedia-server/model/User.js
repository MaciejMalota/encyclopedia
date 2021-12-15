const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User Schema
const UserSchema = new Schema({
  
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false 
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type: Number,
        min: 1,
        max: 3,
        default: 1
    },
    age: {
        type: Number,
        min: 3,
        max: 100,
        required: true
    },
    banned: {
        type: Boolean,
        default:false,
        required: true
    },
    deleted: {
        type: Boolean,
        default:false,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);