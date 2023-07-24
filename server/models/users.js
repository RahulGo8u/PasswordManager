const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
        default: function () {
            return 'U' + Math.random().toString(36).substr(2, 9);
        }
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
