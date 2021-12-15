const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User Schema
const GameSchema = new Schema({
  
    title: {
        type: String,
        unique: true,
        required: true
    }, 
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],

    platforms: [{ type: Schema.Types.ObjectId, ref: 'Platform' }],
    users:[{ type: Schema.Types.ObjectId, ref: 'users' }], 

    img: {
        type: String,
        unique: true,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
        // required: true
    },
    updated_at: {
        type: Date,
        default: Date.now
        // required: true
    },
    release_date: {
        type: String,
        default: "1996-11-28",
         required: true
    },
    vote_up: {
        type: Boolean,
        default:0,
        required: true
    },
    vote_down: {
        type: Number,
        default:0,
        required: true
    },
    rating: {
        type: Number ,
        default:0,
        // users_voted:[], 

        required: true
    },
   
    producer: {
        type: String,
        required: true
    },
    age_restriction: {
        type: Number,
        values: [3, 7,12, 16, 18],
        message: '{VALUE} there is no such age restriction',
        required: true
    }
    // id_comment: {
    //     type: Schema.Types.ObjectId, ref: 'Comment'
    // }
});

module.exports = Game = mongoose.model('games', GameSchema);