const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [ this ]
});

CommentSchema.pre('remove', function(next) {
    const Replies = mongoose.model('comment');
    Replies.remove({ _id: { $in: this.comments } })
        .then(() => next());
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;