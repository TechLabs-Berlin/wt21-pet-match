// function for connecting to DS model and retrieve cat data from database
module.exports = async function processAnswer(id, chosenAnswer){
    const cats = require('./models/cats');
    const axios = require('axios');
    try {
        // reconstruct input for model
        const userID = id;
        const userAnswer = chosenAnswer;
        const allAnswer = [];
        for (let choices of userAnswer){
            allAnswer.push(choices["chosenAnswer"]);
        };
        // connect to model
        const modelOutput = await axios.post('http://omaistat.pythonanywhere.com/predict', {
            userID: userID,
            allUserAnswer: allAnswer
        });
        // retrieve cat data from database
        const catResult = [];
        for (let cat of modelOutput.data.result){
            catInfo = {};
            catInfo['catOrder'] = cat.catOrder;
            const catData = await cats.findOne({catID: cat.catID}).exec();
            catInfo['catData'] = catData;
            catResult.push(catInfo);
        };
        return catResult;
    } catch (error) {
        return error;
    }
} 