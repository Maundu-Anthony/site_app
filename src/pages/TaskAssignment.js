import React, { useState } from 'react';
import { ClipboardDocumentListIcon, UserIcon } from '@heroicons/react/24/outline';

const TaskAssignment = () => {
  const [selectedLabourer, setSelectedLabourer] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const labourers = [
    { id: 1, name: 'John Doe', role: 'Mason', status: 'Available' },
    { id: 2, name: 'Jane Smith', role: 'Carpenter', status: 'On Task' },
    { id: 3, name: 'Mike Johnson', role: 'Labourer', status: 'Available' },
  ];

  const handleAssign = (e) => {
    e.preventDefault();
    console.log('Assigning task to:', selectedLabourer, taskDescription);
    // Handle task assignment
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Task Assignment</h1>
        <p className="text-gray-600 mt-1">Assign tasks to checked-in labourers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Assignment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <ClipboardDocumentListIcon className="h-5 w-5 inline mr-2" />
              New Task Assignment
            </h2>
            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Labourer *
                </label>
                <select
                  value={selectedLabourer}
                  onChange={(e) => setSelectedLabourer(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a labourer...</option>
                  {labourers.filter(l => l.status === 'Available').map(labourer => (
                    <option key={labourer.id} value={labourer.id}>
                      {labourer.name} - {labourer.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Description *
                </label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the task in detail..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Duration (hours)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Available Labourers */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <UserIcon className="h-5 w-5 inline mr-2" />
              Available Labourers
            </h2>
            <div className="space-y-3">
              {labourers.map(labourer => (
                <div
                  key={labourer.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{labourer.name}</p>
                      <p className="text-sm text-gray-600">{labourer.role}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      labourer.status === 'Available' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {labourer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignment;
