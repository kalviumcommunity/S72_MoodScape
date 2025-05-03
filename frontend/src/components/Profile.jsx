import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const [username, setUsername] = useState('');
  const [backgroundColor, setBackgroundColor] = useState("#242424");
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      title: "Great Experience",
      content: "The app helped me track my mood patterns effectively.",
      rating: 5,
      date: "2024-04-25"
    },
    {
      id: 2,
      title: "User-Friendly Interface",
      content: "The interface is intuitive and easy to navigate.",
      rating: 4,
      date: "2024-04-20"
    },
    {
      id: 3,
      title: "Helpful Insights",
      content: "The mood analysis feature provides valuable insights into my emotional well-being.",
      rating: 5,
      date: "2024-04-15"
    }
  ]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>{username ? `Welcome ${username}!` : 'Welcome User!'}</h1>
        <div className="profile-info">
          {username ? (
            <p>This is your profile page where you can manage your account and preferences.</p>
          ) : (
            <p>You are not logged in. Please log in to access your profile.</p>
          )}
        </div>
        
        <div className="feedback-section">
          <h2>Your Feedback</h2>
          <div className="feedback-list">
            {feedback.map((item) => (
              <div key={item.id} className="feedback-item">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <div className="feedback-meta">
                  <span className="rating">Rating: {item.rating}/5</span>
                  <span className="date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/">
            <button>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile; 