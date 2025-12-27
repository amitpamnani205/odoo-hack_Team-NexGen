import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (user) {
      logout()
      navigate('/login')
    }
  }

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'active' : ''
  }

  return (
    <nav className="sub-nav">
      <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Maintenance
      </Link>
      <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') && location.pathname === '/dashboard' ? 'active' : ''}`}>
        Dashboard
      </Link>
      <Link to="/maintenance-calendar" className={`nav-item ${isActive('/maintenance-calendar')}`}>
        Maintenance Calendar
      </Link>
      <Link to="/reports" className={`nav-item ${isActive('/reports')}`}>
        Reporting
      </Link>
      <Link to="/teams" className={`nav-item ${isActive('/teams')}`}>
        Team
      </Link>
      {user && (
        <div className="nav-user">
          <span>{user?.name || 'User'}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
      {!user && (
        <div className="nav-user">
          <button onClick={() => navigate('/login')} className="logout-btn">Login</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar

