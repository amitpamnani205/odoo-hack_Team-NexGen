import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as equipmentAPI from '../../api/equipment.api'
import './EquipmentList.css'

const EquipmentList = () => {
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEquipment()
  }, [])

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getEquipment()
      setEquipment(response.data || [])
    } catch (error) {
      console.error('Error fetching equipment:', error)
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
              <button className="btn-new" onClick={() => navigate('/equipment/new')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New
              </button>
              <h1 className="title">Equipment</h1>
            </div>
          </div>
          <div className="table-content">
            <table className="data-table">
              <thead>
                <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Maintenance Team</th>
                <th>Location</th>
                <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      Loading...
                    </td>
                  </tr>
                ) : equipment.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                      No equipment found
                    </td>
                  </tr>
                ) : (
                  equipment.map((item) => (
                  <tr
                    key={item._id || item.id}
                    onClick={() => navigate(`/equipment/${item._id || item.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{item.name}</td>
                    <td>{item.categoryId?.name || 'N/A'}</td>
                    <td>{item.maintenanceTeamId?.name || item.categoryId?.defaultMaintenanceTeam?.name || 'Auto from category'}</td>
                    <td>{item.location || 'N/A'}</td>
                    <td>
                      <span className={`status-pill ${item.isScrapped ? 'scrapped' : 'active'}`}>
                        {item.isScrapped ? 'Scrapped' : 'Active'}
                      </span>
                    </td>
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

export default EquipmentList
