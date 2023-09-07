const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    _id: String,
    _access: Array,
    dateCreated: Date,
    title: String,
    gameDate: Date,
    description: String
});

const Session = mongoose.Model('Session', sessionSchema);