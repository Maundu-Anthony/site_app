import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  ShieldCheckIcon, 
  EnvelopeIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'View data, manage system, and configure settings',
      icon: ShieldCheckIcon,
      color: 'blue',
    },
    {
      id: 'supervisor',
      name: 'Supervisor',
      description: 'Capture biometrics and manage daily operations',
      icon: UserIcon,
      color: 'green',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, selectedRole);
      // Redirect based on role
      if (selectedRole === 'admin') {
        navigate('/');
      } else {
        navigate('/supervisor/daily-checkin');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        border: 'border-blue-300',
        bg: 'bg-blue-50',
        hover: 'hover:border-blue-500',
        selected: 'border-blue-600 bg-blue-100',
        icon: 'text-blue-600',
      },
      green: {
        border: 'border-green-300',
        bg: 'bg-green-50',
        hover: 'hover:border-green-500',
        selected: 'border-green-600 bg-green-100',
        icon: 'text-green-600',
      },
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <ShieldCheckIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Site Manager</h1>
          <p className="text-blue-100">Construction Site Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Select your role and sign in to continue</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Role *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => {
                  const colors = getColorClasses(role.color);
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`
                        p-4 border-2 rounded-xl text-left transition-all
                        ${isSelected 
                          ? `${colors.selected} shadow-md` 
                          : `${colors.border} ${colors.bg} ${colors.hover}`
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <role.icon className={`h-6 w-6 ${colors.icon} flex-shrink-0 mt-1`} />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{role.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                        </div>
                        {isSelected && (
                          <div className={`h-5 w-5 rounded-full ${colors.icon} flex items-center justify-center`}>
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Input */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedRole || loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold
                hover:bg-blue-700 transition-colors disabled:bg-gray-300 
                disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">
              Secure access to Site Manager System
            </p>
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have an account?
              </p>
              <div className="flex gap-3 justify-center">
                <Link 
                  to="/signup/admin" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Register as Admin
                </Link>
                <span className="text-gray-300">|</span>
                <Link 
                  to="/signup/supervisor" 
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Register as Supervisor
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <p className="text-center text-blue-100 text-sm mt-6">
          Version 1.0.0 | © 2025 Site Manager
        </p>
      </div>
    </div>
  );
};

export default Login;
