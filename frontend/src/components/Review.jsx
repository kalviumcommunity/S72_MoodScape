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
            <button >Back</button>
            </Link>
          </div>
        </div>
        
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="review">Your Review:</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="improvement">What can be improved:</label>
            <textarea
              id="improvement"
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
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
