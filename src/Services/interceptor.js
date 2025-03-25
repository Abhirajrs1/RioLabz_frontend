import axios from "axios";
import Swal from 'sweetalert2';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // You can modify successful responses here if needed
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Swal.fire({
            title: 'Session Expired',
            text: 'Please login again',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/user-login';
          });
          break;
          
        case 403:
          Swal.fire({
            title: 'Forbidden',
            text: 'You dont have permission to access this resource',
            icon: 'warning'
          });
          break;
          
        case 404:
          Swal.fire({
            title: 'Not Found',
            text: 'The requested resource was not found',
            icon: 'warning'
          });
          break;
          
        case 500:
          Swal.fire({
            title: 'Server Error',
            text: 'Something went wrong on our server',
            icon: 'error'
          });
          break;
          
        default:
          Swal.fire({
            title: 'Error',
            text: error.response.data?.message || 'An error occurred',
            icon: 'error'
          });
      }
    } else if (error.request) {
      // The request was made but no response was received
      Swal.fire({
        title: 'Network Error',
        text: 'Please check your internet connection',
        icon: 'error'
      });
    } else {
      // Something happened in setting up the request
      console.error('Axios Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;