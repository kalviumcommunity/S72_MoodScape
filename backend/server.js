const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./Auth');

const app = express();
const PORT = 5000;

require('dotenv').config()

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log(err));
