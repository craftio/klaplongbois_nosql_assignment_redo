const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VoteSchema = require('./vote');

// NOTE: watch for the use of [{}] as arrays of referenced documents and {} for single referenced documents (one-to-many relation).
const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true]
    },
    content: {
        type: String,
        required: [true]
    },
    votings: [VoteSchema],
    comments: [this]
});

module.exports = CommentSchema;