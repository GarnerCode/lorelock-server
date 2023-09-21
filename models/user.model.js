const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String,
    _dateCreated: Date,
    _sessionId: String,
    name: String,
    password: String
});

module.exports = mongoose.model('User', userSchema);