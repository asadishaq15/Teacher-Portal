import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001', 
});

// Request interceptor to add JWT token to requests
// ...

// Response interceptor to handle authentication errors
// ...

// Function to get all teacher profiles
export const getTeacherProfiles = async () => {
    try {
        const response = await api.get('/teachers/profiles');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch teacher profiles');
    }
};

// Function to submit a transfer request
export const submitTransferRequest = async (formData) => {
    try {
        const response = await api.post('/teachers/transfer-request', formData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to submit transfer request');
    }
};

// Function to process pending transfer requests (if needed)
export const processTransferRequests = async () => {
    try {
        const response = await api.get('/teachers/process-transfer-requests');
        return response.data;
    } catch (error) {
        throw new Error('Failed to process transfer requests');
    }
};

// Function to fetch all transfer requests
export const getTransferRequests = async () => {
    try {
        const response = await api.get('/teachers/transfer-requests');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch transfer requests');
    }
};

// Function to accept a transfer request
export const acceptTransferRequest = async (requestId) => {
    try {
        const response = await api.put(`/teachers/transfer-requests/${requestId}/accept`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to accept transfer request');
    }
};

// Function to reject a transfer request
export const rejectTransferRequest = async (requestId) => {
    try {
        const response = await api.put(`/teachers/transfer-requests/${requestId}/reject`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to reject transfer request');
    }
};

export default api;