import React, { useState } from 'react';
import { CameraIcon, CheckCircleIcon, XCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const DailyCheckIn = () => {
  const [scanStatus, setScanStatus] = useState(null);
  const [currentWorker, setCurrentWorker] = useState(null);
  const [todayCheckIns, setTodayCheckIns] = useState([]);

  const handleScan = () => {
    setScanStatus('scanning');
    
    // Simulate facial recognition process
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (isSuccess) {
        const worker = {
          name: 'Worker Name',
          employeeId: 'EMP-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0'),
          role: 'Labourer',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        
        setCurrentWorker(worker);
        setScanStatus('success');
        
        // Add to today's check-ins
        setTodayCheckIns(prev => [
          { id: Date.now(), ...worker, status: 'success' },
          ...prev
        ]);
      } else {
        setScanStatus('denied');
      }
    }, 2000);
  };

  const handleNewScan = () => {
    setScanStatus(null);
    setCurrentWorker(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Daily Worker Check-In</h1>
          <p className="text-gray-600 mt-1">Capture facial biometrics for site access</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
          <p className="text-sm font-medium">Today's Check-Ins: {todayCheckIns.filter(c => c.status === 'success').length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Facial Recognition Scanner */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CameraIcon className="h-5 w-5 mr-2" />
              Facial Recognition Scanner
            </h2>

            {/* Camera Display */}
            <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
              {scanStatus === null && (
                <div className="text-center text-white">
                  <CameraIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Ready to scan</p>
                  <p className="text-sm text-gray-400 mt-2">Position worker's face within frame</p>
                </div>
              )}
              
              {scanStatus === 'scanning' && (
                <div className="text-center text-white">
                  <div className="animate-pulse">
                    <div className="h-32 w-32 mx-auto mb-4 border-4 border-blue-500 rounded-full flex items-center justify-center">
                      <CameraIcon className="h-16 w-16" />
                    </div>
                    <p className="text-xl font-semibold">Scanning...</p>
                    <p className="text-sm text-gray-400 mt-2">Please hold still</p>
                  </div>
                </div>
              )}
              
              {scanStatus === 'success' && currentWorker && (
                <div className="text-center text-green-400">
                  <CheckCircleIcon className="h-24 w-24 mx-auto mb-4" />
                  <p className="text-2xl font-bold">Access Granted</p>
                  <p className="text-lg mt-2">{currentWorker.name}</p>
                </div>
              )}
              
              {scanStatus === 'denied' && (
                <div className="text-center text-red-400">
                  <XCircleIcon className="h-24 w-24 mx-auto mb-4" />
                  <p className="text-2xl font-bold">Access Denied</p>
                  <p className="text-sm text-gray-400 mt-2">Worker not recognized or not authorized</p>
                </div>
              )}
            </div>

            {/* Worker Details */}
            {scanStatus === 'success' && currentWorker && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Check-In Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <p className="font-medium text-gray-900">{currentWorker.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Employee ID:</span>
                    <p className="font-medium text-gray-900">{currentWorker.employeeId}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Role:</span>
                    <p className="font-medium text-gray-900">{currentWorker.role}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Time:</span>
                    <p className="font-medium text-gray-900">{currentWorker.time}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <p className="font-medium text-green-600">Within Geofence ✓</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium text-green-600">Authorized ✓</p>
                  </div>
                </div>
              </div>
            )}

            {scanStatus === 'denied' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-red-900 mb-2">Access Denied</h3>
                <p className="text-sm text-red-700">
                  Worker not found in the system or not authorized for this site. 
                  Please verify identity and contact admin if needed.
                </p>
              </div>
            )}

            {/* Scan Instructions */}
            {scanStatus === null && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Ensure worker is within site geofence boundaries</li>
                  <li>Ask worker to remove any face coverings or protective gear</li>
                  <li>Position worker's face directly in front of camera</li>
                  <li>Ensure good lighting conditions</li>
                  <li>Ask worker to remain still during scanning</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {scanStatus === null && (
                <button
                  onClick={handleScan}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  Start Facial Scan
                </button>
              )}
              
              {(scanStatus === 'success' || scanStatus === 'denied') && (
                <button
                  onClick={handleNewScan}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  Scan Next Worker
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Today's Check-Ins List */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Today's Check-Ins
            </h2>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {todayCheckIns.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No check-ins yet today</p>
              ) : (
                todayCheckIns.map((worker) => (
                  <div
                    key={worker.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      worker.status === 'success' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{worker.name}</p>
                        <p className="text-xs text-gray-600">{worker.employeeId}</p>
                      </div>
                      {worker.status === 'success' ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{worker.time}</span>
                      <span className={`px-2 py-1 rounded-full font-medium ${
                        worker.status === 'success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {worker.status === 'success' ? 'Granted' : 'Denied'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Scans:</span>
                <span className="font-medium">{todayCheckIns.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Successful:</span>
                <span className="font-medium text-green-600">
                  {todayCheckIns.filter(c => c.status === 'success').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Denied:</span>
                <span className="font-medium text-red-600">
                  {todayCheckIns.filter(c => c.status === 'denied').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckIn;
