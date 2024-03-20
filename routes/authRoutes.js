const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const payloadMiddleware = require('../config/middleware/payloadMiddleware')
const { doctorSchema, patientSchema } = require('../config/schemas');

router.post('/signup', payloadMiddleware(doctorSchema, patientSchema), authController.signup);
router.post('/signin', authController.signin);

module.exports = router;
