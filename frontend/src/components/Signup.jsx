import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    const signupData = { username, password };
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('username', username);
        setSuccessMessage(data.message);
        navigate('/');
      } else {
        // Handle different types of error responses
        if (data.error === 'Missing required fields') {
          setError('Please fill in all fields.');
        } else if (data.error === 'Validation failed' && data.details.password) {
          setError(data.details.password);
        } else if (data.error === 'Username already taken') {
          setError('Username is already taken. Please choose another one.');
        } else {
          setError(data.error || 'An error occurred during signup.');
        }
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error('Error during signup:', err);
    }
  };
  

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
