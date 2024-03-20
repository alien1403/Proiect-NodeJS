const payloadMiddleware = (doctorSchema, patientSchema) => {
    return (req, res, next) => {
        const { userType, ...rest } = req.body;
        const schema = userType === 'doctor' ? doctorSchema : patientSchema;
        const { error } = schema.validate(rest);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};

module.exports = payloadMiddleware;