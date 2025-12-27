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
    teamMembers: []
  })
  const [membersInput, setMembersInput] = useState('')
  const [memberId, setMemberId] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
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
        teamMembers: data.teamMembers || []
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
    setErrorMsg('')
    setLoading(true)
    try {
      let payload = {
        name: formData.name,
        description: formData.description
      }
      if (!id) {
        const memberIds = membersInput
          .split(',')
          .map((val) => val.trim())
          .filter(Boolean)
        payload = {
          ...payload,
          teamMembers: memberIds
        }
      }
      if (id) {
        await teamAPI.updateTeam(id, payload)
      } else {
        await teamAPI.createTeam(payload)
      }
      navigate('/teams')
    } catch (error) {
      console.error('Error saving team:', error)
      setErrorMsg('Error saving team')
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async () => {
    if (!memberId) {
      setErrorMsg('Member ID is required')
      return
    }
    setErrorMsg('')
    try {
      const response = await teamAPI.addTeamMember(id, memberId)
      const data = response?.data?.data || response?.data || {}
      setFormData(prev => ({
        ...prev,
        teamMembers: data.teamMembers || prev.teamMembers
      }))
      setMemberId('')
    } catch (error) {
      console.error('Error adding member:', error)
      setErrorMsg(error?.response?.data?.message || 'Error adding member')
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <h1>{id ? 'Edit Maintenance Team' : 'New Maintenance Team'}</h1>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
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
                {!id && (
                  <div className="form-group">
                    <label>Team Members (IDs, comma-separated)</label>
                    <input
                      type="text"
                      value={membersInput}
                      onChange={(e) => setMembersInput(e.target.value)}
                      placeholder="e.g. 64b...a1, 64b...c2"
                    />
                  </div>
                )}
                {id && (
                  <div className="form-group">
                    <label>Add Member by ID</label>
                    <div className="inline">
                      <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        placeholder="Member ID (24 hex)"
                      />
                      <button type="button" className="btn-save" onClick={handleAddMember}>
                        Add
                      </button>
                    </div>
                    {formData.teamMembers?.length > 0 && (
                      <div className="readonly-note">
                        {formData.teamMembers.map(m => m.name || m.email || m._id).join(', ')}
                      </div>
                    )}
                  </div>
                )}
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
