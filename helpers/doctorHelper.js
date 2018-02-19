const Doctor = require('../models/doctor');
const CONSTANTS = require('../config/constants');
const ERROR_TYPES = CONSTANTS.ERROR_TYPES;

function fetchDoctorById(userId, callback) {
  Doctor.findOne({
    user_id: userId,
  }).exec(function(fetchDoctorError, fetchedDoctor) {
    if (fetchDoctorError) {
      callback({
        type: ERROR_TYPES.DB_ERROR,
        msg: 'Failed to find doctor.',
        errorDetail: String(fetchDoctorError),
      });
    } else if (!fetchedDoctor) {
      callback({
        type: ERROR_TYPES.INCORRECT_PAYLOAD,
        msg: 'Failed to find doctor for given Id .',
        errorDetail: 'No doctor found for this id',
      });
    } else {
      callback(null, fetchedDoctor);
    }
  });
}

module.exports = {
  fetchDoctorById: fetchDoctorById,
};
