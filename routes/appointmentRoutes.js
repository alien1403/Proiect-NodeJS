/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API endpoints for managing appointments
 * 
 * definitions:
 *   Appointment:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       doctorId:
 *         type: integer
 *       patientId:
 *         type: integer
 *       date:
 *         type: string
 *         format: date-time
 *       reason:
 *         type: string
 * 
 *   AppointmentInput:
 *     type: object
 *     properties:
 *       doctorId:
 *         type: integer
 *       patientId:
 *         type: integer
 *       date:
 *         type: string
 *         format: date-time
 *       reason:
 *         type: string
 *     required:
 *       - doctorId
 *       - patientId
 *       - date
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Obțineți o listă cu toate programările
 *     description: Returnează o listă cu toate programările disponibile în sistem.
 *     tags:
 *       - "Appointments"
 *     responses:
 *       200:
 *         description: Lista cu toate programările
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Appointment'
 *   post:
 *     summary: Programă o nouă consultație
 *     description: Programă o nouă consultație între un doctor și un pacient.
 *     tags:
 *       - "Appointments"    
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/AppointmentInput'
 *     responses:
 *       201:
 *         description: Programarea a fost creată cu succes
 *         schema:
 *           $ref: '#/definitions/Appointment'
 * 
 * /api/appointments/{id}:
 *   get:
 *     summary: Obțineți detalii despre o programare
 *     description: Returnează detalii despre o programare specifică, identificată după ID-ul său.
 *     tags:
 *       - "Appointments" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul programării
 *     responses:
 *       200:
 *         description: Detalii despre programare
 *         schema:
 *           $ref: '#/definitions/Appointment'
 *   put:
 *     summary: Actualizează detaliile unei programări
 *     description: Actualizează detaliile unei programări existente în sistem, identificată după ID-ul său.
 *     tags:
 *       - "Appointments" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul programării
 *       - in: body
 *         name: appointment
 *         schema:
 *           $ref: '#/definitions/AppointmentInput'
 *         required: true
 *         description: Detaliile actualizate ale programării
 *     responses:
 *       200:
 *         description: Programarea a fost actualizată cu succes
 *         schema:
 *           $ref: '#/definitions/Appointment'
 *   delete:
 *     summary: Șterge o programare
 *     description: Șterge o programare din sistem, identificată după ID-ul său.
 *     tags:
 *       - "Appointments" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul programării
 *     responses:
 *       204:
 *         description: Programarea a fost ștearsă cu succes
 */

const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');

router.get('/', AppointmentController.getAllAppointments);
router.get('/:id', AppointmentController.getAppointmentById);
router.post('/', AppointmentController.addAppointment);
router.put('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);

module.exports = router;
