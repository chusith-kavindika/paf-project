// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkplanList from './components/WorkplanList';
import WorkplanForm from './components/WorkplanForm';

import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
       
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