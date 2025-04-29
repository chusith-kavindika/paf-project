// src/components/WorkplanForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getWorkplanById,
  createWorkplan,
  updateWorkplan,
} from '../services/workplanService'; // Use named exports
import '../styles/WorkplanForm.css';

const WorkplanForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    createdBy: 1, // Default user ID, you might want to get this from auth context
    completed: false
  });
  
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkplan = async () => {
      if (isEditMode) {
        try {
          const response = await getWorkplanById(id); // Use named export
          const workplan = response.data;
          
          // Format dates for form inputs (YYYY-MM-DD)
          setFormData({
            ...workplan,
            startDate: workplan.startDate ? workplan.startDate.split('T')[0] : '',
            endDate: workplan.endDate ? workplan.endDate.split('T')[0] : ''
          });
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch workplan details');
          setLoading(false);
          console.error('Error fetching workplan:', err);
        }
      }
    };

    fetchWorkplan();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateWorkplan(id, formData); // Use named export
      } else {
        await createWorkplan(formData); // Use named export
      }
      navigate('/');
    } catch (err) {
      setError('Failed to save workplan');
      console.error('Error saving workplan:', err);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="workplan-form-container">
      <div className="workplan-form-header">
        <h2>{isEditMode ? 'Edit Workplan' : 'Create New Workplan'}</h2>
      </div>
      <div className="workplan-form-body">
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title *</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="completed">Mark as Completed</label>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Update Workplan' : 'Create Workplan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkplanForm;