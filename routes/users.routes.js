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
        const user = { name: req.body.name, password: hashedPass }
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send("Error registering user");
    }
});

module.exports = router;