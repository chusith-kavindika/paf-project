// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkplanList from './components/WorkplanList';
import WorkplanForm from './components/WorkplanForm';
import Sidebar from './components/Sidebar'; // Import Sidebar

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Add Sidebar */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<WorkplanList />} />
            <Route path="/workplans/new" element={<WorkplanForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;