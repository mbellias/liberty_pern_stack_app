import axios from 'axios';
import BASE_URL from '../config';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const authService = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/api/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
