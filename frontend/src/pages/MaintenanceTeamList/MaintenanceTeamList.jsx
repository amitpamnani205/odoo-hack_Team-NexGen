import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as teamAPI from '../../api/team.api'
import './MaintenanceTeamList.css'

const MaintenanceTeamList = () => {
  const navigate = useNavigate()
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await teamAPI.getTeams()
      const data = Array.isArray(response?.data) ? response.data : []
      setTeams(data)
    } catch (error) {
      console.error('Error fetching teams:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-list-container">
      <div className="content">
        <div className="table-card">
          <div className="table-header">
            <div className="header-left">
              <button className="btn-new" onClick={() => navigate('/teams/new')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New
              </button>
              <h1 className="title">Maintenance Teams</h1>
            </div>
          </div>
          <div className="table-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Team Members</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                      Loading...
                    </td>
                  </tr>
                ) : teams.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                      No teams found
                    </td>
                  </tr>
                ) : (
                  teams.map((team) => (
                    <tr
                      key={team._id || team.id}
                      onClick={() => navigate(`/teams/${team._id || team.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{team.name}</td>
                      <td>
                        {team.members?.map(m => m.name).join(', ') || 'No members'}
                      </td>
                      <td>{team.description || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceTeamList

