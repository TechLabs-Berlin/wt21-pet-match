const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    catID: {
        type: Number,
        unique: true
    },
    catName: String,
    img: String,
    alttext: String,
    tags: [String],
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    age: Number,
    breed: String,
    goodwith: String, // oder [String]
    neutered: Boolean,
    healthIssue: Boolean,
    shelterName: String

});

const cats = mongoose.model('Cats', catSchema);
module.exports = cats;