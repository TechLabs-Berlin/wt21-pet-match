const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    allChosenAnswer: {
        type: [{questionID: Number, chosenAnswer: Number}],
        required: true,
        _id: false
    } 
});

const answer = mongoose.model('Answer', answerSchema);
module.exports = answer;