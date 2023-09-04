const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    id: String,
    dateCreated: Date,
    title: String,
    gameDate: Date,
    description: String
});

const Session = mongoose.Model('Session', sessionSchema);