import React, { useState } from 'react';
import { ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const FinalCheckOut = () => {
  const [scanStatus, setScanStatus] = useState(null);

  const handleFinalScan = () => {
    setTimeout(() => {
      setScanStatus('success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Final Check-Out</h1>
        <p className="text-gray-600 mt-1">Security guard final verification and site exit</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Final Verification */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Final Identity Verification</h2>
          
          <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
            {scanStatus === null && (
              <div className="text-center text-white">
                <p className="text-lg">Ready for final facial scan</p>
              </div>
            )}
            {scanStatus === 'success' && (
              <div className="text-center text-green-400">
                <CheckCircleIcon className="h-24 w-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">Check-Out Complete</p>
              </div>
            )}
          </div>

          <button
            onClick={handleFinalScan}
            disabled={scanStatus !== null}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {scanStatus === null ? 'Complete Final Check-Out' : 'Check-Out Complete ✓'}
          </button>
        </div>

        {/* Summary */}
        {scanStatus === 'success' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <ClockIcon className="h-5 w-5 inline mr-2" />
              Work Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Check-In Time:</span>
                <span className="font-medium">08:15 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-Out Time:</span>
                <span className="font-medium">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Hours:</span>
                <span className="font-medium">8.5 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Overtime:</span>
                <span className="font-medium text-orange-600">0.5 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Supervisor Approval:</span>
                <span className="font-medium text-green-600">Approved ✓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalCheckOut;
