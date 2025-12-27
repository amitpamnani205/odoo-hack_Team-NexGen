import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as equipmentAPI from '../../api/equipment.api'
import * as workCenterAPI from '../../api/workcenter.api'
import EquipmentSmartButton from '../../components/EquipmentSmartButton'
import './EquipmentForm.css'

const EquipmentForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    category: '',
    company: '',
    assignedToType: 'employee',
    assignedTo: '',
    defaultTechnicianId: '',
    location: '',
    workCenter: '',
    assignedDate: new Date().toISOString().split('T')[0],
    scrapDate: '',
    description: ''
  })
  const [categories, setCategories] = useState([])
  const [workCenters, setWorkCenters] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (id) {
      fetchEquipment()
    }
    fetchCategories()
    fetchWorkCenters()
  }, [id])

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getEquipmentById(id)
      const data = response?.data?.data || response?.data || {}
      setFormData(prev => ({
        ...prev,
        name: data.name || '',
        serialNumber: data.serialNumber || '',
        category: data.categoryId || data.category?._id || '',
        company: data.company || '',
        assignedToType: data.assignedToType || 'employee',
        assignedTo: data.assignedToId || data.assignedTo || '',
        defaultTechnicianId: data.defaultTechnicianId || '',
        location: data.location || '',
        workCenter: data.workCenter || '',
        assignedDate: data.assignedDate ? data.assignedDate.split('T')[0] : prev.assignedDate,
        scrapDate: data.scrapDate ? data.scrapDate.split('T')[0] : '',
        description: data.description || ''
      }))
    } catch (error) {
      console.error('Error fetching equipment:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await equipmentAPI.getEquipmentCategories()
      setCategories(response.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setLoading(true)
    try {
      const payload = {
        name: formData.name,
        serialNumber: formData.serialNumber,
        description: formData.description,
        categoryId: formData.category,
        assignedToType: formData.assignedToType,
        assignedToId: formData.assignedTo,
        defaultTechnicianId: formData.defaultTechnicianId || null,
        company: formData.company,
        location: formData.location,
        workCenter: formData.workCenter,
        assignedDate: formData.assignedDate,
        scrapDate: formData.scrapDate || null,
      }

      if (id) {
        await equipmentAPI.updateEquipment(id, payload)
      } else {
        await equipmentAPI.createEquipment(payload)
      }
      setSuccessMsg('Equipment saved successfully')
      navigate('/equipment')
    } catch (error) {
      console.error('Error saving equipment:', error)
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Error saving equipment'
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <div className="form-header">
            <div>
              <h1>{id ? 'Edit Equipment' : 'New Equipment'}</h1>
              <p className="muted">Maintenance team will auto-assign from category.</p>
            </div>
            {id && <EquipmentSmartButton equipmentId={id} />}
          </div>
          {errorMsg && <div className="error-message">{errorMsg}</div>}
          {successMsg && <div className="success-message">{successMsg}</div>}
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
                  <label>Equipment Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id || cat.id} value={cat._id || cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Assigned To</label>
                  <div className="inline">
                    <select name="assignedToType" value={formData.assignedToType} onChange={handleChange}>
                      <option value="employee">Employee</option>
                      <option value="department">Department</option>
                    </select>
                    <input
                      type="text"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      placeholder="Name or ID"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Maintenance Team</label>
                  <div className="readonly-note">Auto-assigned from category</div>
                </div>
                <div className="form-group">
                  <label>Assigned Date</label>
                  <input
                    type="date"
                    name="assignedDate"
                    value={formData.assignedDate}
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
              <div className="form-column">
                <div className="form-group">
                  <label>Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Technician</label>
                  <input
                    type="text"
                    name="defaultTechnicianId"
                    value={formData.defaultTechnicianId}
                    onChange={handleChange}
                    placeholder="Technician name or ID"
                  />
                </div>
                <div className="form-group">
                  <label>Scrap Date</label>
                  <input
                    type="date"
                    name="scrapDate"
                    value={formData.scrapDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Used in location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Work Center</label>
                  <select name="workCenter" value={formData.workCenter} onChange={handleChange}>
                    <option value="">Select Work Center</option>
                    {workCenters.map(wc => (
                      <option key={wc._id || wc.id} value={wc.name || wc._id || wc.id}>
                        {wc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/equipment')} className="btn-cancel">
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

export default EquipmentForm

