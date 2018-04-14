var express = require('express');
var router = express.Router();
var Passport = require('passport');
const appointmentLib = require('../lib/patient/appointment');
const doctorsLib = require('../lib/patient/doctors');

router.post(
  '/appointment',
  Passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    appointmentLib.createNewAppointment(
      req.body.doctorId,
      req.user._id,
      req.body,
      function(err, fetchedInstance) {
        if (err) {
          res.status(500).json(err);
          return;
        }
        res.status(200).json(fetchedInstance);
      }
    );
  }
);

router.post(
  '/doctors',
  Passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    doctorsLib.getDoctors(req.body, function(err, fetchedInstance) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(fetchedInstance);
    });
  }
);

module.exports = router;
