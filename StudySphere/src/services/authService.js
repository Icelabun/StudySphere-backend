import axiosInstance from '../utils/axiosInstance';

// ✅ Register User
export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/api/auth/register', userData);
  return response.data;
};

// ✅ Login User
export const loginUser = async (userData) => {
  const response = await axiosInstance.post('/api/auth/login', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// ✅ Logout User
export const logoutUser = async () => {
  await axiosInstance.post('/api/auth/logout');
  localStorage.removeItem('token');
};
