//----------  User Schema --------------------------------------------------
const mongoose = require('mongoose');
const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String},
    memberAccount: Boolean,
    acceptedConsent: Boolean
});

const user = mongoose.model('User', userSchema);
module.exports = user;
//---------- End of User Schema --------------------------------------------------