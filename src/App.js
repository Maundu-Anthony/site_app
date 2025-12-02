import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminSignup from './pages/AdminSignup';
import SupervisorSignup from './pages/SupervisorSignup';
import AdminSetup from './pages/AdminSetup';
import MainLayout from './components/Layout/MainLayout';
import SupervisorLayout from './components/Layout/SupervisorLayout';
import Dashboard from './pages/Dashboard';
import ProjectSetup from './pages/Admin/ProjectSetup';
import RoleConfiguration from './pages/Admin/RoleConfiguration';
import SupervisorManagement from './pages/Admin/SupervisorManagement';
import AdminHandover from './pages/Admin/AdminHandover';
import SystemSettings from './pages/Admin/SystemSettings';
import CheckIn from './pages/CheckIn';
import TaskAssignment from './pages/TaskAssignment';
import SupervisorCheckOut from './pages/CheckOut/SupervisorCheckOut';
import FinalCheckOut from './pages/CheckOut/FinalCheckOut';
import DailyCheckIn from './pages/Supervisor/DailyCheckIn';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup/admin" element={<AdminSignup />} />
          <Route path="/signup/supervisor" element={<SupervisorSignup />} />
          <Route path="/admin-setup" element={<AdminSetup />} />
          
          {/* Admin Routes */}
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="admin/project-setup" element={<ProjectSetup />} />
            <Route path="admin/roles" element={<RoleConfiguration />} />
            <Route path="admin/supervisors" element={<SupervisorManagement />} />
            <Route path="admin/handover" element={<AdminHandover />} />
            <Route path="admin/settings" element={<SystemSettings />} />
            <Route path="checkin" element={<CheckIn />} />
            <Route path="tasks" element={<TaskAssignment />} />
            <Route path="checkout/supervisor" element={<SupervisorCheckOut />} />
            <Route path="checkout/final" element={<FinalCheckOut />} />
          </Route>
          
          {/* Supervisor Routes */}
          <Route path="/supervisor" element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SupervisorLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/supervisor/daily-checkin" replace />} />
            <Route path="daily-checkin" element={<DailyCheckIn />} />
          </Route>

          {/* Redirect root to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
