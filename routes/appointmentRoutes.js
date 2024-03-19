const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');

router.get('/', AppointmentController.getAllAppointments);
router.get('/:id', AppointmentController.getAppointmentById);
router.post('/', AppointmentController.addAppointment);
router.put('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);

module.exports = router;
