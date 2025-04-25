// eslint-disable-next-line
// PpUTsgOGQPrbWB6K
import '../styles/Home.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // Import styled-components
import { Link } from 'react-router-dom';

function LandingPage() {
  const [selectedOption, setSelectedOption] = useState("Choose Your mood");
  const [backgroundColor, setBackgroundColor] = useState("#242424");
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername('');
    setIsMenuOpen(false);
  };

  const handleOptionChange = (event) => {
    const data = event.target.getAttribute('data-txt');         
    setSelectedOption(data);
    if(data=="Happy/Excited: 🥳"){
      setBackgroundColor("#ffeb3b");
    } else if(data=="Sad/Lonely: 😔"){  
      setBackgroundColor("#f44336");
    } else if(data=="Angry/Frustrated: 😠"){
      setBackgroundColor("#e91e63");
    } 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledWrapper backgroundColor={backgroundColor}>
      <div className="menu-container">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
        </div>

        <div className={`menu-dropdown ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          {username && username.trim() !== '' ? (
            <>
              <Link to="/review-form">
                <button>Review Us</button>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/review-form">
              <button>Review Us</button>
            </Link>
          )}
        </div>

        <div className="auth-buttons">
          {!username && (
            <>
              <Link to="/login">
                <button className="auth-button">Login</button>
              </Link>
              <Link to="/signup">
                <button className="auth-button">Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="main-container">
        <h1>Welcome to Moodscapes</h1>
        {username && username.trim() !== '' && <p className="username-display">Hello, <strong>{username}</strong> 👋</p>}
        <div className="select">
          <div className="selected">
            {selectedOption}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="arrow"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
          <div className="options">
            <div title="all">
              <input
                id="all"
                name="option"
                type="radio"
                defaultChecked
                onChange={handleOptionChange}
                data-txt="Choose your mood"
              />
              <label className="option" htmlFor="all">
                Choose your mood
              </label>
            </div>
            <div title="option-1">
              <input
                id="option-1"
                name="option"
                type="radio"
                onChange={handleOptionChange}
                data-txt="Happy/Excited: 🥳"
              />
              <label className="option" htmlFor="option-1">
              Happy/Excited: 🥳
              </label>
            </div>
            <div title="option-2">
              <input
                id="option-2"
                name="option"
                type="radio"
                onChange={handleOptionChange}
                data-txt="Sad/Lonely: 😔"
              />
              <label className="option" htmlFor="option-2">
              Sad/Lonely: 😔
              </label>
            </div>
            <div title="option-3">
              <input
                id="option-3"
                name="option"
                type="radio"
                onChange={handleOptionChange}
                data-txt="Angry/Frustrated: 😠"
              />
              <label className="option" htmlFor="option-3">
              Angry/Frustrated: 😠
              </label>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;
  z-index: -1;

  .menu-container {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
  }

  .auth-buttons {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    z-index: 1000;
  }

  .auth-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;


export default LandingPage;
