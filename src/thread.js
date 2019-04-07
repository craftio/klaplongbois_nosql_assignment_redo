const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = require('./comment');
const VotingSchema = require('./vote');

const ThreadSchema = new Schema({
    title: {
        type: String,
        unique: [true],
        required: [true]
    },
    content: {
        type: String,
        required: [true]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    votings: [VotingSchema],
    comments: [CommentSchema]
});

const Thread = mongoose.model('thread', ThreadSchema);
module.exports = Thread;