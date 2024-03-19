'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Appointment.belongsTo(models.Doctor, { foreignKey: 'doctorId' });
        Appointment.belongsTo(models.Patient, { foreignKey: 'patientId' });
    }
  }
  Appointment.init({
    dateTime: DataTypes.DATE,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};