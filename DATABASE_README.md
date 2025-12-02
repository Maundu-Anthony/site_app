# Site Manager - Construction Site Management System

A mobile-friendly web application for managing construction site worker check-ins, check-outs, and data tracking.

## Features

- **Role-Based Authentication** (Admin & Supervisor)
- **Facial Biometric Check-In System** (Supervisor)
- **Real-Time Data Dashboard** (Admin)
- **Worker Registration & Management**
- **Access Control & Geofencing**
- **Attendance Tracking**
- **Overtime Management**

## Installation

1. Install dependencies:
```bash
yarn install
```

2. Start the JSON server (database):
```bash
yarn server
```

3. In a new terminal, start the React app:
```bash
yarn start
```

Or run both together:
```bash
yarn dev
```

## Login Credentials

### Admin (Only One Admin Allowed)
- **Email:** admin@sitemanager.com
- **Password:** admin123
- **Role:** Administrator

### Supervisors
1. **Mike Johnson**
   - **Email:** supervisor1@sitemanager.com
   - **Password:** super123
   - **Role:** Supervisor

2. **Sarah Williams**
   - **Email:** supervisor2@sitemanager.com
   - **Password:** super123
   - **Role:** Supervisor

## Database Structure

The `db.json` file contains:
- **admin** - Single admin account (cannot have multiple admins)
- **supervisors** - Multiple supervisor accounts
- **workers** - Registered construction workers
- **checkIns** - Daily check-in/check-out records
- **accessDenied** - Denied access logs
- **roles** - Worker role definitions with wage structures
- **projects** - Site project information
- **tasks** - Task assignments

## API Endpoints

The JSON server runs on `http://localhost:5000` with the following endpoints:

- `GET /admin` - Get admin details
- `GET /supervisors` - Get all supervisors
- `GET /supervisors/:id` - Get specific supervisor
- `GET /workers` - Get all workers
- `GET /checkIns` - Get all check-in records
- `GET /accessDenied` - Get access denied logs
- `GET /roles` - Get all roles
- `GET /projects` - Get all projects
- `GET /tasks` - Get all tasks

## User Roles & Access

### Admin
- Full dashboard access
- View all worker data and statistics
- Manage supervisors and workers
- Configure system settings
- Review and acknowledge access denied logs
- View reports and analytics

### Supervisor
- Daily worker check-in interface
- Facial biometric capture
- Real-time check-in tracking
- Task assignment
- Worker oversight

## Application Routes

### Public Routes
- `/login` - Login page

### Admin Routes (Requires Admin Role)
- `/` - Admin dashboard
- `/admin/project-setup` - Project configuration
- `/admin/roles` - Role management
- `/admin/supervisors` - Supervisor management
- `/admin/settings` - System settings

### Supervisor Routes (Requires Supervisor Role)
- `/supervisor/daily-checkin` - Daily worker check-in interface

## Technology Stack

- **Frontend:** React 19, React Router, Tailwind CSS, Heroicons
- **Backend/Database:** JSON Server
- **Authentication:** Context API with localStorage persistence

## Notes

- Only **ONE admin** is allowed in the system
- Multiple supervisors can be registered
- Supervisors can only access the check-in interface
- Admin has full system access
- Session persists across page refreshes
- Database updates in real-time via JSON Server

## Development

- The app runs on `http://localhost:3000`
- JSON Server runs on `http://localhost:5000`
- Changes to `db.json` are persisted automatically

## Security Note

This is a development setup. For production:
- Implement proper password hashing
- Use a real database (PostgreSQL, MongoDB, etc.)
- Add JWT authentication
- Implement HTTPS
- Add rate limiting
- Enable CORS properly
