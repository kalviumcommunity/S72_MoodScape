import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/Home'; // Assuming Home component is your landing page
import ReviewForm from './components/Review'; // Assuming Review is the review form page
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/review-form" element={<ReviewForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
