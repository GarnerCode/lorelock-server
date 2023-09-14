const { v4: uuidv4 } = require('uuid');

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.model");

router.get('/', async (req, res) => {
    const users = await User.find({});
    res.send(users);
    res.status(200).send();
});

router.post('/register', async (req, res) => {
    const users = await User.find({});
    const existingEmail = users.find((user) => user.email == req.body.email);
    const existingName = users.find((user) => user.name == req.body.name);
    if (existingEmail) {
        console.log('An account with this email already exists.');
        return;
    } else if (existingName) {
        console.log('This username is taken.');
        return;
    } else {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            _id: uuidv4(),
            _dateCreated: Date(),
            name: req.body.name,
            email: req.body.email,
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
    console.log('Received request, attempting login...');
    const users = await User.find({});
    let user = null;
    if (users) {
        user = users.find((user) => user.email == req.body.email);
    }
    if (!user) {
        res.status(400).send('Cannot find user');
        return;
    } else {
        try {
            if(await bcrypt.compare(req.body.password, user.password)) {
                res.send('Logging in...');
                return;
            } else {
                res.send('Incorrect email or password');
                return;
            }
        } catch {
            res.status(500).send();
            return;
        }
    }
});

module.exports = router;