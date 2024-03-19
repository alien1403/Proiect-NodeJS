const { Doctor, Appointment } = require('../models');

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

  async filterDoctors(req, res) {
    console.log("DA")
    try {
      let doctors;
      const { name, specialization } = req.query;

      if (name && specialization) {
          doctors = await Doctor.findAll({ where: { name, specialization } });
      } else if (name) {
          doctors = await Doctor.findAll({ where: { name } });
      } else if (specialization) {
          doctors = await Doctor.findAll({ where: { specialization } });
      } else {
          doctors = await Doctor.findAll();
      }

      res.json(doctors);
    } catch (error) {
      console.error('Error filtering doctors: ', error);
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
    const userId = req.user.id.toString();
    try {
      if (userId !== id) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }
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
  async deleteAppointment(req, res) {
    const { id } = req.params;
    const userId = req.user.id
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      if (appointment.doctorId !== userId) {
        return res.status(403).json({ message: 'You are not authorized to perform this action' });
      }
      await appointment.destroy();
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async sortDoctors(req, res){
    try{
      let doctors
      if(req.query.sort === "name")
      {
        doctors = await Doctor.findAll({ order: [[ 'name', 'ASC']]})
      }
      else if(req.query.sort === "specialization")
      {
        doctors = await Doctor.findAll({ order: [[ 'specialization', 'ASC']]})
      }
      else{
        doctors = await Doctor.findAll();
      }
      res.json(doctors)
    }catch(error){
      console.error('Error fetching doctors: ', error)
      res.status(500).json({ message: 'Internal server error' })
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
