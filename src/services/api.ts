import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3010/api';

interface ApiErrorResponse {
  message: string;
  [key: string]: any;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
  if (error.response) {
    const message = error.response.data?.message || 'An error occurred';
    toast.error(message);
    throw new Error(message);
  } else if (error.request) {
    toast.error('No response from server. Please check your internet connection.');
    throw new Error('Network error');
  } else {
    toast.error('An unexpected error occurred');
    throw error;
  }
};

export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/signin', { email, password });
      const { token, user } = response.data;
      Cookies.set('token', token, { secure: true, sameSite: 'strict' });
      return user;
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
    }
  },

  signup: async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await api.post('/auth/signup', userData);
      const { user } = response.data;
      // Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
      return user;
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
    }
  },

  logout: async () => {
    try {
      Cookies.remove('token');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  },
};

// File upload API calls
export const fileAPI = {
  uploadFile: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ApiErrorResponse>);
    }
  },
};

export default api; 