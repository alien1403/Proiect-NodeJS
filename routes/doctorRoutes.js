const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController');
const authMiddleware = require('../config/middleware/authMiddleware');
const validatePayload = require('../config/middleware/validatePayload')

router.get('/filter', DoctorController.filterDoctors);
router.get('/sort', DoctorController.sortDoctors)
router.get('/pagination', DoctorController.pagination)
router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', validatePayload, DoctorController.addDoctor);
router.put('/:id', authMiddleware, DoctorController.updateDoctor);
router.delete('/:id', authMiddleware, DoctorController.deleteDoctor);
router.delete('/appointments/:id', authMiddleware, DoctorController.deleteAppointment);

module.exports = router;
