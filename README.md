# Site Manager - Construction Site Management System

A mobile-friendly construction site management application with role-based access control, biometric check-ins, and secure admin handover capabilities.

## 🎯 Key Features

- **Admin Handover System**: Secure OTP-based admin succession process
- **Role-Based Access**: Admin and Supervisor roles with distinct capabilities
- **Supervisor Limit**: Maximum 2 supervisor accounts for optimal team management
- **Biometric Check-In**: Facial recognition for worker attendance (interface ready)
- **Mobile-Responsive**: Optimized for mobile devices and tablets
- **Real-Time Dashboard**: Admin view of worker activity and system stats

## 👥 User Roles

### Administrator (1 account max)
- Full system access and configuration
- Worker activity monitoring
- Supervisor management
- **Admin Handover**: Transfer access to new admin
- System settings and role configuration

### Supervisor (2 accounts max)
- Daily worker check-in via biometric scanning
- View check-in history
- Task assignment capabilities

## 🚀 Quick Start

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 📋 Available Scripts

### Start JSON Server (Backend)
```bash
npm run server
```
Runs JSON Server on [http://localhost:5000](http://localhost:5000)

### Start React App (Frontend)
```bash
npm start
```
Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### Run Both Simultaneously
```bash
# Terminal 1
npm run server

# Terminal 2
npm start
```

### Build for Production
```bash
npm run build
```
Builds the app for production to the `build` folder.

## 📚 Documentation

- **WHATS_NEW.md** - Overview of new features (Admin Handover & Supervisor Limit)
- **ADMIN_HANDOVER_GUIDE.md** - Step-by-step guide for admin handover process
- **FEATURES.md** - Complete feature documentation
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details

## 🔐 Default Login Credentials

### Admin Account
- **Email**: anthonymaundu1@gmail.com
- **Password**: makueni2013
- **Role**: Admin

### Supervisor Accounts
Create your own via `/signup/supervisor` (max 2 accounts)

## 🛠️ Tech Stack

- **React 19.2.0** - Frontend framework
- **React Router 7.10.0** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Heroicons 2.2.0** - Icon library
- **JSON Server 1.0.0-beta.3** - Mock REST API

## 📱 Main Routes

### Public Routes
- `/login` - Login page
- `/signup/admin` - Admin registration (enforces single admin)
- `/signup/supervisor` - Supervisor registration (max 2 accounts)
- `/admin-setup` - New admin OTP verification and password setup

### Admin Routes (Protected)
- `/` - Dashboard
- `/admin/project-setup` - Project configuration
- `/admin/roles` - Role management
- `/admin/supervisors` - Supervisor management
- `/admin/handover` - **Admin handover system** ⭐ NEW
- `/admin/settings` - System settings
- `/checkin` - Check-in module
- `/tasks` - Task assignment
- `/checkout/supervisor` - Supervisor check-out
- `/checkout/final` - Final check-out

### Supervisor Routes (Protected)
- `/supervisor/daily-checkin` - Daily worker biometric check-in

## 🎯 New Features (v1.0.0)

### 1. Admin Handover System
Secure OTP-based admin succession:
- Current admin creates handover with new admin details
- System generates 8-character OTP (24-hour validity)
- New admin uses OTP to set password
- Automatic transition: old admin deactivated, new admin activated
- Full audit trail maintained

**Guide**: See `ADMIN_HANDOVER_GUIDE.md`

### 2. Supervisor Account Limit
Hard limit of 2 supervisor accounts:
- Ensures backup coverage for leave situations
- Controlled team size for better management
- Clear error messaging when limit reached
- Admin can deactivate inactive supervisors

## 🧪 Testing

### Test Admin Handover
1. Login as admin
2. Go to Admin → Admin Handover
3. Create handover for test user
4. Copy generated OTP
5. Visit `/admin-setup` in incognito window
6. Complete setup with OTP
7. Verify old admin locked out, new admin active

### Test Supervisor Limit
1. Create 2 supervisor accounts
2. Attempt 3rd supervisor signup
3. Verify error: "Maximum supervisor accounts reached"

## 📂 Project Structure

```
site_app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.js
│   │   │   ├── MainLayout.js
│   │   │   ├── Sidebar.js
│   │   │   └── SupervisorLayout.js
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── AdminHandover.js ⭐ NEW
│   │   │   ├── ProjectSetup.js
│   │   │   ├── RoleConfiguration.js
│   │   │   ├── SupervisorManagement.js
│   │   │   └── SystemSettings.js
│   │   ├── CheckOut/
│   │   │   ├── FinalCheckOut.js
│   │   │   └── SupervisorCheckOut.js
│   │   ├── Supervisor/
│   │   │   └── DailyCheckIn.js
│   │   ├── AdminSetup.js ⭐ NEW
│   │   ├── AdminSignup.js
│   │   ├── CheckIn.js
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── SupervisorSignup.js (Updated: 2-account limit)
│   │   └── TaskAssignment.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── db.json (Database)
├── package.json
├── tailwind.config.js
├── ADMIN_HANDOVER_GUIDE.md ⭐ NEW
├── FEATURES.md ⭐ NEW
├── IMPLEMENTATION_SUMMARY.md ⭐ NEW
├── WHATS_NEW.md ⭐ NEW
└── README.md
```

## 🐛 Troubleshooting

### Server Connection Issues
**Error**: "An error occurred. Please ensure the server is running."

**Solution**:
```bash
# Ensure JSON Server is running
npm run server
```

### Admin Handover Issues
**Error**: "Invalid OTP"
- Check OTP is correct (case-sensitive)
- Verify OTP not expired (24 hours)
- Request new OTP from current admin

**Error**: "This admin account has been deactivated"
- Expected after handover
- Use new admin credentials
- Handover is irreversible

### Supervisor Signup Issues
**Error**: "Maximum number of supervisor accounts (2) has been reached"
- Contact administrator
- Admin must deactivate inactive supervisor
- Only 2 supervisors allowed

## 🤝 Contributing

This is a construction site management application. For feature requests or bug reports, please contact the development team.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with Create React App
- Styled with Tailwind CSS
- Icons by Heroicons

---

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
