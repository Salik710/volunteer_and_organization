const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const organizationRoutes = require('./routes/organizationRoutes');
const authRoutes = require('./routes/authRoutes')
const volunteerRoutes = require('./routes/volunteerRoutes')
const eventRoutes = require('./routes/eventRoutes')
const registrationRoutes = require('./routes/registerationRoutes')
//const cloudinaryRoutes = require('./routes/cloudinaryRoutes')
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();
//app.use('/cloud', cloudinaryRoutes);
app.use('/organization', organizationRoutes);
app.use('/event', eventRoutes);
app.use('/user', authRoutes);
app.use('/volunteer',volunteerRoutes);
app.use('/registration', registrationRoutes);


  // Define a simple route
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });