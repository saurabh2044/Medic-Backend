const mongoose = require('mongoose');
const CONSTANTS = require('../config/constants');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.USER_TYPE.DOCTOR,
        CONSTANTS.ENUMS.USER_TYPE.PATIENT,
      ],
      default: CONSTANTS.ENUMS.USER_TYPE.PATIENT,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
