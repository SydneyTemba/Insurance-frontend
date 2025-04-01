import axios from "axios";

// Backend API URL
const API_URL = "http://127.0.0.1:8000/api/policies/";

// Fetch all policies
export const getPolicies = () => axios.get(API_URL);

// Create a new policy
export const createPolicy = (data) => axios.post(API_URL, data);

// Update an existing policy
export const updatePolicy = (id, data) => axios.put(`${API_URL}${id}/`, data);

// Delete a policy
export const deletePolicy = (id) => axios.delete(`${API_URL}${id}/`);
