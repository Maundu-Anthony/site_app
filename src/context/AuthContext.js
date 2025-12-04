import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5000';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      let authenticatedUser = null;

      if (role === 'admin') {
        // Fetch admin from database
        const response = await fetch(`${API_URL}/admin`);
        const admin = await response.json();
        
        // Check if admin account is active
        if (admin.isActive === false) {
          throw new Error('This admin account has been deactivated. Access denied.');
        }
        
        // Verify email and password
        if (admin.email === email && admin.password === password) {
          authenticatedUser = {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
            phone: admin.phone,
          };
        }
      } else if (role === 'supervisor') {
        // Fetch supervisors from database
        const response = await fetch(`${API_URL}/supervisors`);
        const supervisors = await response.json();
        
        // Find supervisor by email first
        const supervisor = supervisors.find(
          sup => sup.email === email && sup.isActive
        );
        
        if (supervisor) {
          // Verify password
          if (supervisor.password === password) {
            authenticatedUser = {
              id: supervisor.id,
              email: supervisor.email,
              name: supervisor.name,
              role: supervisor.role,
              phone: supervisor.phone,
              assignedProjects: supervisor.assignedProjects,
            };
          }
        }
      }

      if (!authenticatedUser) {
        throw new Error('Invalid credentials');
      }

      // Update last login time
      const now = new Date().toISOString();
      if (role === 'admin') {
        await fetch(`${API_URL}/admin`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lastLogin: now }),
        });
      } else {
        await fetch(`${API_URL}/supervisors/${authenticatedUser.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lastLogin: now }),
        });
      }

      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      return authenticatedUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin: user?.role === 'admin',
    isSupervisor: user?.role === 'supervisor',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
