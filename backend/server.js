const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');

const matchQuiz = require('./models/matchquiz');
const userAnswer = require('./models/answer');
const user = require('./models/user');

mongoose.connect('mongodb+srv://petmatch-admin:techlab2122@cluster0.9nbuq.mongodb.net/petmatch', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// get all questionnaires from database
app.get('/matchquiz', async(req, res) => {
    const questions = await matchQuiz.find().sort({'questionID': 1});
    res.json(questions);  
});

// show old result for log-in user
app.get('/showsavedresult', async(req, res) => {
    const userID = req.body.userID;
    const savedAnswer = await userAnswer.find({userID: userID});
    res.json(savedAnswer); 
})

// test answer collection
app.post('/submitanswer', async (req, res) => {
    // const userID = req.body.userID;
    // const userAnswer = req.body.chosenAnswer;
    // const allAnswer = [];
    // for (let choices of userAnswer){
    //     allAnswer.push(choices["a"]);
    // };
        
    res = await axios.post('http://omaistat.pythonanywhere.com/predict', [{"1": 1, "2": 2, "3": 4, "4": 3, "5": 2, "6": 5, "7": 4, "8": 3, "9": 4, "10": 5, "11": 3, "12": 4, "13": 5, "14": 2, "15": 3, "16": 4, "17": 5, "18": 4, "19": 3}]
        // userID: userID,
        // allChosenAnswer: allAnswer
    );

    //console.log(userID);
    res.json(res);
})

// get cat result
app.get('/result', (req, res) => {
    //get result from above route to query database to get all cat info
})

app.listen(3001, () => {
    console.log('it is working!')
});

