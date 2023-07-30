const express = require('express');
const User = require('../models/users');
const UserLogin = require('../models/userlogins');
const router = express.Router();

// User login
router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        var user = await User.findOne({ email: req.body.loginemail });        
        if (!user) 
        {
            console.log('user not exists');
            user = new User({
                name: req.body.name,
                email: req.body.loginemail
            });    
            user = await user.save();   
            console.log('user created');         
        }
        const newUserLogin = new UserLogin({
            userid: user.userid, 
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
    try 
    {      
        
        console.log(req.body);
        const user = await User.findOne({ email: req.body.loginemail });        
        if (!user) {
            return res.status(404).json({ message: "Email not exists" });
        }
        else
        {  
            const latestUserLogin = await UserLogin.findOneAndUpdate(
            { userid: user.userid, logoutTime: null },
            { logoutTime: new Date() },
            { new: true });
            res.status(200).json({ message: 'User Login updated' });
        }                
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

// User logout
router.post('/check-login', async (req, res) => {
    try {        
        const user = await User.findOne({ email: req.body.loginemail });        
        if (user) 
        {
            const loggedInUser = await findLoggedInUser(user.userid);
            if (loggedInUser) 
            {
                console.log('User is already logged in.');    
                res.status(207).json({ message: 'User is already logged in.' });            
            }
            else 
            {
                console.log('User is not currently logged in.');                
                res.status(200).json({ message: 'User is not currently logged in.' });
            }            
        }
        else
        {
            return res.status(204).json({ message: "Email not exists" });
        }        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Function to find user login details for a specific user where logout time is not available
const findLoggedInUser = async (userid) => {
    try {
      const loggedInUser = await UserLogin.findOne({ userid, logoutTime: { $exists: false } });
      return loggedInUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
module.exports = router;
