const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    catID: {
        type: Number,
        unique: true,
    },
    catName: String,
    img: String,
    alttext: String,
    tags: [String],
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    age: Number,
    breed: String,
    neutered: Boolean,
    healthIssue: Boolean,
    goodwith: String,
    likesCats: Boolean,
    shelterName: String

});

const cats = mongoose.model('Cats', catSchema);
module.exports = cats;