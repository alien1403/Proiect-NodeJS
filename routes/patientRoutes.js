/**
 * @swagger
 * 
 * tags:
 *   name: Patients
 *   description: API endpoints for managing patients
 * 
 * definitions:
 *   Patient:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       age:
 *         type: integer
 * 
 *   PatientInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       age:
 *         type: integer
 *     required:
 *       - name
 *       - email
 *       - age
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Obțineți o listă cu toți pacienții
 *     description: Returnează o listă cu toți pacienții disponibili în sistem.
 *     tags:
 *       - "Patients" 
 *     responses:
 *       200:
 *         description: Lista cu toți pacienții
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Patient'
 *   post:
 *     summary: Adaugă un nou pacient
 *     description: Adaugă un nou pacient în sistem.
 *     tags:
 *       - "Patients" 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/PatientInput'
 *     responses:
 *       201:
 *         description: Pacientul a fost adăugat cu succes
 *         schema:
 *           $ref: '#/definitions/Patient'
 * 
 * /api/patients/{id}:
 *   get:
 *     summary: Obțineți detalii despre un pacient
 *     description: Returnează detalii despre un pacient specific, identificat după ID-ul său.
 *     tags:
 *       - "Patients" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul pacientului
 *     responses:
 *       200:
 *         description: Detalii despre pacient
 *         schema:
 *           $ref: '#/definitions/Patient'
 *   put:
 *     summary: Actualizează detaliile unui pacient
 *     description: Actualizează detaliile unui pacient existent în sistem, identificat după ID-ul său.
 *     tags:
 *       - "Patients" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul pacientului
 *       - in: body
 *         name: patient
 *         schema:
 *           $ref: '#/definitions/PatientInput'
 *         required: true
 *         description: Detaliile actualizate ale pacientului
 *     responses:
 *       200:
 *         description: Pacientul a fost actualizat cu succes
 *         schema:
 *           $ref: '#/definitions/Patient'
 *   delete:
 *     summary: Șterge un pacient
 *     description: Șterge un pacient din sistem, împreună cu toate programările asociate, identificat după ID-ul său.
 *     tags:
 *       - "Patients" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul pacientului
 *     responses:
 *       204:
 *         description: Pacientul a fost șters cu succes
 * 
 * /api/patients/appointments/{id}:
 *   delete:
 *     summary: Șterge o programare
 *     description: Șterge o programare din sistem, identificată după ID-ul său.
 *     tags:
 *       - "Patients" 
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
const PatientController = require('../controllers/patientController');
const authMiddleware = require('../config/middleware/authMiddleware');

router.get('/', PatientController.getAllPatients);
router.get('/:id', PatientController.getPatientById);
router.post('/', PatientController.addPatient);
router.put('/:id', authMiddleware, PatientController.updatePatient);
router.delete('/:id', authMiddleware, PatientController.deletePatient);
router.delete('/appointments/:id', authMiddleware, PatientController.deleteAppointment);

module.exports = router;
