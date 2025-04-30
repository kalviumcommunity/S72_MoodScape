const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  password: { 
    type: String, 
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
  }
});

const feedbackSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'Review must be at least 10 characters long'],
    maxlength: [500, 'Review cannot exceed 500 characters']
  },
  improvement: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'Improvement suggestion must be at least 10 characters long'],
    maxlength: [500, 'Improvement suggestion cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = { User, Feedback };
