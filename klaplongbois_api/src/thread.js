const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: String,
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

const Thread = mongoose.model('thread', ThreadSchema);

module.exports = Thread;