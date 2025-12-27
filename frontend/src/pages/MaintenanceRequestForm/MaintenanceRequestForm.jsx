import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import * as maintenanceAPI from '../../api/maintenance.api'
import * as equipmentAPI from '../../api/equipment.api'
import * as workCenterAPI from '../../api/workcenter.api'
import './MaintenanceRequestForm.css'

const MaintenanceRequestForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const scheduledDateFromState = location.state?.scheduledDate
  const [formData, setFormData] = useState({
    subject: '',
    createdBy: user?.name || 'Abigail Peterson',
    equipment: '',
    workCenter: '',
    department: 'My Company (San Francisco)',
    category: '',
    requestDate: new Date().toISOString().split('T')[0],
    completionType: scheduledDateFromState ? 'preventive' : 'corrective',
    scheduledDate: scheduledDateFromState || '',
    duration: 0,
    notes: '',
    assignedTo: '',
    stage: 'new'
  })
  const [equipmentList, setEquipmentList] = useState([])
  const [workCenters, setWorkCenters] = useState([])
  const [useWorkCenter, setUseWorkCenter] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchRequest()
    }
    fetchEquipment()
    fetchWorkCenters()
  }, [id])

  const fetchRequest = async () => {
    try {
      const response = await maintenanceAPI.getMaintenanceRequestById(id)
      const data = response.data
      setFormData(data)
      setUseWorkCenter(!!data.workCenter)
    } catch (error) {
      console.error('Error fetching request:', error)
    }
  }

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getEquipment()
      setEquipmentList(response.data || [])
    } catch (error) {
      console.error('Error fetching equipment:', error)
    }
  }

  const fetchWorkCenters = async () => {
    try {
      const response = await workCenterAPI.getWorkCenters()
      setWorkCenters(response.data || [])
    } catch (error) {
      console.error('Error fetching work centers:', error)
    }
  }

  const handleEquipmentChange = (e) => {
    const equipmentId = e.target.value
    const selectedEquipment = equipmentList.find(eq => (eq._id || eq.id) === equipmentId)
    
    setFormData(prev => ({
      ...prev,
      equipment: equipmentId,
      category: selectedEquipment?.category?._id || selectedEquipment?.category?.id || '',
      maintenanceTeam: selectedEquipment?.maintenanceTeam || ''
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
    setLoading(true)
    try {
      if (id) {
        await maintenanceAPI.updateMaintenanceRequest(id, formData)
      } else {
        await maintenanceAPI.createMaintenanceRequest(formData)
      }
      navigate('/maintenance')
    } catch (error) {
      console.error('Error saving request:', error)
      alert('Error saving request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <h1>{id ? 'Edit Maintenance Request' : 'New Maintenance Request'}</h1>
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
                  <label>Created By</label>
                  <input
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    {useWorkCenter ? 'Work Center' : 'Equipment'}
                  </label>
                  {useWorkCenter ? (
                    <select name="workCenter" value={formData.workCenter} onChange={handleChange}>
                      <option value="">Select Work Center</option>
                      {workCenters.map(wc => (
                        <option key={wc._id || wc.id} value={wc._id || wc.id}>
                          {wc.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select name="equipment" value={formData.equipment} onChange={handleEquipmentChange}>
                      <option value="">Select Equipment</option>
                      {equipmentList.map(eq => (
                        <option key={eq._id || eq.id} value={eq._id || eq.id}>
                          {eq.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={useWorkCenter}
                      onChange={(e) => setUseWorkCenter(e.target.checked)}
                    />
                    Use Work Center instead of Equipment
                  </label>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Request Date</label>
                  <input
                    type="date"
                    name="requestDate"
                    value={formData.requestDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Completion Type</label>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                    <label>
                      <input
                        type="radio"
                        name="completionType"
                        value="preventive"
                        checked={formData.completionType === 'preventive'}
                        onChange={handleChange}
                      />
                      Preventive
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="completionType"
                        value="corrective"
                        checked={formData.completionType === 'corrective'}
                        onChange={handleChange}
                      />
                      Corrective
                    </label>
                  </div>
                </div>
                {formData.completionType === 'preventive' && (
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
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
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

