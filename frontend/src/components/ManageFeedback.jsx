import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ManageFeedback.css';

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [review, setReview] = useState('');
  const [improvement, setImprovement] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError('Error fetching feedbacks');
    }
  };

  const handleEdit = (feedback) => {
    setSelectedFeedback(feedback);
    setReview(feedback.review);
    setImprovement(feedback.improvement);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`http://localhost:5000/api/feedback/${selectedFeedback._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review, improvement }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Feedback updated successfully!');
        setSelectedFeedback(null);
        setReview('');
        setImprovement('');
        fetchFeedbacks();
      } else {
        setError(data.message || 'Error updating feedback');
      }
    } catch (error) {
      setError('Error updating feedback');
      console.error('Error updating feedback:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/feedback/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setSuccessMessage('Feedback deleted successfully!');
          fetchFeedbacks();
        } else {
          const data = await response.json();
          setError(data.message || 'Error deleting feedback');
        }
      } catch (error) {
        setError('Error deleting feedback');
        console.error('Error deleting feedback:', error);
      }
    }
  };

  return (
    <div className="manage-feedback-container">
      <h1>Manage Feedback</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {selectedFeedback ? (
        <div className="edit-form">
          <h2>Edit Feedback</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="improvement">Improvement:</label>
              <textarea
                id="improvement"
                value={improvement}
                onChange={(e) => setImprovement(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="update-btn">Update</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setSelectedFeedback(null);
                  setReview('');
                  setImprovement('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="feedback-list">
          <h2>All Feedback</h2>
          {feedbacks.length === 0 ? (
            <p>No feedback found</p>
          ) : (
            <div className="feedback-items">
              {feedbacks.map((feedback) => (
                <div key={feedback._id} className="feedback-item">
                  <div className="feedback-content">
                    <p><strong>Review:</strong> {feedback.review}</p>
                    <p><strong>Improvement:</strong> {feedback.improvement}</p>
                    <p className="feedback-date">
                      Created: {new Date(feedback.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="feedback-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(feedback)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(feedback._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="navigation-buttons">
        <Link to="/">
          <button className="back-btn">Back to Home</button>
        </Link>
        <Link to="/review-form">
          <button className="add-btn">Add New Feedback</button>
        </Link>
      </div>
    </div>
  );
};

export default ManageFeedback; 