import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as workCenterAPI from '../../api/workcenter.api'
import './WorkCenterList.css'

const WorkCenterList = () => {
  const navigate = useNavigate()
  const [workCenters, setWorkCenters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkCenters()
  }, [])

  const fetchWorkCenters = async () => {
    try {
      const response = await workCenterAPI.getWorkCenters()
      setWorkCenters(response.data || [])
    } catch (error) {
      console.error('Error fetching work centers:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="workcenters-page">
      <div className="container">
        <div className="page-header">
          <h1>Work Centers</h1>
          <button className="add-btn" onClick={() => navigate('/work-centers/new')}>
            + New
          </button>
        </div>

        <div className="toolbar">
          <input type="text" placeholder="Search Work Center" className="search-input" />
          <select className="filter-select">
            <option>Filter</option>
            <option>Assembly</option>
            <option>Drilling</option>
          </select>
          <select className="filter-select">
            <option>Group By</option>
            <option>Department</option>
            <option>Tag</option>
          </select>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Work Center</th>
                <th>Code</th>
                <th>Tag</th>
                <th>Alternative Workcenters</th>
                <th>Cost / Hour</th>
                <th>Capacity</th>
                <th>Time Efficiency (%)</th>
                <th>OEE Target (%)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                    Loading...
                  </td>
                </tr>
              ) : workCenters.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                    No work centers found
                  </td>
                </tr>
              ) : (
                workCenters.map((wc) => (
                  <tr
                    key={wc._id || wc.id}
                    onClick={() => navigate(`/work-centers/${wc._id || wc.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{wc.name}</td>
                    <td>{wc.code}</td>
                    <td><span className="tag">{wc.tag}</span></td>
                    <td>{wc.alternativeWorkCenters || '—'}</td>
                    <td>₹{wc.costPerHour || 0}</td>
                    <td>{wc.capacity || 0}</td>
                    <td>{wc.timeEfficiency || 0}%</td>
                    <td>{wc.oeeTarget || 0}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WorkCenterList

