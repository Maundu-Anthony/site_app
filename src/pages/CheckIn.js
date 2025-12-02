import React, { useState } from 'react';
import { CameraIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const CheckIn = () => {
  const [scanStatus, setScanStatus] = useState(null);

  const handleScan = () => {
    // Simulate facial recognition
    setTimeout(() => {
      setScanStatus('success');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Labourer Check-In</h1>
        <p className="text-gray-600 mt-1">Facial recognition and access verification</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Camera Interface */}
          <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
            {scanStatus === null && (
              <div className="text-center text-white">
                <CameraIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Position face within frame</p>
              </div>
            )}
            {scanStatus === 'success' && (
              <div className="text-center text-green-400">
                <CheckCircleIcon className="h-24 w-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">Access Granted</p>
              </div>
            )}
            {scanStatus === 'denied' && (
              <div className="text-center text-red-400">
                <XCircleIcon className="h-24 w-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">Access Denied</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Ensure you are within the site geofence</li>
              <li>Remove any face coverings</li>
              <li>Look directly at the camera</li>
              <li>Hold still during scanning</li>
            </ul>
          </div>

          {/* Action Button */}
          <button
            onClick={handleScan}
            disabled={scanStatus !== null}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
          >
            {scanStatus === null ? 'Start Facial Scan' : 'Scan Complete'}
          </button>

          {scanStatus && (
            <button
              onClick={() => setScanStatus(null)}
              className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              New Check-In
            </button>
          )}
        </div>

        {/* Recent Check-Ins */}
        {scanStatus === 'success' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Check-In Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Employee ID:</span>
                <span className="font-medium">EMP-12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium text-green-600">Within Geofence ✓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckIn;
