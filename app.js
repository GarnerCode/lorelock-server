require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(3000, () => console.log('Server running...'));