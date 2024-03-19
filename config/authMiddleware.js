const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_TOKEN;
const db = require('../models');

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send('Not authorized');
    }
  
    const token = authorization.replace('Bearer ', '');
    try {
      const data = jwt.verify(token, JWT_SECRET);
      const doctor = await db.Doctor.findByPk(data.userId);
      const patient = await db.Patient.findByPk(data.userId);
      const user = doctor ? doctor : patient;
      if (!user) {
        return res.status(401).send('Not authorized');
      }
  
      req.user = user;
      console.log(req.user);
      next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).send('Invalid token');
      }
      console.error('Error in authMiddleware:', err);
      res.status(500).send('Internal server error');
    }
};

module.exports = authMiddleware;
