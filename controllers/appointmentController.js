const { Appointment, Doctor, Patient } = require('../models');

const AppointmentController = {
  async getAllAppointments(req, res) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          { model: Doctor, as: 'Doctor', attributes: { exclude: ['password'] } },
          { model: Patient, as: 'Patient', attributes: { exclude: ['password'] } }
        ],
        attributes: { exclude: ['doctorId', 'patientId'] }
      });
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getAppointmentById(req, res) {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id, {
        include: [
          { model: Doctor, as: 'Doctor', attributes: { exclude: ['password'] } },
          { model: Patient, as: 'Patient', attributes: { exclude: ['password'] } }
        ],
        attributes: { exclude: ['doctorId', 'patientId'] }
      });
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json(appointment);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async addAppointment(req, res) {
    const { dateTime, doctorId, patientId } = req.body;

    const doctor = await Doctor.findByPk(doctorId);
    if(!doctor){
      return res.status(404).json({ message: "Doctor not found "})
    }

    const patient = await Patient.findByPk(patientId);
    if(!patient){
      return res.status(404).json({ message: "Patient not found "})
    }

    try {
      const newAppointment = await Appointment.create({ dateTime, doctorId, patientId });
      const appointmentWithDetails = {
        id: newAppointment.id,
        dateTime: newAppointment.dateTime,
        doctor: {
          id: doctor.id,
          name: doctor.name,
          email: doctor.email,
          specialization: doctor.specialization
        },
        patient: {
          id: patient.id,
          name: patient.name,
          email: patient.email,
        }
      };
      res.status(201).json(appointmentWithDetails);
    } catch (error) {
      console.error('Error adding appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateAppointment(req, res) {
    const { id } = req.params;
    const { dateTime, doctorId, patientId } = req.body;
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      await appointment.update({ dateTime, doctorId, patientId });
      res.json(appointment);
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteAppointment(req, res) {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      await appointment.destroy();
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = AppointmentController;
