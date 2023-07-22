// model/userlogins.js
const mongoose = require('mongoose');

const userLoginSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    loginTime: {
        type: Date, 
        required: false
    },
    logoutTime: {
        type: Date, 
        required: false
    },
    ipAddress: {
        type: String,
        required: true
    },
});

const UserLogin = mongoose.model('UserLogin', userLoginSchema);

module.exports = UserLogin;