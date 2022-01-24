const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    password: String,
    firstName: String,
    lastName: String,
    memberAccount:{
        type: Boolean,
        required: true
    },
    acceptedConsent: Boolean
});

const user = mongoose.model('User', userSchema);
module.exports = user;