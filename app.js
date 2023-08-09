//app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());


// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) =>{
  res.send('Server Running Perfectly');
})
// Start the server
app.listen(port, () => console.log(`Server started on: ${port}`));
