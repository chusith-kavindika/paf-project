import axios from 'axios';

const API_URL = 'http://localhost:8080/api/workplans'; // Ensure this matches the backend URL

export const getAllWorkplans = () => axios.get(API_URL);
export const getWorkplanById = (id) => axios.get(`${API_URL}/${id}`);
export const createWorkplan = (workplan) => axios.post(API_URL, workplan);
export const updateWorkplan = (id, workplan) => axios.put(`${API_URL}/${id}`, workplan);
export const deleteWorkplan = (id) => axios.delete(`${API_URL}/${id}`);
export const getCompletedWorkplans = () => axios.get(`${API_URL}/completed`);
export const getPendingWorkplans = () => axios.get(`${API_URL}/pending`);
export const markWorkplanAsCompleted = (id) => axios.patch(`${API_URL}/${id}/complete`);
