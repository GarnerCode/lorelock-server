const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign.model");

router.get('/', async (req, res) => {
    const campaigns = await Campaign.find({});
    res.send(campaigns);
});

router.get('/:userId', async (req, res) => {
    const userCampaigns = await Campaign.find({ _userId: req.params._userId });
    res.send(userCampaigns);
});

