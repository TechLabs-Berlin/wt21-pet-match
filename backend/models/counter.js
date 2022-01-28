const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
});

const counter = mongoose.model('Counter', counterSchema);
module.exports = counter;