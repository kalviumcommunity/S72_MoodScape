const express = require('express');
const router = express.Router();
const Feedback = require('./schema');

// GET all feedback
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

// GET single feedback by ID
router.get('/feedback/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

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
    await feedback.save();

    // Return a success response
    res.status(201).json({ message: 'Feedback saved successfully!', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving feedback' });
  }
});

// PUT route for updating feedback
router.put('/feedback/:id', async (req, res) => {
  const { review, improvement } = req.body;

  // Check if both fields are provided
  if (!review || !improvement) {
    return res.status(400).json({ message: 'Both review and improvement fields are required.' });
  }

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { review, improvement },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback updated successfully!', feedback });
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Error updating feedback' });
  }
});

// DELETE route for feedback
router.delete('/feedback/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ message: 'Feedback deleted successfully!' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Error deleting feedback' });
  }
});

module.exports = router;
