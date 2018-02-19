module.exports = {
  MONGO_DB: {
    URI: 'mongodb://localhost:27017/saurabh',
    // process.env.MONGODB_URI ||
    // 'mongodb://saurabh:password@ds227858.mlab.com:27858/medicdb',
  },
  SECRET_KEY: 'tp4JjBQNl01w+6FStJU1PHIKSI7RpofyqMelmm3x',
  ERROR_TYPES: {
    DB_ERROR: 'db_error',
    INVALID_RECORD: 'invalid_record',
    INCORRECT_PAYLOAD: 'incorrect_payload',
    TYPE_ERROR: 'type_error',
    ITERATION_ERROR: 'iteration_error',
    VALIDATION_ERROR: 'validation_error',
    AUTHENTICATION_ERROR: 'authentication_error',
    AUTH0_ERROR: 'auth0_error',
    JWT_ERROR: 'jwt_error',
    SEND_MAIL_ERROR: 'send_mail_error',
  },
  ENUMS: {
    USER_TYPE: {
      DOCTOR: 'doctor',
      PATIENT: 'patient',
    },
    DAY: {
      MONDAY: 'monday',
      TUESDAY: 'tuesday',
      WEDNESDAY: 'wednesday',
      THURSDAY: 'thursday',
      FRIDAY: 'friday',
      SATURDAY: 'saturday',
      SUNDAY: 'sunday',
    },
  },
};
