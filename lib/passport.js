var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/users');
var CONSTANTS = require('../config/constants');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = CONSTANTS.SECRET_KEY;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ _id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
