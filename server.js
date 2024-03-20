// const express = require('express');
// const sequelize = require('./database');
// const doctorRoutes = require('./routes/doctorRoutes');
// const patientRoutes = require('./routes/patientRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');
// const authRoutes = require('./routes/authRoutes')
// const bcrypt = require('bcryptjs')
// require('dotenv').config();
// const authMiddleware = require('./config/authMiddleware');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// const db = require('./models')
// const JWT_SECRET = process.env.JWT_TOKEN
// const jwt = require('jsonwebtoken')




// app.use('/api/doctors', doctorRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/auth', authRoutes);

// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Serverul rulează pe portul ${PORT}`);
//   });
// }).catch(err => {
//   console.error('Eroare la sincronizarea bazelor de date:', err);
// });


const app = require('./app');
const sequelize = require('./database');

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
  });
}).catch(err => {
  console.error('Eroare la sincronizarea bazelor de date:', err);
});
