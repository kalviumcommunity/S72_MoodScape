const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./schema');

// POST /api/signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Raw request body:', req.body);
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      console.log('Missing fields:', { username: !!username, password: !!password });
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          username: !username ? 'Username is required' : undefined,
          password: !password ? 'Password is required' : undefined
        }
      });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already taken:', username);
      return res.status(400).json({ 
        error: 'Username already taken'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      password: hashedPassword
    });

    // Save user to database
    await user.save();
    console.log('User created successfully:', { username: user.username, id: user._id });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Signup error details:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ 
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    res.status(500).json({ 
      error: 'Server error during signup',
      details: error.message 
    });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;
