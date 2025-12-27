import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import * as maintenanceAPI from '../../api/maintenance.api'
import * as equipmentAPI from '../../api/equipment.api'
import './MaintenanceRequestForm.css'

const MaintenanceRequestForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const scheduledDateFromState = location.state?.scheduledDate
  const equipmentIdFromState = location.state?.equipmentId
  const [formData, setFormData] = useState({
    subject: '',
    equipmentId: equipmentIdFromState || '',
    requestType: scheduledDateFromState ? 'preventive' : 'corrective',
    scheduledDate: scheduledDateFromState || '',
    duration: 0,
    description: ''
  })
  const [equipmentList, setEquipmentList] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (id) {
      fetchRequest()
    }
    fetchEquipment()
  }, [id])

  const fetchRequest = async () => {
    try {
      const response = await maintenanceAPI.getMaintenanceRequestById(id)
      const data = response?.data?.data || response?.data || {}
      setFormData({
        subject: data.subject || '',
        equipmentId: data.equipmentId?._id || data.equipmentId || '',
        requestType: data.requestType || 'corrective',
        scheduledDate: data.scheduledDate ? data.scheduledDate.split('T')[0] : '',
        duration: data.duration || 0,
        description: data.description || ''
      })
    } catch (error) {
      console.error('Error fetching request:', error)
    }
  }

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getEquipment()
      const list = Array.isArray(response?.data) ? response.data : []
      setEquipmentList(list)
    } catch (error) {
      console.error('Error fetching equipment:', error)
    }
  }

  const handleEquipmentChange = (e) => {
    const equipmentId = e.target.value
    setFormData(prev => ({
      ...prev,
      equipmentId: equipmentId
    }))
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
    setSuccessMsg('')

    if (!formData.equipmentId) {
      setErrorMsg('Please select equipment before submitting.')
      return
    }

    const payload = {
      subject: formData.subject,
      description: formData.description || '',
      requestType: formData.requestType || 'corrective',
      equipmentId: formData.equipmentId,
      scheduledDate: formData.scheduledDate || null,
      priority: formData.priority || 'medium',
      duration: formData.duration,
    }

    setLoading(true)
    try {
      if (id) {
        await maintenanceAPI.updateMaintenanceRequest(id, payload)
      } else {
        await maintenanceAPI.createMaintenanceRequest(payload)
      }
      setSuccessMsg('Request saved successfully')
      navigate('/maintenance')
    } catch (error) {
      console.error('Error saving request:', error)
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Error saving request'
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <h1>{id ? 'Edit Maintenance Request' : 'New Maintenance Request'}</h1>
          {errorMsg && <div className="error-message" style={{ marginBottom: 12 }}>{errorMsg}</div>}
          {successMsg && <div className="success-message" style={{ marginBottom: 12 }}>{successMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Equipment</label>
                  <select name="equipmentId" value={formData.equipmentId} onChange={handleEquipmentChange}>
                    <option value="">Select Equipment</option>
                    {equipmentList.map(eq => (
                      <option key={eq._id || eq.id} value={eq._id || eq.id}>
                        {eq.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Request Type</label>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                    <label>
                      <input
                        type="radio"
                        name="requestType"
                        value="preventive"
                        checked={formData.requestType === 'preventive'}
                        onChange={handleChange}
                      />
                      Preventive
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="requestType"
                        value="corrective"
                        checked={formData.requestType === 'corrective'}
                        onChange={handleChange}
                      />
                      Corrective
                    </label>
                  </div>
                </div>
                {formData.requestType === 'preventive' && (
                  <div className="form-group">
                    <label>Scheduled Date</label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Duration (Hours)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
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
              <button type="button" onClick={() => navigate('/maintenance')} className="btn-cancel">
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

export default MaintenanceRequestForm
