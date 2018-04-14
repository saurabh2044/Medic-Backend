const express = require('express');
const appRoutes = require('./appRoute');
const doctorRoutes = require('./doctor');
const userRoutes = require('./users');
//const adminRoutes = require('./admin');

const router = express.Router();
router.use('/', appRoutes);
router.use('/doctor', doctorRoutes);
router.use('/user', userRoutes);
//router.use('/admin', adminRoutes);

module.exports = router;
