const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const axios = require('axios');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const matchQuiz = require('./models/matchquiz');
const answer = require('./models/answer');
const user = require('./models/user');
const cats = require('./models/cats');

mongoose.connect('mongodb+srv://petmatch-admin:techlab2122@cluster0.9nbuq.mongodb.net/petmatch', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
      origin: "http://localhost:3000", 
      credentials: true,
      optionsSuccessStatus: 200
    })
);
app.use(session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);


// get all questionnaires from database
app.get('/matchquiz', async(req, res) => {
    const questions = await matchQuiz.find().sort({'questionID': 1});
    res.json(questions);  
});

// non-user --> create dummy account and save answer in Answer collection
app.post("/viewresult", async(req, res) => {
    // create dummy user
    const dummyUser = new user({
        memberAccount: false,
    });
    await dummyUser.save().then(savedDoc => {
        dummyid = savedDoc._id;
    });
    // save answer
    const dummyAnswer = new answer({
        userID: dummyid,
        allChosenAnswer: req.body.allChosenAnswer
    });
    await dummyAnswer.save();
    // reconstruct input for model
    const userID = dummyid;
    const userAnswer = req.body.allChosenAnswer;
    const allAnswer = [];
    for (let choices of userAnswer){
        allAnswer.push(choices["chosenAnswer"]);
    };
    // connect to model
    try {
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
        const userResult = {
            userID: modelOutput.data.userID,
            quizTaken: true,
            Result: catResult
        };
        res.json(userResult);
    } catch (error) {
        res.send(error);
    }
})

// register new user
app.post("/register", async (req, res) => {
    user.findOne({email: req.body.email}, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exists');
        if (!doc) {
            // create new user
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new user({
                email: req.body.username,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                memberAccount: true,
                acceptedConsent: req.body.acceptedConsent,
            });
            await newUser.save().then(savedDoc => {
                newid = savedDoc._id;
            });
            // save answer in answer collection
            const newAnswer = new answer({
                userID: newid,
                allChosenAnswer: req.body.allChosenAnswer
            });
            await newAnswer.save();
            // reconstruct model input
            const userID = newid;
            const userAnswer = req.body.allChosenAnswer;
            const allAnswer = [];
            for (let choices of userAnswer){
                allAnswer.push(choices["chosenAnswer"]);
            };
            // connect to model
            try {
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
                const userResult = {
                    userID: modelOutput.data.userID,
                    quizTaken: true,
                    firstName: req.body.firstName,
                    Result: catResult
                };
                res.json(userResult);

            } catch (error) {
                res.send(error);
            }
        }
    })
})

// log-in


// 'your matches' for log-in user --> show result based on answer saved in database
// find user & get answers --> send to another route (submit answer to model route)
app.post('/yourmatchesresult', async(req, res) => {
    const userID = req.body.userID;
    const savedAnswer = await answer.findOne({userID: userID}).exec();
    // reconstruct model input
    const userAnswer = savedAnswer.allChosenAnswer;
    const allAnswer = [];
    for (let choices of userAnswer){
        allAnswer.push(choices["chosenAnswer"]);
    };
    // connect to model
    try {
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
        const userResult = {
            userID: modelOutput.data.userID,
            quizTaken: true,
            Result: catResult
        };
        res.json(userResult);

    } catch (error) {
        res.send(error);
    }
})

// 'retake quiz' for log-in user ---> user retakes a quiz and we update answer in database
// update answer ---> send to another route (submit answer to model route)
app.patch('/retakequiz', async(req, res) => {
    const userID = req.body.userID;
    const newChosenAnswer = req.body.allChosenAnswer;
    for (let newAns of newChosenAnswer){
        updateAnswer = await answer.updateOne(
            {userID: userID, "allChosenAnswer.questionID": newAns.questionID},
            {$set: {"allChosenAnswer.$.chosenAnswer": newAns.chosenAnswer}}
        )
    }
    // reconstruct model input
    const allAnswer = [];
    for (let choices of newChosenAnswer){
        allAnswer.push(choices["chosenAnswer"]);
    };
    // connect to model
    try {
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
        const userResult = {
            userID: modelOutput.data.userID,
            quizTaken: true,
            Result: catResult
        };
        res.json(userResult);

    } catch (error) {
        res.send(error);
    }
})

// connected to model and retrieve cat info from database --> send data to FE
// wanna make it into function later
app.post('/showresult', async (req, res) => {
    // reconstruct model input
    const userID = req.body.userID;
    const userAnswer = req.body.allChosenAnswer;
    const allAnswer = [];
    for (let choices of userAnswer){
        allAnswer.push(choices["chosenAnswer"]);
    };
    // connect to model
    try {
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
        const userResult = {
            userID: modelOutput.data.userID,
            quizTaken: true,
            Result: catResult
        };
        res.json(userResult);

    } catch (error) {
        res.send(error);
    }
})

// log-out
app.get('/logout', (req, res) => {
    req.logOut();
    res.send('User log-out successfully')
})
   

app.listen(3001, () => {
    console.log('it is working!')
})