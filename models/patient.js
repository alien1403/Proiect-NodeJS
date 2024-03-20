'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Patient.hasMany(models.Appointment, { foreignKey: 'patientId' });
    }

    static async deleteWithAppointments(patientId) {
      try {
          const patient = await this.findByPk(patientId);
          if (!patient) {
              throw new Error('Patient not found');
          }
  
          await this.sequelize.models.Appointment.destroy({ where: { patientId } });
  
          await patient.destroy();
  
          return true;
      } catch (error) {
          throw new Error(`Error deleting patient and appointments: ${error.message}`);
      }
    }
  }
  Patient.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      }
    },
  }, {
    sequelize,
    modelName: 'Patient',
  });

  Patient.beforeDestroy(async (patient, options) => {
    try {
      // Sterge toate programarile asociate
      await sequelize.models.Appointment.destroy({ where: { patientId: patient.id } });
    } catch (error) {
      console.error('Error deleting appointments:', error);
      throw new Error('Error deleting appointments');
    }
  });

  return Patient;
};