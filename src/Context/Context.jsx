import axiosInstance from "../Services/interceptor.js";
import Swal from 'sweetalert2';
import React, { useState, createContext, useEffect, useCallback } from "react";

export const AuthContext = createContext();

function Context({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const checkAuthenticated = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get('/verify');
      console.log(response,"RES");
      
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Token verification error:', error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAuthData = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/user-login', { email, password });
      
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        await Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          timer: 5000,
          position: 'top-center',
        });
        return true;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      await Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        timer: 5000,
        position: 'top-center',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/logout');
      
      if (response.data.success) {
        clearAuthData();
        await Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          timer: 5000,
          position: 'top-center',
        });
        window.location.href = '/user-login';
      } else {
        throw new Error(response.data.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to logout properly',
        icon: 'error',
        timer: 5000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      login, 
      logout, 
      user, 
      setUser, 
      isAuthenticated: !!user, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Context;