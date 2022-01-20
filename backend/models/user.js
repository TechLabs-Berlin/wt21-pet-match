const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    userID: Number,
    email: {
        type: String,
        unique: true
    },
    password: String,
    memberAccount: Boolean,
});

const user = mongoose.model('User', userSchema);
module.exports = user;