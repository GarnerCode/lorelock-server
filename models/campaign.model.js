const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    _id: String,
    _userId: String,
    _access: Array,
    dateCreated: Date,
    title: String,
    description: String,
    characters: Array,
    sessions: Array
});

const Campaign = mongoose.Model('Campaign', campaignSchema);