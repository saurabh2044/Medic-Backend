const express = require('express');
const appRoutes = require('./appRoute');
//const userRoutes = require('./users');
//const adminRoutes = require('./admin');

const router = express.Router();
router.use('/', appRoutes);
//router.use('/user', userRoutes);
//router.use('/admin', adminRoutes);

module.exports = router;
