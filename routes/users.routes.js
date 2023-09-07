const { v4: uuidv4 } = require('uuid');

const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const users = []; // Placeholder for DB

router.get('/', (req, res) => {
    res.json(users);
});

router.post('/register', async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = 
        {
            _id: uuidv4(),
            name: req.body.name, 
            password: hashedPass
        }
        if (users.find(user => user.name === req.body.name)) {
            res.send('Username already exists');
        } else {
            users.push(user);
            res.status(201).send();
        }
    } catch {
        res.status(500).send("Error registering user");
    }
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