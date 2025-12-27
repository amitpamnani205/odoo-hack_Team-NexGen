import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as equipmentAPI from '../../api/equipment.api'
import * as teamAPI from '../../api/team.api'
import './EquipmentCategoryForm.css'

const EquipmentCategoryForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    defaultMaintenanceTeam: ''
  })
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await teamAPI.getTeams()
      setTeams(response.data || [])
    } catch (error) {
      console.error('Error fetching teams:', error)
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
    setErrorMsg('')
    setLoading(true)
    try {
      await equipmentAPI.createEquipmentCategory({
        name: formData.name,
        defaultMaintenanceTeam: formData.defaultMaintenanceTeam
      })
      navigate('/equipment-categories')
    } catch (error) {
      console.error('Error creating category:', error)
      setErrorMsg(error?.response?.data?.message || 'Error creating category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <h1>New Equipment Category</h1>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Default Maintenance Team</label>
                  <select
                    name="defaultMaintenanceTeam"
                    value={formData.defaultMaintenanceTeam}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Team</option>
                    {teams.map(team => (
                      <option key={team._id || team.id} value={team._id || team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/equipment-categories')} className="btn-cancel">
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

export default EquipmentCategoryForm
