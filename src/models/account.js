const mongoose = require('mongoose');
const { string } = require('joi');
const { Schema } = mongoose;
const crypto = requrie('crypto');
const { generateToken } = require('lib/token');
const { throws } = require('assert');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: { type: String },
        thumbnail: { type: String, defailt: '/static/image/default_thumnail.png' }
    },
    email: { type: String },
    social: {
        facebook: {
            id: String,
            accessToken: String
        },
        google: {
            id: String,
            accessToken: String
        }
    },
    password: String,
    createAt: { type: date, default: Date.now }
});

Account.statics findByEmail = function (email) {
    return this.findOne({ email }).exec();
}
Account.statics.localRegister = function ({ username, email, password }) {
    const account = new this({
        profile: {
            username
        },
        email,
        password: hash(password)
    });
    return account.save();
}

Account.methods.validatePassword = function (password) {
    const hashed = hash(password);
    return this.password === hashed;
}

Account.methods.generateToken = function () {
    const payload = {
        _id: this.id,
        profile: this.profile
    };

    return generateToken(payload, 'account');
}


module.exports = mongoose.model('Account', Account);