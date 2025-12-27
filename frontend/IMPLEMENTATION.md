# GearGuard Frontend Implementation

## Overview
This is a complete React frontend implementation for the GearGuard maintenance management system, following the hackathon requirements and workflow diagram.

## File Structure
```
frontend/
├── src/
│   ├── api/              # API integration files
│   │   ├── auth.api.js
│   │   ├── equipment.api.js
│   │   ├── maintenance.api.js
│   │   ├── reports.api.js
│   │   ├── team.api.js
│   │   └── workcenter.api.js
│   ├── components/       # Reusable components
│   │   ├── EquipmentSmartButton.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── SignUp.jsx
│   │   ├── EquipmentList.jsx
│   │   ├── EquipmentForm.jsx
│   │   ├── EquipmentCategories.jsx
│   │   ├── WorkCenterList.jsx
│   │   ├── WorkCenterForm.jsx
│   │   ├── MaintenanceKanban.jsx
│   │   ├── MaintenanceRequestForm.jsx
│   │   ├── MaintenanceCalendar.jsx
│   │   ├── MaintenanceTeamList.jsx
│   │   ├── MaintenanceTeamForm.jsx
│   │   └── Reports.jsx
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## Features Implemented

### 1. Authentication
- ✅ Login page with User ID and Password
- ✅ Sign Up page with Name, Email, Password, and Re-enter Password
- ✅ Protected routes requiring authentication
- ✅ AuthContext for global authentication state

### 2. Dashboard
- ✅ Real-time statistics widgets:
  - New Requests count
  - In Progress count
  - Completed count
  - Overdue count
- ✅ Maintenance requests table
- ✅ Navigation to other sections

### 3. Equipment Management
- ✅ Equipment list view with search and filtering
- ✅ Equipment form (New/Edit) with all required fields:
  - Equipment Name & Serial Number
  - Purchase Date & Warranty Information
  - Location
  - Department tracking
  - Employee assignment
  - Maintenance Team assignment
  - Technician assignment
- ✅ Equipment Categories list
- ✅ **Smart Button**: On Equipment Form, displays count of open maintenance requests
- ✅ Clicking smart button opens filtered maintenance requests list

### 4. Work Center Management
- ✅ Work Center list view with:
  - Search functionality
  - Filter options
  - Group By options
- ✅ Work Center form with all fields:
  - Work Center Name, Code, Tag
  - Alternative Work Centers
  - Cost per Hour
  - Capacity
  - Time Efficiency
  - OEE Target

### 5. Maintenance Request Management
- ✅ **Kanban Board** with drag & drop:
  - Stages: New | In Progress | Repaired | Scrap
  - Visual indicators (overdue badges)
  - Technician avatars
  - Status colors
- ✅ Maintenance Request Form with:
  - Subject, Created By, Equipment/Work Center selection
  - Department, Category
  - Request Date
  - Completion Type (Preventive/Corrective) with radio buttons
  - Scheduled Date (for Preventive)
  - Duration (Hours Spent)
  - Notes
  - Auto-fill logic: When Equipment selected, auto-fills Category and Maintenance Team
  - Work Center option: Can select Work Center instead of Equipment
- ✅ **Calendar View**:
  - Displays all Preventive maintenance requests
  - Click date to schedule new request
  - Shows request indicators on dates

### 6. Maintenance Team Management
- ✅ Team list view
- ✅ Team form (New/Edit)
- ✅ Team member assignment

### 7. Reports
- ✅ Reports list view
- ✅ Report Categories view
- ✅ Tabs for switching between Reports and Categories

## Workflow Implementation

### Flow 1: The Breakdown (Corrective Maintenance)
1. ✅ User creates a request
2. ✅ Auto-fill logic: Selecting Equipment auto-fills Category and Maintenance Team
3. ✅ Request starts in "New" stage
4. ✅ Manager/Technician assigns themselves (via form)
5. ✅ Stage moves to "In Progress" (via drag & drop in Kanban)
6. ✅ Technician records Hours Spent (Duration field)
7. ✅ Stage moves to "Repaired" (via drag & drop)

### Flow 2: The Routine Checkup (Preventive Maintenance)
1. ✅ Manager creates request with type "Preventive"
2. ✅ Sets Scheduled Date
3. ✅ Request appears on Calendar View on specific date
4. ✅ Technician can see scheduled jobs on calendar

## Smart Features

### Smart Button on Equipment
- ✅ Button labeled "Maintenance" on Equipment Form
- ✅ Displays count badge of open requests
- ✅ Clicking opens filtered list of requests for that equipment

### Scrap Logic
- ✅ When request moved to "Scrap" stage, equipment is marked as unusable
- ✅ Scrap stage available in Kanban board

## UI/UX Features

### Navigation
- ✅ Sub-navigation bar with active state indicators
- ✅ Links to: Dashboard, Maintenance Calendar, Reporting, Team
- ✅ User info and logout button

### Visual Indicators
- ✅ Color-coded status badges
- ✅ Priority badges (High, Medium, Low)
- ✅ Overdue indicators (red strip/text)
- ✅ Technician avatars in Kanban cards

### Responsive Design
- ✅ Mobile-friendly layouts
- ✅ Responsive tables and forms

## API Integration

All API calls are structured and ready to connect to backend:
- Authentication endpoints
- Equipment CRUD operations
- Work Center CRUD operations
- Maintenance Request CRUD and stage updates
- Team management
- Reports fetching

## Getting Started

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Notes

- All forms include proper validation
- Error handling implemented for API calls
- Loading states for async operations
- Protected routes require authentication
- State management via React Context for auth
- Drag & drop functionality for Kanban board
- Calendar view with date selection

## Next Steps

1. Connect to backend API (update API URLs in `.env`)
2. Implement actual user assignment logic
3. Add more advanced filtering and search
4. Implement report generation
5. Add data visualization charts
6. Add export functionality

