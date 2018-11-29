const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// NOTE: watch for the use of [{}] as arrays of referenced documents and {} for single referenced documents (one-to-many relation).
const CommentSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    onThread: {
        type: Schema.Types.ObjectId,
        ref: 'thread'
    },
    content: String,
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: {
        type: this,
        ref: 'comment'
    }
});

CommentSchema.pre('remove', function(next) {
    const Replies = mongoose.model('comment');
    Replies.remove({ _id: { $in: this.comments } })
        .then(() => Comment.remove({ _id: this._id }));
    next();
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;