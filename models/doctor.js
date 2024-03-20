'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Doctor.hasMany(models.Appointment, { foreignKey: 'doctorId' });
    }

    static async deleteWithAppointments(id) {
      try {
        const doctor = await this.findByPk(id);
        if (!doctor) {
          throw new Error('Doctor not found');
        }
        await doctor.destroy();
        return true;
      } catch (error) {
        console.error('Error deleting doctor:', error);
        throw new Error('Error deleting doctor');
      }
    }
  }
  Doctor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      }
    },
    specialization: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  Doctor.beforeDestroy(async (doctor, options) => {
    try {
      await sequelize.models.Appointment.destroy({ where: { doctorId: doctor.id } });
    } catch (error) {
      console.error('Error deleting appointments:', error);
      throw new Error('Error deleting appointments');
    }
  });
  
  return Doctor;
};