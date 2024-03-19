// backend/server.js
const express = require('express');
const sequelize = require('./database');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Utilizează rutele definite pentru doctori, pacienți și programări
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

// Sincronizează modelele Sequelize și pornește serverul
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
  });
}).catch(err => {
  console.error('Eroare la sincronizarea bazelor de date:', err);
});
