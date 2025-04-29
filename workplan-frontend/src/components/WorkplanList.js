// src/components/WorkplanList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllWorkplans,
  deleteWorkplan,
  markWorkplanAsCompleted,
} from '../services/workplanService'; // Use named exports
import '../styles/WorkplanList.css';

const WorkplanList = () => {
  const [workplans, setWorkplans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkplans = async () => {
      try {
        const response = await getAllWorkplans(); // Use named export
        setWorkplans(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch workplans');
        setLoading(false);
        console.error('Error fetching workplans:', err);
      }
    };

    fetchWorkplans();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workplan?')) {
      try {
        await deleteWorkplan(id); // Use named export
        setWorkplans(workplans.filter(workplan => workplan.id !== id));
      } catch (err) {
        console.error('Error deleting workplan:', err);
        alert('Failed to delete the workplan');
      }
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await markWorkplanAsCompleted(id); // Use named export
      setWorkplans(workplans.map(workplan => 
        workplan.id === id ? response.data : workplan
      ));
    } catch (err) {
      console.error('Error completing workplan:', err);
      alert('Failed to mark workplan as completed');
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="workplan-list">
      <div className="workplan-list-header">
        <h2>All Workplans</h2>
        <Link to="/workplans/new" className="btn btn-primary">Create New Workplan</Link>
      </div>
      
      {workplans.length === 0 ? (
        <div className="alert alert-info">No workplans found. Create your first workplan!</div>
      ) : (
        <div className="workplan-grid">
          {workplans.map(workplan => (
            <div key={workplan.id} className="workplan-card">
              <h3>{workplan.title}</h3>
              <p>{workplan.description}</p>
              <button onClick={() => handleComplete(workplan.id)} className="btn btn-success">Complete</button>
              <button onClick={() => handleDelete(workplan.id)} className="btn btn-danger">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkplanList;