var express = require('express');
var router = express.Router();
const appLib = require('../lib/app');

router.post('/register', function(req, res, next) {
  appLib.registerUser(req.body, function(registerError, registeredUser) {
    if (registerError) {
      res.status(500).json(registerError);
      return;
    }
    res.status(200).json(registeredUser);
  });
});

router.post('/login', function(req, res, next) {
  appLib.loginUser(req.body, function(err, fetchedInstance) {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(fetchedInstance);
  });
});

module.exports = router;
