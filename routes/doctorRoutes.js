/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API endpoints for managing doctors
 * 
 * definitions:
 *   Doctor:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       specialization:
 *         type: string
 * 
 *   DoctorInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       specialization:
 *         type: string
 *     required:
 *       - name
 *       - email
 *       - specialization
 */

/**
 * @swagger
 * /api/doctors/filter:
 *   get:
 *     summary: Filtrează doctorii
 *     description: Returnează o listă filtrată de doctori, în funcție de anumite criterii.
 *     tags:
 *       - "Doctors" 
 *     responses:
 *       200:
 *         description: Lista filtrată de doctori
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Doctor'
 * 
 * /api/doctors/sort:
 *   get:
 *     summary: Sortează doctorii
 *     description: Returnează o listă de doctori sortată într-o anumită ordine.
 *     tags:
 *       - "Doctors" 
 *     responses:
 *       200:
 *         description: Lista sortată de doctori
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Doctor'
 * 
 * /api/doctors/pagination:
 *   get:
 *     summary: Paginare doctori
 *     description: Returnează o listă paginată de doctori, pentru a gestiona un număr mare de rezultate.
 *     tags:
 *       - "Doctors" 
 *     responses:
 *       200:
 *         description: Lista paginată de doctori
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Doctor'
 * 
 * /api/doctors:
 *   get:
 *     summary: Obțineți o listă cu toți doctorii
 *     description: Returnează o listă cu toți doctorii disponibili în sistem.
 *     tags:
 *       - "Doctors" 
 *     responses:
 *       200:
 *         description: Lista cu toți doctorii
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Doctor'
 *   post:
 *     summary: Adaugă un nou doctor
 *     description: Adaugă un nou doctor în sistem.
 *     tags:
 *       - "Doctors" 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/DoctorInput'
 *     responses:
 *       201:
 *         description: Doctorul a fost adăugat cu succes
 *         schema:
 *           $ref: '#/definitions/Doctor'
 * 
 * /api/doctors/{id}:
 *   get:
 *     summary: Obțineți detalii despre un doctor
 *     description: Returnează detalii despre un doctor specific, identificat după ID-ul său.
 *     tags:
 *       - "Doctors" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul doctorului
 *     responses:
 *       200:
 *         description: Detalii despre doctor
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *   put:
 *     summary: Actualizează detaliile unui doctor
 *     description: Actualizează detaliile unui doctor existent în sistem, identificat după ID-ul său.
 *     tags:
 *       - "Doctors" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul doctorului
 *       - in: body
 *         name: doctor
 *         schema:
 *           $ref: '#/definitions/DoctorInput'
 *         required: true
 *         description: Detaliile actualizate ale doctorului
 *     responses:
 *       200:
 *         description: Doctorul a fost actualizat cu succes
 *         schema:
 *           $ref: '#/definitions/Doctor'
 *   delete:
 *     summary: Șterge un doctor
 *     description: Șterge un doctor din sistem, împreună cu toate programările asociate, identificat după ID-ul său.
 *     tags:
 *       - "Doctors" 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul doctorului
 *     responses:
 *       204:
 *         description: Doctorul a fost șters cu succes
 * 
 */

const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController');
const authMiddleware = require('../config/middleware/authMiddleware');
const validatePayload = require('../config/middleware/validatePayload')

router.get('/filter', DoctorController.filterDoctors);
router.get('/sort', DoctorController.sortDoctors)
router.get('/pagination', DoctorController.pagination)
router.get('/appointments/:id', DoctorController.getDoctorAppointments)
router.get('/', DoctorController.getAllDoctors);
router.get('/:id', DoctorController.getDoctorById);
router.post('/', validatePayload, DoctorController.addDoctor);
router.put('/:id', authMiddleware, DoctorController.updateDoctor);
router.delete('/:id', authMiddleware, DoctorController.deleteDoctor);
router.delete('/appointments/:id', authMiddleware, DoctorController.deleteAppointment);

module.exports = router;
