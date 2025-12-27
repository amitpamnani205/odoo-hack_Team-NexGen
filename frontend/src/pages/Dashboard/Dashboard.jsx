import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as maintenanceAPI from '../../api/maintenance.api'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalEquipment: 0,
    openRequests: 0,
    scrapped: 0,
  })
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [equipmentRes, openReqRes] = await Promise.all([
        maintenanceAPI.getMaintenanceRequests({}),
        maintenanceAPI.getMaintenanceRequests({ stage: 'new' })
      ])

      const equipRaw = Array.isArray(equipmentRes?.data?.data)
        ? equipmentRes.data.data
        : Array.isArray(equipmentRes?.data)
          ? equipmentRes.data
          : []

      const openRaw = Array.isArray(openReqRes?.data?.data)
        ? openReqRes.data.data
        : Array.isArray(openReqRes?.data)
          ? openReqRes.data
          : []

      const normalized = openRaw.map((r) => ({
        ...r,
        completionType: r.completionType || r.requestType,
        assignedTo: r.assignedTo || r.assignedTechnicianId,
        requestDate: r.requestDate || r.createdAt,
      }))

      setRequests(normalized.slice(0, 4))

      const totalEquipment = equipRaw.length
      const scrappedCount = equipRaw.filter((e) => e.isScrapped).length
      const openCount = openRaw.length

      setStats({
        totalEquipment,
        openRequests: openCount,
        scrapped: scrappedCount,
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
              + New
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
            <div className="card card-red">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9.5 9.5l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="card-info">
                <h3>Total Equipment</h3>
                <div className="value">{stats.totalEquipment}</div>
                <div className="subtext">All assets in the system</div>
              </div>
            </div>

            <div className="card card-blue">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 15h8M8 12h6M8 9h4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="card-info">
                <h3>Open Requests</h3>
                <div className="value">{stats.openRequests}</div>
                <div className="subtext">New maintenance tickets</div>
              </div>
            </div>

            <div className="card card-green">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <div className="card-info">
                <h3>Scrapped</h3>
                <div className="value">{stats.scrapped}</div>
                <div className="subtext">Marked unusable</div>
              </div>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Equipment</th>
                <th>Added On</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Priority</th>
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
                    <td className={`type-${request.type?.toLowerCase() || 'repair'}`}>
                      {request.completionType === 'preventive' ? 'Preventive' : 'Corrective'}
                    </td>
                    <td>{request.equipment?.name || 'N/A'}</td>
                    <td>{new Date(request.requestDate || request.createdAt).toLocaleDateString()}</td>
                    <td>{request.assignedTo?.name || 'Unassigned'}</td>
                    <td>
                      <span className={`badge badge-${request.stage === 'new' ? 'pending' : request.stage === 'in_progress' ? 'progress' : 'completed'}`}>
                        {request.stage === 'new' ? 'New' : request.stage === 'in_progress' ? 'In Progress' : request.stage === 'repaired' ? 'Repaired' : request.stage}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-priority ${request.priority || 'medium'}`}>
                        {request.priority || 'Medium'}
                      </span>
                    </td>
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

