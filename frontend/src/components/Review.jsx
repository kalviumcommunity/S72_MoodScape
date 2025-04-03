import React, { useState } from 'react';
import '../styles/Review.css';
import { Link } from 'react-router-dom';

const ReviewForm = () => {
  // State variables to store user input
  const [review, setReview] = useState('');
  const [improvement, setImprovement] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Function to handle editing the feedback
  const handleEdit = () => {
    setSubmitted(false); // Reset submitted state to allow editing
    // We do NOT clear review or improvement here so the previous values are retained
  };

  return (
    <div className="review-form">
      <h2>We Value Your Feedback!</h2>

      {submitted ? (
        <div className="thank-you-message">
          <h3>Thank you for your feedback!</h3>
          <p><strong>Review:</strong> {review}</p>
          <p><strong>What can be improved:</strong> {improvement}</p>
          <div>
            <Link to="/">
              <button>Back</button>
            </Link>
            <button onClick={handleEdit}>Edit</button> {/* This will trigger the handleEdit function */}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="review">Your Review:</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)} // Keeps the entered value
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="improvement">What can be improved:</label>
            <textarea
              id="improvement"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)} // Keeps the entered value
              required
            />
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
