module.exports = {
  MONGO_DB: {
    URI:
      process.env.MONGODB_URI ||
      'mongodb://saurabh:password@ds227858.mlab.com:27858/medicdb',
  },
  SECRET_KEY: 'tp4JjBQNl01w+6FStJU1PHIKSI7RpofyqMelmm3x',
  ENUMS: {
    USER_TYPE: {
      DOCTOR: 'doctor',
      PATIENT: 'patient',
    },
  },
};
