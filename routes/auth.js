// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // You can use a JWT token here for authentication

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  const {fname, lname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const user = await User.create({ fname, lname, email, password, confirmPassword });
    // You can use a JWT token here for authentication

    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
