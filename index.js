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
).then(() => console.log('Connected to MongoDB'));

const api_users = require("./api/users");

app.use(express.json());
app.use('/users', api_users);
app.listen(process.env.PORT || 3000);