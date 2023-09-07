const { v4: uuidv4 } = require('uuid');

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.model");

router.get('/', async (req, res) => {
    // res.json(users);
    const users = await User.find({});
    console.log('Users: ', users);
});

router.post('/register', async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        _id: uuidv4(),
        _dateCreated: Date(),
        name: req.body.name,
        email: 'tyler@garnercode.io',
        password: hashedPass
    });
    newUser
    .save()
    .then(
        () => console.log('User saved'),
        (err) => console.err(err)
    );
    res.status(201).send();
});

router.post('/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if (!user) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Logging in...');
        } else {
            res.send('Incorrect username or password');
        }
    } catch {
        res.status(500).send();
    }
});

module.exports = router;