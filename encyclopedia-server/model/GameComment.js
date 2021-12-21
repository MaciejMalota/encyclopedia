const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User Schema
const GameCommentSchema = new Schema({
  
 
    userId:{ type: Schema.Types.ObjectId, ref: 'users' }, 
    gameId:{ type: Schema.Types.ObjectId, ref: 'games' }, 
    comment_content: {
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
  
    // id_comment: {
    //     type: Schema.Types.ObjectId, ref: 'Comment'
    // }
});

module.exports = GameComment = mongoose.model('GameComment', GameCommentSchema);