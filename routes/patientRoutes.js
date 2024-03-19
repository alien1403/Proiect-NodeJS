const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientController');
const authMiddleware = require('../config/authMiddleware');

router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getPatientById);
router.post('/', PatientController.addPatient);
router.put('/:id', authMiddleware, PatientController.updatePatient);
router.delete('/:id', authMiddleware, PatientController.deletePatient);
router.delete('/appointments/:id', authMiddleware, PatientController.deleteAppointment);

module.exports = router;
