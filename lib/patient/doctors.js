const Slot = require('../../models/slot');
const Appointment = require('../../models/Appointment');
const Doctor = require('../../models/doctor');
const Users = require('../../models/users');
const async = require('async');
const CONSTANTS = require('../../config/constants');
const mongoose = require('mongoose');
const ERROR_TYPES = CONSTANTS.ERROR_TYPES;

function _fetchDoctors(searchObj, callback) {
  Doctor.find({
    specialization: {
      $in: searchObj.spl,
    },
  })
    .sort({ fees: 1 })
    .exec(function(fetchDoctorError, fetchedDoctors) {
      if (fetchDoctorError) {
        console.log(fetchDoctorError);
        callback({
          type: ERROR_TYPES.DB_ERROR,
          msg: 'Error in fetching...',
          errorDetail: 'unable to find doctor in DB.',
        });
      } else {
        callback(null, fetchedDoctors);
      }
    });
}

function _populateDoctorsInfo(doctors, callback) {
  Users.populate(
    doctors,
    {
      path: 'user_id',
      select: 'name phone email',
    },
    function(doctorPopulationError, resultPopulated) {
      if (doctorPopulationError) {
        callback({
          type: ERROR_TYPES.DB_ERROR,
          msg: 'Database error while populating Purchases with doctor details',
          errorDetail: String(doctorPopulationError),
        });
      } else {
        callback(null, resultPopulated);
      }
    }
  );
}

function getDoctors(searchObj, callback) {
  async.waterfall(
    [
      function(waterfallcallback) {
        _fetchDoctors(searchObj, function(errInFetch, fetchedDoctors) {
          waterfallcallback(errInFetch, fetchedDoctors);
        });
      },

      function(fetchedDoctors, waterfallcallback) {
        _populateDoctorsInfo(fetchedDoctors, function(
          errInPopulation,
          populatedDoctors
        ) {
          waterfallcallback(errInPopulation, populatedDoctors);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

// function getAllDoctorsslots(doctorId, day, callback) {
//   console.log(doctorId + ' ' + day);
//   Models.Doctorslot.find({
//     doctor_id: doctorId,
//     day: day,
//   }).exec(function(fetchSlotError, fetchedSlots) {
//     if (fetchSlotError) {
//       callback({
//         type: ERROR_TYPES.DB_ERROR,
//         msg: 'Failed to find all slots',
//         errorDetail: String(fetchSlotError),
//       });
//     } else {
//       callback(null, fetchedSlots);
//     }
//   });
// }

// function getAllAppointments(doctorId, date, callback) {
//   Models.Appointment.find({
//     doctor_id: doctorId,
//     appointment_date: date,
//   }).exec(function(appointError, fetchedAppointment) {
//     if (appointError) {
//       callback({
//         type: ERROR_TYPES.DB_ERROR,
//         msg: 'Failed to find all appointment',
//         errorDetail: String(appointError),
//       });
//     } else {
//       callback(null, fetchedAppointment);
//     }
//   });
// }

// function getAllslots(doctorId, date, day, callback) {
//   let aggregatedData = {};
//   async.waterfall(
//     [
//       function(waterfallcallback) {
//         getAllDoctorsslots(doctorId, day, function(err, slots) {
//           waterfallcallback(err, slots);
//         });
//       },

//       function(slots, waterfallcallback) {
//         converter.convert(slots, function(err, slotTime) {
//           waterfallcallback(err, slotTime);
//         });
//       },

//       function(slots, waterfallcallback) {
//         aggregatedData.slots = slots;
//         getAllAppointments(doctorId, date, function(err, appointments) {
//           waterfallcallback(null, appointments);
//         });
//       },

//       function(appointments, waterfallcallback) {
//         converter.convert(appointments, function(err, appointTime) {
//           aggregatedData.appointTime = appointTime;
//           waterfallcallback(err, aggregatedData);
//         });
//       },
//     ],
//     function(err, data) {
//       callback(err, data);
//     }
//   );
// }

module.exports = {
  getDoctors: getDoctors,
  //getAllslots: getAllslots,
};
