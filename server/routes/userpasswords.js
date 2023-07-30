const express = require('express');
const UserPassword = require('../models/userpasswords');
const User = require('../models/users');
const router = express.Router();
// Add user password
router.post('/add', async (req, res) => {
    try 
    {
        var user = await User.findOne({ email: req.body.loginemail });        
        if (!user) 
        {
            res.status(500).json({ message: 'User not exists' });
        }
        else
        {
            const newUserPassword = new UserPassword({
                userid: user.userid,           
                email: req.body.email,
                password: req.body.password,
                url: req.body.url,
                addedon: new Date() // Set the addedon field to the current date and time
            });
            await newUserPassword.save();
            res.status(200).json({ message: 'User Password Added' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all user passwords by userid
router.get('/getall/:loginemail', async (req, res) => {
    try 
    {
        var user = await User.findOne({ email: req.params.loginemail });        
        if (!user) 
        {
            res.status(500).json({ message: 'User not exists' });
        }
        else{
            const userPasswords = await UserPassword.find({ userid: user.userid });
            res.json(userPasswords);
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user password by userPasswordId
router.get('/get/:userpasswordid', async (req, res) => {
    try {
        const userPassword = await UserPassword.findOne({ userPasswordId: req.params.userpasswordid });
        res.json(userPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user password by userPasswordId
router.patch('/update', async (req, res) => {
    try {
        const userpasswordid = req.body.userpasswordid;
        const newPassword = req.body.password;

        // Find the user password by userpasswordid
        const userPassword = await UserPassword.findOne({ userPasswordId: userpasswordid });

        if (!userPassword) {
            return res.status(404).json({ message: "User password not found" });
        }

        // Update the password field with the new password
        userPassword.password = newPassword;

        // Update the updatedon field with the current date and time
        userPassword.updatedon = new Date();

        // Save the document with the updated password
        const updatedUserPassword = await userPassword.save();

        res.json(updatedUserPassword);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete user password by userPasswordId
router.delete('/delete/:userpasswordid', async (req, res) => {
    try {
        const userpasswordid = req.params.userpasswordid;

        // Find the user password by userpasswordid
        const userPassword = await UserPassword.findOne({ userPasswordId: userpasswordid });

        if (!userPassword) {
            return res.status(404).json({ message: "User password not found" });
        }

        // Delete the user password
        await userPassword.deleteOne(); // or use remove() instead of deleteOne()

        res.send(`User Password with userPasswordId ${userpasswordid} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



// Get all users and their passwords
router.get('/getall', async (req, res) => {
    try {
        const usersPasswords = await UserPassword.find();
        res.json(usersPasswords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
