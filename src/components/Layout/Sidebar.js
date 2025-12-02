import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HomeIcon, 
  UserGroupIcon, 
  CheckCircleIcon, 
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/',
      icon: HomeIcon,
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: UserGroupIcon,
      subItems: [
        { name: 'Project Setup', path: '/admin/project-setup' },
        { name: 'Role Configuration', path: '/admin/roles' },
        { name: 'Supervisor Management', path: '/admin/supervisors' },
        { name: 'Admin Handover', path: '/admin/handover' },
        { name: 'System Settings', path: '/admin/settings' },
      ]
    },
    {
      id: 'checkin',
      name: 'Check-In',
      path: '/checkin',
      icon: CheckCircleIcon,
    },
    {
      id: 'tasks',
      name: 'Task Assignment',
      path: '/tasks',
      icon: ClipboardDocumentListIcon,
    },
    {
      id: 'checkout',
      name: 'Check-Out',
      icon: ArrowRightOnRectangleIcon,
      subItems: [
        { name: 'Supervisor Check-Out', path: '/checkout/supervisor' },
        { name: 'Final Check-Out', path: '/checkout/final' },
      ]
    },
  ];

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isModuleActive = (subItems) => {
    return subItems?.some(item => location.pathname === item.path);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white shadow-lg"
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col h-screen
        `}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-blue-400">Site Manager</h1>
          <p className="text-xs text-gray-400 mt-1">Construction Site Management</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  // Module with submodules
                  <div>
                    <button
                      onClick={() => toggleModule(item.id)}
                      className={`
                        w-full flex items-center justify-between p-3 rounded-lg
                        transition-colors duration-200
                        ${isModuleActive(item.subItems) 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-800 text-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <svg
                        className={`h-5 w-5 transition-transform duration-200 ${
                          expandedModule === item.id ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Submodules */}
                    {expandedModule === item.id && (
                      <ul className="mt-2 ml-4 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              onClick={() => setIsOpen(false)}
                              className={`
                                block p-2 pl-8 rounded-lg text-sm
                                transition-colors duration-200
                                ${isActive(subItem.path)
                                  ? 'bg-blue-500 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }
                              `}
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Simple module without submodules
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg
                      transition-colors duration-200
                      ${isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          {user && (
            <div className="text-xs text-gray-400">
              <p className="font-medium text-white">{user.name}</p>
              <p className="mt-1 capitalize">{user.role}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
          <div className="text-xs text-gray-400">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2025 Site Manager</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
