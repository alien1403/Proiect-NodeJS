const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/patientController');

router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getPatientById);
router.post('/', PatientController.addPatient);
router.put('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);

module.exports = router;
