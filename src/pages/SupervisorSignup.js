import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { hashPassword } from '../utils/passwordUtils';

const API_URL = 'http://localhost:5000';

const SupervisorSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateSupervisorId = async () => {
    try {
      const response = await fetch(`${API_URL}/supervisors`);
      const supervisors = await response.json();
      const count = supervisors.length + 1;
      return `sup-${String(count).padStart(3, '0')}`;
    } catch (err) {
      return `sup-${String(Date.now()).slice(-3)}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Check total number of supervisors (limit to 2)
      const allSupervisorsResponse = await fetch(`${API_URL}/supervisors`);
      const allSupervisors = await allSupervisorsResponse.json();
      
      if (allSupervisors.length >= 2) {
        setError('Maximum number of supervisor accounts (2) has been reached. Please contact the administrator.');
        setLoading(false);
        return;
      }

      // Check if email already exists
      const checkResponse = await fetch(`${API_URL}/supervisors?email=${formData.email}`);
      const existingSupervisors = await checkResponse.json();
      
      if (existingSupervisors.length > 0) {
        setError('Email already registered. Please use a different email.');
        setLoading(false);
        return;
      }

      // Generate supervisor ID
      const supervisorId = await generateSupervisorId();

      // Hash the password before storing
      const hashedPassword = await hashPassword(formData.password);

      // Create supervisor account
      const supervisorData = {
        id: supervisorId,
        email: formData.email,
        password: hashedPassword,
        name: formData.name,
        role: 'supervisor',
        phone: formData.phone,
        assignedProjects: [],
        createdAt: new Date().toISOString(),
        lastLogin: null,
        isActive: true
      };

      const response = await fetch(`${API_URL}/supervisors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supervisorData),
      });

      if (response.ok) {
        alert('Supervisor account created successfully! Please login.');
        navigate('/login');
      } else {
        setError('Failed to create supervisor account. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <UserIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Supervisor Registration</h1>
          <p className="text-green-100">Create your supervisor account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Register as Supervisor</h2>
          <p className="text-gray-600 mb-6">Fill in your details to create an account</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <ExclamationCircleIcon className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="supervisor@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+254 xxx xxx xxx"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Min. 6 characters"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold
                hover:bg-green-700 transition-colors disabled:bg-gray-300 
                disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Creating Account...' : 'Create Supervisor Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Version Info */}
        <p className="text-center text-green-100 text-sm mt-6">
          Version 1.0.0 | © 2025 Site Manager
        </p>
      </div>
    </div>
  );
};

export default SupervisorSignup;
