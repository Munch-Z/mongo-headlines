const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String
    }
})

const Comments = mongoose.model('comments', CommentSchema);

module.exports = Comments;