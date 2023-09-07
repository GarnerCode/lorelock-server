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

const routes_users = require("./routes/users.routes");

app.use(express.json());
app.use('/users', routes_users);
app.listen(3000);