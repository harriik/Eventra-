import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me')
};

// Events API
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  getByMainEvent: (mainEvent) => api.get(`/events/main/${encodeURIComponent(mainEvent)}`),
  create: (eventData) => api.post('/events', eventData),
  createSubEvent: (eventData) => api.post('/events/sub-events', eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`)
};

// Registrations API
export const registrationsAPI = {
  enroll: (eventId) => api.post('/registrations', { event_id: eventId }),
  getMyRegistrations: () => api.get('/registrations/my-registrations'),
  getEventParticipants: (eventId) => api.get(`/registrations/event/${eventId}/participants`),
  getAll: (params) => api.get('/registrations/all', { params })
};

// Attendance API
export const attendanceAPI = {
  mark: (registrationId, status) => api.post('/attendance/mark', { registration_id: registrationId, status }),
  getByEvent: (eventId) => api.get(`/attendance/event/${eventId}`)
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getEventStats: () => api.get('/admin/events/stats')
};

export default api;

