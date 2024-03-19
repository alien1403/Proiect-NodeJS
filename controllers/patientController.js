const { Patient } = require('../models');

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
    try {
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
