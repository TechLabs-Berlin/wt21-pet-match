const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    questionID: Number,
    questionText: String,
    questionType: Number,
    answer: [{answerText: String, answerValue: Number}] 
});

const matchQuiz = mongoose.model('Quiz', quizSchema);
module.exports = matchQuiz;