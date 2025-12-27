import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as teamAPI from '../../api/team.api'
import './MaintenanceTeamForm.css'

const MaintenanceTeamForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchTeam()
    }
  }, [id])

  const fetchTeam = async () => {
    try {
      const response = await teamAPI.getTeamById(id)
      const data = response?.data?.data || response?.data || {}
      setFormData({
        name: data.name || '',
        description: data.description || '',
        members: data.teamMembers || data.members || []
      })
    } catch (error) {
      console.error('Error fetching team:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (id) {
        await teamAPI.updateTeam(id, formData)
      } else {
        await teamAPI.createTeam(formData)
      }
      navigate('/teams')
    } catch (error) {
      console.error('Error saving team:', error)
      alert('Error saving team')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <h1>{id ? 'Edit Maintenance Team' : 'New Maintenance Team'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label>Team Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/teams')} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceTeamForm

