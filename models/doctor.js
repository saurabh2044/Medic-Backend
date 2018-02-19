const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    specialization: [
      {
        type: String,
      },
    ],
    certificate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);
