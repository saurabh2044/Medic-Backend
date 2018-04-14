const Slot = require('../../models/slot');
const Appointment = require('../../models/Appointment');
const async = require('async');
const CONSTANTS = require('../../config/constants');
const mongoose = require('mongoose');

const ERROR_TYPES = CONSTANTS.ERROR_TYPES;
function _checkIfSlotExist(doctorId, appointObj, callback) {
  Slot.find({
    doctor_id: doctorId,
    day: appointObj.day,
    $or: [
      {
        $and: [
          { start_time: { $lte: appointObj.startTime } },
          { end_time: { $gte: appointObj.startTime } },
        ],
      },
      {
        $and: [
          { start_time: { $lte: appointObj.endTime } },
          { end_time: { $gte: appointObj.endTime } },
        ],
      },
      {
        $and: [
          { start_time: { $gte: appointObj.startTime } },
          { end_time: { $lte: appointObj.endTime } },
        ],
      },
    ],
  }).exec(function(slotFetchError, fetchedSlot) {
    if (slotFetchError) {
      callback({
        type: ERROR_TYPES.DB_ERROR,
        msg: 'error in finding slot',
        errorDetail: String(slotFetchError),
      });
    } else if (!fetchedSlot || fetchedSlot.length === 0) {
      callback({
        type: ERROR_TYPES.INCORRECT_PAYLOAD,
        msg: 'No slot available',
        errorDetail: 'The doctor has not created any slot for this day',
      });
    } else {
      callback(null, fetchedSlot);
    }
  });
}

function _checkForAppointment(doctorId, appointObj, callback) {
  Appointment.findOne({
    doctor_id: doctorId,
    appointment_date: appointObj.date,
    $or: [
      {
        $and: [
          { start_time: { $lte: appointObj.startTime } },
          { end_time: { $gte: appointObj.startTime } },
        ],
      },
      {
        $and: [
          { start_time: { $lte: appointObj.endTime } },
          { end_time: { $gte: appointObj.endTime } },
        ],
      },
      {
        $and: [
          { start_time: { $gte: appointObj.startTime } },
          { end_time: { $lte: appointObj.endTime } },
        ],
      },
    ],
  }).exec(function(appointmentFetchError, fetchedAppointment) {
    if (appointmentFetchError) {
      callback({
        type: ERROR_TYPES.DB_ERROR,
        msg: 'error in finding appointment',
        errorDetail: String(appointmentFetchError),
      });
    } else if (!fetchedAppointment || fetchedAppointment.length === 0) {
      callback(null, fetchedAppointment);
    } else {
      callback({
        type: ERROR_TYPES.INCORRECT_PAYLOAD,
        msg: 'Appointment already exist',
        errorDetail: 'The appointment for following time already exist',
      });
    }
  });
}

function _saveNewAppointment(docterId, userId, appointObj, callback) {
  const newAppointment = new Appointment({
    doctor_id: docterId,
    patient_id: userId,
    start_time: appointObj.startTime,
    end_time: appointObj.endTime,
    problem: appointObj.problem,
    appointment_date: appointObj.date,
  });
  newAppointment.save(function(errorInSave, savedAppointment) {
    if (errorInSave) {
      callback({
        type: ERROR_TYPES.DB_ERROR,
        msg: 'Failed to Create a new appointment.',
        errorDetail: String(errorInSave),
      });
      return;
    }
    callback(null, savedAppointment);
    ``;
  });
}

function createNewAppointment(doctorId, userId, appointObj, callback) {
  async.waterfall(
    [
      function(waterfallcallback) {
        _checkIfSlotExist(doctorId, appointObj, function(
          slotFetchError,
          fetchedSlot
        ) {
          waterfallcallback(slotFetchError, fetchedSlot);
        });
      },

      function(fetchedSlot, waterfallcallback) {
        _checkForAppointment(doctorId, appointObj, function(
          fetchedAppointmentError,
          fetchedAppointment
        ) {
          waterfallcallback(fetchedAppointmentError, fetchedAppointment);
        });
      },

      function(fetchedAppointment, waterfallcallback) {
        _saveNewAppointment(doctorId, userId, appointObj, function(
          err,
          savedAppointment
        ) {
          waterfallcallback(err, savedAppointment);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  createNewAppointment: createNewAppointment,
};
