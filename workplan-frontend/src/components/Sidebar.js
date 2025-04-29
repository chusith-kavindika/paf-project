import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Workplan Manager</h2>
      <ul>
        <li>
          <Link to="/">Workplan List</Link>
        </li>
        <li>
          <Link to="/workplans/new">Create Workplan</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
