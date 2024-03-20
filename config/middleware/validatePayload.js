const { doctorSchema, patientSchema } = require('../schemas');

const validatePayload = (req, res, next) => {
  const isDoctor = req.body.hasOwnProperty('specialization');
  let { error } = isDoctor ? doctorSchema.validate(req.body) : patientSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validatePayload;