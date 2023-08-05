// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://onu:%40Vishal1111@cluster0.x3a49xh.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => console.log(`Server started on: ${port}`));
