const express = require('express');
const router = express.Router();
const Feedback = require('./schema'); // Import the Feedback model

// POST route for submitting feedback
router.post('/feedback', async (req, res) => {
  const { review, improvement } = req.body;

  // Check if both fields are provided
  if (!review || !improvement) {
    return res.status(400).json({ message: 'Both review and improvement fields are required.' });
  }

  try {
    // Create a new Feedback document
    const feedback = new Feedback({ review, improvement });
    await feedback.save(); // Save the document to the database

    // Return a success response
    res.status(201).json({ message: 'Feedback saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving feedback' });
  }
});

module.exports = router;
