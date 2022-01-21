const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    questionID: {
        type: Number,
        required: true,
        unique: true
    },
    questionText: {
        type: String,
        required: true
    },
    questionType: Number, // type of answer (1=number input, 2 = radio button)
    answer: {
        type: [{answerText: String, answerValue: Number}],
        required: true,
        _id: false
    } 
});

const matchQuiz = mongoose.model('Quiz', quizSchema);
module.exports = matchQuiz;