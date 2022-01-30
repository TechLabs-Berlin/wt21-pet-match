const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

const matchQuiz = require('./models/matchquiz');
const answer = require('./models/answer');
const user = require('./models/user');
const processAnswer = require('./processAnswer');

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
require("./passportConfig")(passport);


// get all questionnaires from database
app.get('/matchquiz', async(req, res, next) => {
    try{
        const questions = await matchQuiz.find().sort({'questionID': 1});
        res.json(questions); 
    } catch(error){next(error)}; 
});

// non-user --> create dummy account and save answer in Answer collection
app.post("/viewresult", async(req, res, next) => {
    try{
        // create dummy user
        const dummyUser = new user({memberAccount: false});
        await dummyUser.save().then(savedDoc => {dummyid = savedDoc._id;});
        // save answer
        const dummyAnswer = new answer({
            userID: dummyid,
            allChosenAnswer: req.body.allChosenAnswer
        });
        await dummyAnswer.save();
        // reconstruct input for model + model + get cat result
        processAnswer(dummyid, req.body.allChosenAnswer).then(results => {
            //return value
            const userResult = {
                userID: dummyid,
                quizTaken: true,
                Result: results
            };
            res.json(userResult);
        })
    } catch (error) {next(error)};
})

// register new user without quiz
app.post("/registerbeforequiz", (req, res, next) => {
    user.findOne({email: req.body.username}, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exists');
        if (!doc) {
            try{
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
                dummyAllAnswer = [];
                for (let i = 1; i <=15; i++){
                    const ans = {questionID: i, chosenAnswer: null};
                    dummyAllAnswer.push(ans);
                }
                const newAnswer = new answer({
                    userID: newid,
                    allChosenAnswer: dummyAllAnswer 
                });
                await newAnswer.save();
                const returnData = {
                    userID: newid, 
                    quizTaken: false, 
                    firstName: req.body.firstName
                }; 
                res.json(returnData)
            } catch (error){next(error)};
        }
    })
})

// register new user after quiz
app.post("/registerafterquiz", (req, res, next) => {
    user.findOne({email: req.body.username}, async(err, doc) => {
        if (err) throw err;
        if (doc) res.send('User Already Exists');
        if (!doc) {
            try{
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
                // reconstruct input for model + model + get cat result
                processAnswer(newid, req.body.allChosenAnswer).then(results => {
                    //return value
                    const userResult = {
                        userID: newid,
                        quizTaken: true,
                        firstName: req.body.firstName,
                        Result: results
                    };
                    res.json(userResult);
                }); 
            } catch(error) {next(error)};
        }
    })
})

// log-in normally
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, founduser, info) => {
        if (err) throw err;
        if (!founduser) res.send("No User Exists");
        else {
            req.logIn(founduser, (err) => {
                if (err) throw err;
                const findAnswer = async() => {
                    const answ = await answer.findOne({userID: req.user._id});
                    if (answ.allChosenAnswer[0].chosenAnswer === null) return false;
                    else{ return true };
                }
                findAnswer().then(result => {
                    const userInfo = {
                        userID: req.user._id,
                        firstName: req.user.firstName,
                        quizTaken: result
                    };
                    res.json(userInfo);
                });
            });
        }
    })(req, res, next);
});

// log-in after quiz
app.post("/loginafterquiz", (req, res, next) => {
    passport.authenticate("local", (err, founduser, info) => {
        if (err) throw err;
        if (!founduser) res.send("No User Exists");
        else {
            try{
                req.logIn(founduser, (err) => {
                    if (err) throw err;
                    const userID = req.user._id;
                    const newChosenAnswer = req.body.allChosenAnswer;
                    const updateAnswer = async() => {
                        for (let newAns of newChosenAnswer){
                            updatedAnswer = await answer.updateOne(
                                {userID: userID, "allChosenAnswer.questionID": newAns.questionID},
                                {$set: {"allChosenAnswer.$.chosenAnswer": newAns.chosenAnswer}}
                                )
                            }
                        return console.log('Successfully updated');
                        }
                    updateAnswer().then(() => {
                        processAnswer(userID, newChosenAnswer).then(results => {
                            const userResult = {
                                userID: userID,
                                quizTaken: true,
                                firstName: req.user.firstName,
                                Result: results
                            };
                            res.json(userResult);
                        })
                    })
                })
            }catch (error){
                res.send(error);
            }
        }
    })(req, res, next);
});

// 'your matches' for log-in user --> show result based on answer saved in database
// find user & get answers --> send to another route (submit answer to model route)
app.post('/yourmatchesresult', async(req, res, next) => {
    try{
        const userID = req.body.userID;
        const savedAnswer = await answer.findOne({userID: userID}).exec();
        // reconstruct input for model + model + get cat result
        processAnswer(userID, savedAnswer.allChosenAnswer).then(results => {
            //return value
            const userResult = {
                userID: userID,
                quizTaken: true,
                Result: results
            };
            res.json(userResult);
        })
    } catch (error){next(error)};   
})

// 'retake quiz' for log-in user ---> user retakes a quiz and we update answer in database
// update answer ---> send to another route (submit answer to model route)
app.patch('/retakequiz', async(req, res, next) => {
    try{
        const userID = req.body.userID;
        const newChosenAnswer = req.body.allChosenAnswer;
        for (let newAns of newChosenAnswer){
            updateAnswer = await answer.updateOne(
                {userID: userID, "allChosenAnswer.questionID": newAns.questionID},
                {$set: {"allChosenAnswer.$.chosenAnswer": newAns.chosenAnswer}}
            )
        }
        // reconstruct input for model + model + get cat result
        processAnswer(userID, newChosenAnswer).then(results => {
            //return value
            const userResult = {
                userID: userID,
                quizTaken: true,
                Result: results
            };
            res.json(userResult);
        })
    } catch (error){next(error)}
})

// log-out
app.delete('/logout', (req, res) => {
    req.logOut();
    res.send('User log-out successfully')
})


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something went wrong!');
}) 


app.listen(3001, () => {
    console.log('it is working!')
})