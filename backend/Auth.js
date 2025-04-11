const express = require('express');
const router = express.Router();
const User = require('./schema');

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken.' });
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
