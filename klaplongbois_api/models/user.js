const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
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