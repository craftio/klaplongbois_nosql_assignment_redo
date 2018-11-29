const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    threads: [{
        type: Schema.Types.ObjectId,
        ref: 'thread'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const autoPopulateChildren = function(next) {
    this.populate('comment');
    next();
};

UserSchema.pre('findOne', autoPopulateChildren);
UserSchema.pre('find', autoPopulateChildren);

const User = mongoose.model('user', UserSchema);

module.exports = User;