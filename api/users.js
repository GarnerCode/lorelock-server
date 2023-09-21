const { v4: uuidv4 } = require('uuid');

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.model");

router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send(users);
});

router.post('/register', async (req, res) => {
    const users = await User.find({});
    const existingName = users.find((user) => user.name.toLocaleLowerCase() == req.body.name.toLocaleLowerCase());
    if (existingName) {
        console.log('Sorry, this username is taken.');
        return;
    } else {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            _id: uuidv4(),
            _dateCreated: Date(),
            name: req.body.name,
            password: hashedPass
        });
        newUser
        .save()
        .then(
            () => console.log('User registered!'),
            (err) => console.err(err)
        );
        res.status(201).send();
        return;
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.json({ msg: "Incorrect Username or Password", status: false });
        }
        return res.json({ status: true, user });
    } catch(err) {
        return res.status(500).send(err);
    }
});

module.exports = router;