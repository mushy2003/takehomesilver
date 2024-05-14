import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import PricesPage from './pages/pricespage';
import Layout from './layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/prices" element={<PricesPage />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;

