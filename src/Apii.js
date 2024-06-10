import axios from 'axios';

const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the Authorization header if an authToken is present in local storage
api.interceptors.request.use(config => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
}, error => Promise.reject(error));

export const fetchConversations = () => api.get('/conversation');

export const fetchConversationMessages = (conversation_id) => api.get(`/conversation/${conversation_id}`);

export const createConversation = () => api.post('/conversation');

export const deleteConversation = (conversation_id) => api.delete(`/conversation/${conversation_id}`);

export const sendMessage = (conversation_id, message) => api.post('/chat', { conversation_id, message });

export default api;
