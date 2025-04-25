import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
  const [username, setUsername] = useState('');
  const [backgroundColor, setBackgroundColor] = useState("#242424");

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