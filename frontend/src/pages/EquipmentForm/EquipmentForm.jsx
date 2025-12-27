import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as equipmentAPI from '../../api/equipment.api'
import EquipmentSmartButton from '../../components/EquipmentSmartButton'
import './EquipmentForm.css'

const EquipmentForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    asset: false,
    category: '',
    company: '',
    usedBy: '',
    maintenanceTeam: 'Internal Maintenance',
    assignedDate: new Date().toISOString().split('T')[0],
    description: '',
    trackingNumber: '',
    technician: '',
    employee: '',
    scrapDate: '',
    usedInLocation: '',
    workContact: '',
    purchaseDate: '',
    warrantyInfo: '',
    location: ''
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchEquipment()
    }
    fetchCategories()
  }, [id])

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getEquipmentById(id)
      setFormData(response.data)
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (id) {
        await equipmentAPI.updateEquipment(id, formData)
      } else {
        await equipmentAPI.createEquipment(formData)
      }
      navigate('/equipment')
    } catch (error) {
      console.error('Error saving equipment:', error)
      alert('Error saving equipment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 style={{ margin: 0 }}>{id ? 'Edit Equipment' : 'New Equipment'}</h1>
            {id && <EquipmentSmartButton equipmentId={id} />}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label>Asset?</label>
                  <input
                    type="checkbox"
                    name="asset"
                    checked={formData.asset}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Equipment Category?</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id || cat.id} value={cat._id || cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Company?</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Used By?</label>
                  <input
                    type="text"
                    name="usedBy"
                    value={formData.usedBy}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Maintenance Team</label>
                  <input
                    type="text"
                    name="maintenanceTeam"
                    value={formData.maintenanceTeam}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Assigned Date?</label>
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
                  <label>Equipment Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tracking Number ID</label>
                  <input
                    type="text"
                    name="trackingNumber"
                    value={formData.trackingNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Technician?</label>
                  <input
                    type="text"
                    name="technician"
                    value={formData.technician}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Employee?</label>
                  <input
                    type="text"
                    name="employee"
                    value={formData.employee}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Scrap Date?</label>
                  <input
                    type="date"
                    name="scrapDate"
                    value={formData.scrapDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Used in location?</label>
                  <input
                    type="text"
                    name="usedInLocation"
                    value={formData.usedInLocation}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Work Contact</label>
                  <input
                    type="text"
                    name="workContact"
                    value={formData.workContact}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Purchase Date</label>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Warranty Information</label>
                  <input
                    type="text"
                    name="warrantyInfo"
                    value={formData.warrantyInfo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
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

