const Slot = require('../../models/slot');
const helper = require('../../helpers/doctorHelper');
const async = require('async');
const CONSTANTS = require('../../config/constants');
const mongoose = require('mongoose');

const ERROR_TYPES = CONSTANTS.ERROR_TYPES;

function _checkIfSlotExist(doctorId, slotObj, callback) {
  Slot.find({
    doctor_id: doctorId,
    day: slotObj.day,
    $or: [
      {
        $and: [
          { start_time: { $lte: slotObj.startTime } },
          { end_time: { $gte: slotObj.startTime } },
        ],
      },
      {
        $and: [
          { start_time: { $lte: slotObj.endTime } },
          { end_time: { $gte: slotObj.endTime } },
        ],
      },
      {
        $and: [
          { start_time: { $gte: slotObj.startTime } },
          { end_time: { $lte: slotObj.endTime } },
        ],
      },
    ],
  }).exec(function(slotFetchError, fetchedSlot) {
    console.log(fetchedSlot);
    console.log(fetchedSlot.length);
    if (slotFetchError) {
      callback({
        type: ERROR_TYPES.DB_ERROR,
        msg: 'error in finding slot',
        errorDetail: String(slotFetchError),
      });
    } else if (!fetchedSlot || fetchedSlot.length === 0) {
      callback(null, fetchedSlot);
    } else {
      callback({
        type: ERROR_TYPES.INCORRECT_PAYLOAD,
        msg: 'slot already exist',
        errorDetail: 'The slot for folowing time already exist',
      });
    }
  });
}

function _saveNewSlot(docterId, slotObj, callback) {
  const newSlot = new Slot({
    doctor_id: docterId,
    day: slotObj.day,
    start_time: slotObj.startTime,
    end_time: slotObj.endTime,
  });
  newSlot.save(function(errorInSave, savedslot) {
    if (errorInSave) {
      callback({
        type: ERROR_TYPES.DB_ERROR,
        msg: 'Failed to Create a new slot.',
        errorDetail: String(errorInSave),
      });
      return;
    }
    callback(null, savedslot);
  });
}

function createNewSlot(userId, slotObj, callback) {
  if (!slotObj) {
    callback({
      type: 'incorret_payload',
      msg: 'No slot details found',
      errorDetail: 'Need to pass slot object for creation of new slot',
    });
    return;
  }
  async.waterfall(
    [
      function(waterfallCallback) {
        helper.fetchDoctorById(userId, function(errInFetch, fetchedDoctor) {
          waterfallCallback(errInFetch, fetchedDoctor._id);
        });
      },
      function(doctorId, waterfallCallback) {
        _checkIfSlotExist(doctorId, slotObj, function(checkError, slot) {
          waterfallCallback(checkError, doctorId);
        });
      },

      function(doctorId, waterfallCallback) {
        _saveNewSlot(doctorId, slotObj, function(errSave, newSlot) {
          waterfallCallback(errSave, newSlot);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

function getAllslots(doctorId, day, callback) {
  Slot.find({
    doctor_id: doctorId,
    day: day,
  }).exec(function(fetchSlotError, fetchedSlots) {
    if (fetchSlotError) {
      callback({
        type: ERROR_TYPES.DB_ERROR,
        msg: 'Failed to find all slots',
        errorDetail: String(fetchSlotError),
      });
    } else {
      callback(null, fetchedSlots);
    }
  });
}

function getAllSlotsOfDay(userId, day, callback) {
  if (!day) {
    callback({
      type: ERROR_TYPES.INCORRECT_PAYLOAD,
      msg: 'No day found ',
      errorDetail: 'You need to pass day name to view all slots',
    });
    return;
  }
  async.waterfall(
    [
      function(waterfallCallback) {
        helper.fetchDoctorById(userId, function(errInFetch, fetchedDoctor) {
          waterfallCallback(errInFetch, fetchedDoctor._id);
        });
      },
      function(docterId, waterfallCallback) {
        getAllslots(docterId, day, function(fetchError, fetchSlots) {
          waterfallCallback(fetchError, fetchSlots);
        });
      },
    ],
    function(err, data) {
      callback(err, data);
    }
  );
}

module.exports = {
  createNewSlot: createNewSlot,
  getAllSlotsOfDay: getAllSlotsOfDay,
};
