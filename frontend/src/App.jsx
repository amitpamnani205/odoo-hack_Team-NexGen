import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import EquipmentList from './pages/EquipmentList/EquipmentList'
import EquipmentForm from './pages/EquipmentForm/EquipmentForm'
import EquipmentCategories from './pages/EquipmentCategories/EquipmentCategories'
import WorkCenterList from './pages/WorkCenterList/WorkCenterList'
import WorkCenterForm from './pages/WorkCenterForm/WorkCenterForm'
import MaintenanceKanban from './pages/MaintenanceKanban/MaintenanceKanban'
import MaintenanceRequestForm from './pages/MaintenanceRequestForm/MaintenanceRequestForm'
import MaintenanceCalendar from './pages/MaintenanceCalendar/MaintenanceCalendar'
import MaintenanceTeamList from './pages/MaintenanceTeamList/MaintenanceTeamList'
import MaintenanceTeamForm from './pages/MaintenanceTeamForm/MaintenanceTeamForm'
import Reports from './pages/Reports/Reports'
import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/equipment" element={<EquipmentList />} />
        <Route path="/equipment/new" element={<EquipmentForm />} />
        <Route path="/equipment/:id" element={<EquipmentForm />} />
        <Route path="/equipment-categories" element={<EquipmentCategories />} />
        <Route path="/work-centers" element={<WorkCenterList />} />
        <Route path="/work-centers/new" element={<WorkCenterForm />} />
        <Route path="/work-centers/:id" element={<WorkCenterForm />} />
        <Route path="/maintenance" element={<MaintenanceKanban />} />
        <Route path="/maintenance/new" element={<MaintenanceRequestForm />} />
        <Route path="/maintenance/:id" element={<MaintenanceRequestForm />} />
        <Route path="/maintenance-calendar" element={<MaintenanceCalendar />} />
        <Route path="/teams" element={<MaintenanceTeamList />} />
        <Route path="/teams/new" element={<MaintenanceTeamForm />} />
        <Route path="/teams/:id" element={<MaintenanceTeamForm />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App

