module.exports = {
  MONGO_DB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/saurabh',
  },
  SECRET_KEY: 'tp4JjBQNl01w+6FStJU1PHIKSI7RpofyqMelmm3x',
  ENUMS: {
    USER_TYPE: {
      DOCTOR: 'doctor',
      PATIENT: 'patient',
    },
  },
};
