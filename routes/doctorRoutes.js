const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController');

// Rute pentru doctori
router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', DoctorController.addDoctor);
router.put('/:id', DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

module.exports = router;
