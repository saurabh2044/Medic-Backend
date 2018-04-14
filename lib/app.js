const mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../config/constants');

function registerUser(userObj, callback) {
  const newUser = new User({
    name: userObj.firstName,
    phone: userObj.phone,
    email: userObj.email,
    password: userObj.password,
    role: userObj.role,
  });

  newUser.save(function(errInSave, savedUser) {
    callback(errInSave, savedUser);
  });
}

function loginUser(loginDetails, callback) {
  User.findOne({ email: loginDetails.email }, function(err, user) {
    if (err) {
      callback(err);
    } else if (!user) {
      callback('Authentication failed. User not found.');
    } else if (user.password !== loginDetails.password) {
      callback('Authentication failed. Passwords did not match.');
    } else {
      const payload = { id: user._id };
      const token = jwt.sign(payload, CONSTANTS.SECRET_KEY, {
        expiresIn: 2592000, // in seconds
      });
      callback(null, { token: 'jwt ' + token, role: user.role });
    }
  });
}

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
};
