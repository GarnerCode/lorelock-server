const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    id: String,
    dateCreated: Date,
    title: String,
    description: String,
    characters: Array,
    sessions: Array
});

const Campaign = mongoose.Model('Campaign', campaignSchema);