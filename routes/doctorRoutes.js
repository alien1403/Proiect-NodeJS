const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController');
const authMiddleware = require('../config/authMiddleware');

router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', DoctorController.addDoctor);
router.put('/:id', authMiddleware, DoctorController.updateDoctor);
router.delete('/:id', authMiddleware,DoctorController.deleteDoctor);
router.delete('/appointments/:id', authMiddleware, DoctorController.deleteAppointment);

module.exports = router;
