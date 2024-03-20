const express = require('express');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./config/middleware/authMiddleware');
const db = require('./models')
const bcrypt = require('bcryptjs')
const app = express();

app.use(express.json());

app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const doctor = await db.Doctor.findOne({ where: { email } });
    const patient = await db.Patient.findOne({ where: { email } });
    let user = doctor ? doctor : patient;
  
    if (!user) {
      return res.status(401).json({ message: 'No user with this email found' });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
  
    if (!validPassword) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }
  
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret key is missing or invalid' });
    }
  
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
  });

module.exports = app;
