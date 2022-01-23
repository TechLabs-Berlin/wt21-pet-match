const mongoose = require('mongoose');
/// const passportLocalMongoose = require('passport-local-mongoose');

const userSchema  = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    password: String,
    memberAccount: Boolean,
    acceptedConsent: Boolean
});

// userSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

const user = mongoose.model('User', userSchema);
module.exports = user;