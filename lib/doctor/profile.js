const Doctor = require('../../models/doctor');
const mongoose = require('mongoose');

function createDoctorProfile(userId, profileObj, callback) {
  if (!profileObj) {
    callback({
      type: 'Invalid details',
      msg: 'No doctor details found',
      errorDetail: 'Need to pass profile object for creation of doctor profile',
    });
    return;
  }
  const newDoctor = new Doctor({
    user_id: userId,
    fees: profileObj.fees,
    certificate: profileObj.certi,
    specialization: profileObj.specialization,
  });
  newDoctor.save(function(errorInSave, savedDoctor) {
    if (errorInSave) {
      callback({
        type: 'db_Error',
        msg: 'Failed to Create a new doctor.',
        errorDetail: String(errorInSave),
      });
      return;
    }
    callback(null, savedDoctor);
  });
}

module.exports = {
  createDoctorProfile: createDoctorProfile,
};
