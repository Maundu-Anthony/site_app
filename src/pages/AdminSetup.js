import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheckIcon,
  KeyIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:5000';

const AdminSetup = () => {
  const [step, setStep] = useState(1); // 1: Enter OTP, 2: Set Password, 3: Complete
  const [otp, setOtp] = useState('');
  const [handoverData, setHandoverData] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Find handover record with matching OTP
      const response = await fetch(`${API_URL}/adminHandover?oneTimePassword=${otp}`);
      const handovers = await response.json();

      if (handovers.length === 0) {
        setError('Invalid OTP. Please check and try again.');
        setLoading(false);
        return;
      }

      const handover = handovers[0];

      // Check if expired
      if (new Date(handover.expiresAt) < new Date()) {
        setError('This OTP has expired. Please contact the current admin.');
        setLoading(false);
        return;
      }

      setHandoverData(handover);
      setStep(2);
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('An error occurred. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Get current admin
      const currentAdminResponse = await fetch(`${API_URL}/admin`);
      const currentAdmin = await currentAdminResponse.json();

      // Update current admin to inactive
      if (currentAdmin && currentAdmin.id) {
        await fetch(`${API_URL}/admin`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            isActive: false,
            deactivatedAt: new Date().toISOString(),
            replacedBy: handoverData.email
          }),
        });
      }

      // Create new admin account
      const newAdminData = {
        id: 'admin-001',
        email: handoverData.email,
        password: password,
        name: handoverData.name,
        role: 'admin',
        phone: handoverData.phone,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        isActive: true,
        previousAdmin: currentAdmin?.email || null
      };

      await fetch(`${API_URL}/admin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdminData),
      });

      // Delete handover record
      await fetch(`${API_URL}/adminHandover/${handoverData.id}`, {
        method: 'DELETE',
      });

      setStep(3);
    } catch (err) {
      console.error('Setup error:', err);
      setError('An error occurred during setup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <ShieldCheckIcon className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Setup</h1>
          <p className="text-blue-100">Complete your administrator account setup</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Step 1: Enter OTP */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your OTP</h2>
              <p className="text-gray-600 mb-6">Enter the one-time password provided by the current admin</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    One-Time Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <KeyIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.toUpperCase())}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg tracking-wider"
                      placeholder="Enter 8-character OTP"
                      maxLength="8"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 8}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Set Password */}
          {step === 2 && handoverData && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Password</h2>
              <p className="text-gray-600 mb-6">Create a secure password for your admin account</p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Welcome, {handoverData.name}!</strong><br />
                  Setting up account for: {handoverData.email}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password *
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
                      placeholder="Min. 6 characters"
                      required
                    />
                  </div>
                </div>

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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? 'Setting Up Account...' : 'Complete Setup'}
                </button>
              </form>
            </>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <CheckCircleIcon className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
              <p className="text-gray-600 mb-6">
                Your admin account has been created successfully
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  The previous admin account has been deactivated.<br />
                  You now have full administrative access.
                </p>
              </div>

              <button
                onClick={() => navigate('/login')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-blue-100 text-sm mt-6">
          Version 1.0.0 | © 2025 Site Manager
        </p>
      </div>
    </div>
  );
};

export default AdminSetup;
