import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/Home'; // Assuming Home component is your landing page
import ReviewForm from './components/Review'; // Assuming Review is the review form page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/review-form" element={<ReviewForm />} />
      </Routes>
    </Router>
  );
}

export default App;
