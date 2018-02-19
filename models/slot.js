const mongoose = require('mongoose');
const CONSTANTS = require('../config/constants');
const Schema = mongoose.Schema;
const doctorSlotSchema = new Schema(
  {
    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    day: {
      type: String,
      enum: [
        CONSTANTS.ENUMS.DAY.MONDAY,
        CONSTANTS.ENUMS.DAY.TUESDAY,
        CONSTANTS.ENUMS.DAY.WEDNESDAY,
        CONSTANTS.ENUMS.DAY.THURSDAY,
        CONSTANTS.ENUMS.DAY.FRIDAY,
        CONSTANTS.ENUMS.DAY.SATURDAY,
        CONSTANTS.ENUMS.DAY.SUNDAY,
      ],
      default: CONSTANTS.ENUMS.DAY.MONDAY,
    },
    start_time: {
      type: Number,
      required: true,
    },
    end_time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Slot', doctorSlotSchema);
