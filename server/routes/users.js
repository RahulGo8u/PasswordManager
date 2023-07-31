// routes/users.js
const express = require('express');
const User = require('../models/users');
const router = express.Router();

// Post Method - Create a new user
router.post('/add', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Method - Get all users
router.get('/getall', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get by ID Method - Get a user by ID
router.get('/gettest/', async (req, res) => {
    try {      
        res.json('testdata');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get by ID Method - Get a user by ID
router.get('/get/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update by ID Method - Update a user by ID
router.patch('/update/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ userid: req.params.id }, req.body, { new: true });
        res.send(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete user by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const userid = req.params.id;

        // Find the user by userid
        const user = await User.findOne({ userid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await user.deleteOne(); // or use remove() instead of deleteOne()

        res.send(`User with ID ${userid} has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;
