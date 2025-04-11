import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import '../styles/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // In a real application, you would send this data to your backend for login
    const loginData = {
      username: username,
      password: password,
    };

    console.log('Logging in with:', loginData);

    // For this example, we'll just clear the form
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      {error && <p className="login-error">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="login-signup-link">
        do not have an account?{' '}
        <Link to="/signup" className="signup-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
