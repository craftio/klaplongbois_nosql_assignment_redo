const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: String,
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;