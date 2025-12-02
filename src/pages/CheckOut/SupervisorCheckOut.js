import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SupervisorCheckOut = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [workReview, setWorkReview] = useState('');

  const handleVerify = () => {
    // Simulate facial recognition
    setTimeout(() => {
      setVerificationStatus('success');
    }, 1500);
  };

  const handleApprove = () => {
    console.log('Approved with review:', workReview);
    // Handle approval
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Supervisor Check-Out</h1>
        <p className="text-gray-600 mt-1">Verify work completion and approve check-out</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Identity Verification</h2>
          
          <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
            {verificationStatus === null && (
              <div className="text-center text-white">
                <p className="text-lg">Ready for facial scan</p>
              </div>
            )}
            {verificationStatus === 'success' && (
              <div className="text-center text-green-400">
                <CheckCircleIcon className="h-24 w-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">Verified</p>
              </div>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={verificationStatus !== null}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {verificationStatus === null ? 'Verify Identity' : 'Verified ✓'}
          </button>
        </div>

        {/* Work Review */}
        {verificationStatus === 'success' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Work Review</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tasks Completed Today
                </label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Wall construction - Section A</li>
                    <li>Equipment storage</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supervisor Review Comments
                </label>
                <textarea
                  value={workReview}
                  onChange={(e) => setWorkReview(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add comments about work quality and completion..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleApprove}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Approve Check-Out
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupervisorCheckOut;
