const express = require('express');
const User = require('../models/users');
const UserLogin = require('../models/userlogins');
const router = express.Router();

// User login
router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const newUserLogin = new UserLogin({
            userid: req.body.userid, 
            loginTime: new Date(),
            ipAddress: req.body.ipAddress
        });

        await newUserLogin.save();
        res.status(200).json({ message: 'User Login Added' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// User logout
router.post('/logout', async (req, res) => {
    try {        
        const latestUserLogin = await UserLogin.findOneAndUpdate(
            { userid: req.body.userid, logoutTime: null },
            { logoutTime: new Date() },
            { new: true }
        );
        res.status(200).json({ message: 'User Login updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Method - Get all users
router.get('/getuserlogins/:userid', async (req, res) => {
    try {
        const userlogins = await UserLogin.find({ userid: req.params.userid });
        res.json(userlogins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
