const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    voting: {
        type: Boolean,
        required: [true]
    }
});

module.exports = VoteSchema;