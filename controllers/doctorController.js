const { Doctor } = require('../models');

const DoctorController = {
  async getAllDoctors(req, res) {
    try {
      const doctors = await Doctor.findAll();
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getDoctorById(req, res) {
    const { id } = req.params;
    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      console.error('Error fetching doctor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async addDoctor(req, res) {
    const { name, email, password, specialization } = req.body;
    try {
      const newDoctor = await Doctor.create({ name, email, password, specialization });
      res.status(201).json(newDoctor);
    } catch (error) {
      console.error('Error adding doctor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateDoctor(req, res) {
    const { id } = req.params;
    const { name, email, password, specialization } = req.body;
    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      await doctor.update({ name, email, password, specialization });
      res.json(doctor);
    } catch (error) {
      console.error('Error updating doctor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteDoctor(req, res) {
    const { id } = req.params;
    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      await doctor.destroy();
      res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = DoctorController;
