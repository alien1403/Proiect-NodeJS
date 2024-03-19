const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const JWT_SECRET = process.env.JWT_TOKEN;

const authController = {
  async signup(req, res) {
    const { name, email, password, specialization, userType } = req.body;
    try {
      const existingUser = userType === 'doctor' ?
        await db.Doctor.findOne({ where: { email } }) :
        await db.Patient.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = userType === 'doctor' ?
        await db.Doctor.create({ name, email, password: hashedPassword, specialization }) :
        await db.Patient.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ userId: newUser.id, userType }, JWT_SECRET);

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async signin(req, res) {
    const { email, password, userType } = req.body;
    try {
      const user = userType === 'doctor' ?
        await db.Doctor.findOne({ where: { email } }) :
        await db.Patient.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log(password)
      console.log(user.password)

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user.id, userType }, JWT_SECRET);

      res.json({ user, token });
    } catch (error) {
      console.error('Error signing in user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = authController;
