import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout - server might be down');
      return Promise.reject(new Error('Server is not responding. Please try again later.'));
    }

    if (!error.response) {
      console.error('Network error - no response received');
      return Promise.reject(new Error('Unable to connect to the server. Please check your internet connection.'));
    }

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }

    return Promise.reject(error);
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await axiosInstance.get('/health');
    console.log('✅ Successfully connected to backend API');
  } catch (error) {
    if (!error.response) {
      console.error('❌ Backend server is not running. Please start the server at', API_URL);
    } else {
      console.error('❌ Failed to connect to backend API:', error.message);
    }
  }
};

// Test connection on startup
testConnection();

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error; // Propagate the error for further handling
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', userData);
    // Save token in localStorage or handle cookies if needed
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Propagate the error for further handling
  }
};

export default axiosInstance;
