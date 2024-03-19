const { Patient, Appointment } = require('../models');

const PatientController = {
  async getAllPatients(req, res) {
    try {
      const patients = await Patient.findAll();
      res.json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getPatientById(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.json(patient);
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async addPatient(req, res) {
    const { name, email, password } = req.body;
    try {
      const newPatient = await Patient.create({ name, email, password });
      res.status(201).json(newPatient);
    } catch (error) {
      console.error('Error adding patient:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updatePatient(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userId = req.user.id.toString();
    console.log(userId)
    console.log(id)
    try {
      if (userId !== id) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      await patient.update({ name, email, password });
      res.json(patient);
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  async deleteAppointment(req, res) {
    const { id } = req.params;
    const userId = req.user.id
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      if (appointment.patientId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }
      await appointment.destroy();
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deletePatient(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      await patient.destroy();
      res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = PatientController;
