// const { Date } = require('core-js/library/web/timers');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User Schema
const GenreSchema = new Schema({
  
    name: {
        type: String,
        unique: true,
        required: true
    }, 
  
});

module.exports = Genre = mongoose.model('Genre', GenreSchema);