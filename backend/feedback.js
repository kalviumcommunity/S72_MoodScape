const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Feedback = require('./schema'); // Import the Feedback model

// Validation middleware for feedback
const feedbackValidation = [
  body('review')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Review must be between 10 and 500 characters long'),
  body('improvement')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Improvement suggestion must be between 10 and 500 characters long')
];

// POST route for submitting feedback
router.post('/feedback', feedbackValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { review, improvement } = req.body;

    // Create a new Feedback document
    const feedback = new Feedback({ review, improvement });
    await feedback.save(); // Save the document to the database

    // Return a success response
    res.status(201).json({ message: 'Feedback saved successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ 
      error: 'Error saving feedback',
      details: error.message 
    });
  }
});

module.exports = router;
