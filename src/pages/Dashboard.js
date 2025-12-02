import React, { useState } from 'react';
import {
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const stats = [
    {
      name: 'Total Registered Workers',
      value: '0',
      icon: UserGroupIcon,
      change: 'No workers yet',
      changeType: 'neutral',
      color: 'blue'
    },
    {
      name: 'Checked In Today',
      value: '0',
      icon: CheckCircleIcon,
      change: '0% attendance',
      changeType: 'neutral',
      color: 'green'
    },
    {
      name: 'Currently On Site',
      value: '0',
      icon: ClockIcon,
      change: '0 checked out',
      changeType: 'neutral',
      color: 'purple'
    },
    {
      name: 'Access Denied Today',
      value: '0',
      icon: XCircleIcon,
      change: 'No denials',
      changeType: 'neutral',
      color: 'red'
    },
    {
      name: 'Total Overtime (Today)',
      value: '0 hrs',
      icon: ChartBarIcon,
      change: 'No overtime',
      changeType: 'neutral',
      color: 'yellow'
    },
    {
      name: 'Pending Approvals',
      value: '0',
      icon: ExclamationTriangleIcon,
      change: 'All clear',
      changeType: 'neutral',
      color: 'orange'
    }
  ];

  // Empty arrays - will be populated from database
  const todayCheckIns = [];
  const accessDeniedLogs = [];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'on-site': { color: 'bg-green-100 text-green-700', label: 'On Site' },
      'checked-out': { color: 'bg-gray-100 text-gray-700', label: 'Checked Out' },
      'denied': { color: 'bg-red-100 text-red-700', label: 'Access Denied' }
    };
    return statusConfig[status] || statusConfig['on-site'];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time overview of site activities and worker data</p>
        </div>
        
        {/* Date Selector */}
        <div className="flex items-center space-x-3">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.changeType === 'increase' ? 'text-green-600' : 
                  stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Check-Ins Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Today's Worker Activity</h2>
              <p className="text-sm text-gray-600 mt-1">Real-time check-in and check-out data</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <EyeIcon className="h-5 w-5" />
              <span>View Details</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {todayCheckIns.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No check-ins recorded today
                  </td>
                </tr>
              ) : (
                todayCheckIns.map((worker) => {
                  const statusBadge = getStatusBadge(worker.status);
                  return (
                    <tr key={worker.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{worker.name}</div>
                          <div className="text-sm text-gray-500">{worker.employeeId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {worker.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {worker.checkInTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {worker.checkOutTime || <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {worker.hoursWorked ? (
                          <div>
                            <span className="text-gray-900">{worker.hoursWorked}h</span>
                            {worker.overtime && (
                              <span className="text-orange-600 ml-1">({worker.overtime}h OT)</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {worker.supervisor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Access Denied Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Access Denied Logs</h2>
          <p className="text-sm text-gray-600 mt-1">Review and acknowledge denied access attempts</p>
        </div>
        <div className="divide-y divide-gray-200">
          {accessDeniedLogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No access denied logs today
            </div>
          ) : (
            accessDeniedLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 lg:p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <XCircleIcon className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">{log.name}</p>
                        <p className="text-sm text-gray-600">{log.employeeId} • {log.time} • {log.location}</p>
                        <p className="text-sm text-red-600 mt-1">Reason: {log.reason}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {log.acknowledged ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Acknowledged
                      </span>
                    ) : (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
