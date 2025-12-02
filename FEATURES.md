# Site Manager - Features Documentation

## Overview
Site Manager is a mobile-friendly construction site management application with role-based access control for Admins and Supervisors.

---

## User Roles

### Administrator (Admin)
- **Limit**: Only ONE active admin at a time
- **Access**: Full system access including dashboard, project setup, role configuration, supervisor management, and system settings
- **Capabilities**:
  - View all worker check-in data
  - Manage supervisors and projects
  - Configure roles and system settings
  - **Admin Handover**: Transfer administrative access to a new admin

### Supervisor
- **Limit**: Maximum TWO supervisor accounts (for leave coverage)
- **Access**: Daily check-in module for worker biometric scanning
- **Capabilities**:
  - Scan and verify worker facial biometrics
  - Record daily worker check-ins
  - View today's check-in history

---

## Key Features

### 1. Admin Handover System
**Purpose**: Allows current admin to transfer administrative access to a new administrator

**Process**:
1. **Create Handover** (Current Admin)
   - Navigate to: Admin → Admin Handover
   - Enter new admin details (name, email, phone)
   - System generates 8-character alphanumeric OTP
   - OTP expires in 24 hours

2. **Setup Account** (New Admin)
   - Visit: `/admin-setup` page
   - Enter the OTP received from current admin
   - Create new password (min. 6 characters)
   - Confirm password

3. **Account Transition**
   - New admin account is activated
   - Old admin account is deactivated (marked `isActive: false`)
   - Old admin can no longer log in
   - New admin has full administrative access

**Security Features**:
- OTP-based verification
- 24-hour OTP expiration
- Secure password creation
- Automatic deactivation of previous admin
- Audit trail (tracks who replaced whom)

---

### 2. Supervisor Account Limit
**Restriction**: Maximum 2 supervisor accounts allowed

**Rationale**: 
- Ensures backup coverage when one supervisor is on leave
- Maintains manageable team size
- Security and accountability

**Implementation**:
- Signup validation checks total supervisor count
- Error message displayed if limit (2) is reached
- Admin must contact system administrator to add more supervisors

---

### 3. Authentication System
**Login Process**:
- Email and password authentication
- Role selection (Admin or Supervisor)
- Session persistence via localStorage
- Last login timestamp tracking

**Account Status**:
- Active/Inactive status for admins
- Deactivated admins cannot log in
- Only active supervisors can access the system

---

## Database Structure

### Admin Collection (`admin`)
```json
{
  "id": "admin-001",
  "email": "admin@example.com",
  "password": "hashedPassword",
  "name": "Admin Name",
  "role": "admin",
  "phone": "+254xxxxxxxxx",
  "createdAt": "ISO timestamp",
  "lastLogin": "ISO timestamp",
  "isActive": true,
  "deactivatedAt": "ISO timestamp (if deactivated)",
  "replacedBy": "new-admin@example.com",
  "previousAdmin": "old-admin@example.com"
}
```

### Supervisors Collection (`supervisors`)
```json
{
  "id": "sup-001",
  "email": "supervisor@example.com",
  "password": "hashedPassword",
  "name": "Supervisor Name",
  "role": "supervisor",
  "phone": "+254xxxxxxxxx",
  "assignedProjects": [],
  "createdAt": "ISO timestamp",
  "lastLogin": "ISO timestamp",
  "isActive": true
}
```

### Admin Handover Collection (`adminHandover`)
```json
{
  "id": "admin-pending",
  "email": "newadmin@example.com",
  "name": "New Admin Name",
  "phone": "+254xxxxxxxxx",
  "role": "admin",
  "oneTimePassword": "ABC12345",
  "isPending": true,
  "createdAt": "ISO timestamp",
  "expiresAt": "ISO timestamp (24 hours from creation)"
}
```

---

## Navigation Routes

### Public Routes
- `/login` - Login page
- `/signup/admin` - Admin registration (single admin enforcement)
- `/signup/supervisor` - Supervisor registration (2-account limit)
- `/admin-setup` - New admin OTP verification and password setup

### Protected Admin Routes
- `/` - Admin dashboard
- `/admin/project-setup` - Project configuration
- `/admin/roles` - Role management
- `/admin/supervisors` - Supervisor management
- `/admin/handover` - **Admin handover system**
- `/admin/settings` - System settings
- `/checkin` - Check-in module
- `/tasks` - Task assignment
- `/checkout/supervisor` - Supervisor check-out
- `/checkout/final` - Final check-out

### Protected Supervisor Routes
- `/supervisor/daily-checkin` - Daily worker check-in (biometric scanning)

---

## Technology Stack

### Frontend
- **React 19.2.0**: UI framework
- **React Router 7.10.0**: Client-side routing
- **Tailwind CSS**: Responsive styling
- **Heroicons 2.2.0**: Icon library

### Backend
- **JSON Server 1.0.0-beta.3**: Mock REST API server
- **Port**: 5000

### State Management
- **Context API**: Authentication state
- **localStorage**: Session persistence

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start JSON Server (Port 5000)
```bash
npm run server
```

### 3. Start React App (Port 3000)
```bash
npm start
```

### 4. Access Application
- App: http://localhost:3000
- API: http://localhost:5000

---

## Usage Guidelines

### Admin Handover Best Practices
1. **Security**: Share OTP securely (encrypted communication, in-person)
2. **Timing**: Complete handover within 24 hours (OTP expiration)
3. **Verification**: Confirm new admin can log in before logging out
4. **Documentation**: Record handover details for audit purposes

### Supervisor Management
- Maximum 2 supervisors allowed
- Use descriptive names for identification
- Regularly review supervisor activity logs
- Deactivate accounts for supervisors on extended leave

---

## Future Enhancements
- Facial biometric integration (real-time scanning)
- Worker registration module
- Real-time notifications
- Advanced analytics dashboard
- Multi-factor authentication (MFA)
- Email/SMS OTP delivery for admin handover
- Password reset functionality
- Activity audit logs

---

## Support
For technical support or feature requests, contact the system administrator.

**Version**: 1.0.0  
**Last Updated**: December 2025
