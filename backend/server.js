// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Contact = require('./models/Contact'); // Import Contact model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Auth middleware (This part seems correct, but I've included best practices)
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' }); // Improved message
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // More specific error handling for JWT verification
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token.' });
    }
    res.status(400).json({ msg: 'Invalid token.' }); // Fallback for other JWT errors
  }
};

// Register route -  Seems fine, included for completeness.
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login route -  Seems fine, included for completeness.
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);  // Assuming you have matchPassword defined in your User model
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, username: user.name, message: "Login successful" });
  } catch (err) {
      console.error(err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user details -  Seems fine, included for completeness.
app.get('/api/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ msg: 'Server error' });
  }
});

// Contact form submission -  **CRITICAL CHANGES HERE**
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Input Validation (using Mongoose schema's validation)
    const newContact = new Contact({ name, email, message });
    await newContact.validate(); //  Explicitly validate before saving

    await newContact.save();
    res.status(200).json({ message: 'Message sent successfully!' }); // Consistent 200 status for success
  } catch (err) {
    console.error(err); //  Log the actual error!  This is VERY important for debugging.

    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({ errors }); // Return validation errors to the client
    }

    res.status(500).json({ message: 'Server error. Try again later.' }); // Generic error for other issues
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});