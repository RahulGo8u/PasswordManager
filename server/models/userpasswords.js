// model/userpasswords.js
const mongoose = require('mongoose');

const userPasswordSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    userPasswordId: {
        type: String,
        unique: true,
        default: function () {
            return 'UP' + Math.random().toString(36).substr(2, 9);
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    addedon: {
        type: Date,
        required: false
    },
    updatedon: {
        type: Date,
        required: false
    }
});

const UserPassword = mongoose.model('UserPassword', userPasswordSchema);

module.exports = UserPassword;
