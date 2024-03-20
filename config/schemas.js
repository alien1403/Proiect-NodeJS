const Joi = require('joi')

const doctorSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    specialization: Joi.string().required()
})

const patientSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const appointmentSchema = Joi.object({
    dateTime: Joi.date().iso().required(),
    doctorId: Joi.number().integer().required(),
    patientId: Joi.number().integer().required()
})

const userSignInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = { doctorSchema, patientSchema, appointmentSchema, userSignInSchema }