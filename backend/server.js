const express = require('express');
const app = express();
const mongoose = require('mongoose');

const matchQuiz = require('./models/matchquiz')

mongoose.connect('mongodb+srv://petmatch-admin:techlab2122@cluster0.9nbuq.mongodb.net/petmatch', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

// get all questionnaires from database
app.get('/matchquiz', async(req, res) => {
    const questions = await matchQuiz.find()
//    console.log(questions)
    res.json(questions)  
});

app.listen(3001, () => {
    console.log('it is working!')
});

