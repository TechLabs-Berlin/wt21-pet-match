const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
    //userAnswerID: mongoose.Schema.Types.ObjectId,
    userID: {
        type: Number,
        // ref: 'user'
    },
    allChosenAnswer: {
        type: [{questionID: Number, chosenAnswer: Number}],
        required: true
    } 
});

const answer = mongoose.model('Answer', answerSchema);
module.exports = answer;