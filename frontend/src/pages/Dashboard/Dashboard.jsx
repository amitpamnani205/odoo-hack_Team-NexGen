import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as maintenanceAPI from '../../api/maintenance.api'
import * as equipmentAPI from '../../api/equipment.api'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    criticalEquipment: 0,
    technicianLoad: 0,
    pendingRequests: 0,
    overdueRequests: 0,
  })
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [equipmentRes, requestsRes] = await Promise.all([
        equipmentAPI.getEquipment(),
        maintenanceAPI.getMaintenanceRequests({})
      ])

      const equipRaw = Array.isArray(equipmentRes?.data?.data)
        ? equipmentRes.data.data
        : Array.isArray(equipmentRes?.data)
          ? equipmentRes.data
          : []

      const allRequests = Array.isArray(requestsRes?.data?.data)
        ? requestsRes.data.data
        : Array.isArray(requestsRes?.data)
          ? requestsRes.data
          : []

      const normalized = allRequests.map((r) => ({
        ...r,
        requestType: r.requestType || r.completionType,
        assignedTechnicianId: r.assignedTechnicianId || r.assignedTo,
        requestDate: r.requestDate || r.createdAt
      }))

      setRequests(normalized.slice(0, 4))

      const openRequests = normalized.filter((r) => r.stage === 'new' || r.stage === 'in_progress')
      const pendingCount = openRequests.filter((r) => r.stage === 'new').length
      const overdueCount = openRequests.filter((r) => {
        if (r.isOverdue) return true
        if (!r.scheduledDate) return false
        return new Date(r.scheduledDate) < new Date()
      }).length
      const criticalCount = openRequests.filter((r) =>
        r.priority === 'high' || r.priority === 'urgent' || r.isOverdue
      ).length
      const assignedOpen = openRequests.filter((r) => r.assignedTechnicianId).length
      const technicianLoad = openRequests.length > 0
        ? Math.round((assignedOpen / openRequests.length) * 100)
        : 0

      setStats({
        criticalEquipment: criticalCount,
        technicianLoad,
        pendingRequests: pendingCount,
        overdueRequests: overdueCount,
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-container">
      <main className="content">
        <div className="table-container">
          <div className="table-header">
            <button className="btn-new" onClick={() => navigate('/maintenance/new')}>
              New
            </button>
            <div className="search-bar">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search..." />
              <div className="search-dropdown">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
            <button className="btn-filter">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              Filter
            </button>
          </div>

          <div className="summary-grid-inline">
            <div className="summary-card summary-red">
              <div className="summary-title">Critical Equipment</div>
              <div className="summary-value">{stats.criticalEquipment} Units</div>
              <div className="summary-subtext">(High priority or overdue)</div>
            </div>
            <div className="summary-card summary-blue">
              <div className="summary-title">Technician Load</div>
              <div className="summary-value">{stats.technicianLoad}% Utilized</div>
              <div className="summary-subtext">(Assign Carefully)</div>
            </div>
            <div className="summary-card summary-green">
              <div className="summary-title">Open Requests</div>
              <div className="summary-value">{stats.pendingRequests} Pending</div>
              <div className="summary-subtext">{stats.overdueRequests} Overdue</div>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Employee</th>
                <th>Technician</th>
                <th>Category</th>
                <th>Stage</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    Loading...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No requests found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request._id || request.id} onClick={() => navigate(`/maintenance/${request._id || request.id}`)} style={{ cursor: 'pointer' }}>
                    <td>{request.subject || '—'}</td>
                    <td>{request.createdById?.name || '—'}</td>
                    <td>{request.assignedTechnicianId?.name || '—'}</td>
                    <td>{request.categoryId?.name || '—'}</td>
                    <td>{request.stage || '—'}</td>
                    <td>{request.equipmentId?.company || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="table-footer">
            <div className="pagination">
              <button className="page-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <span className="page-info">1-{requests.length} of {requests.length}</span>
              <button className="page-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
