const mongoose = require('mongoose');
const CONSTANTS = require('../config/constants');
const Schema = mongoose.Schema;
const appointmentSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appointment_date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    start_time: {
      type: Number,
      required: true,
    },
    end_time: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.PAYMENT_STATUS.INPROCESS,
        CONSTANTS.ENUMS.PAYMENT_STATUS.PAID,
        CONSTANTS.ENUMS.PAYMENT_STATUS.REFUNDED,
      ],
      default: CONSTANTS.ENUMS.PAYMENT_STATUS.INPROCESS,
    },
    booking_status: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.BOOKING_STATUS.INPROCESS,
        CONSTANTS.ENUMS.BOOKING_STATUS.APPROVED,
        CONSTANTS.ENUMS.BOOKING_STATUS.CANCELLED,
      ],
      default: CONSTANTS.ENUMS.BOOKING_STATUS.INPROCESS,
    },
    condition: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.CONDITION.NORMAL,
        CONSTANTS.ENUMS.CONDITION.EMERGENCY,
      ],
      default: CONSTANTS.ENUMS.CONDITION.NORMAL,
    },
    token: {
      type: String,
    },
    problem: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
