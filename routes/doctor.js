var express = require('express');
var router = express.Router();
var Passport = require('passport');
const profieLib = require('../lib/doctor/profile');
const slotLib = require('../lib/doctor/slot');

router.post(
  '/profile',
  Passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    profieLib.createDoctorProfile(req.user._id, req.body, function(
      err,
      fetchedInstance
    ) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(fetchedInstance);
    });
  }
);

router.post(
  '/newSlot',
  Passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    slotLib.createNewSlot(req.user._id, req.body, function(
      err,
      fetchedInstance
    ) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(fetchedInstance);
    });
  }
);

module.exports = router;
