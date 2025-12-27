import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as workCenterAPI from '../../api/workcenter.api'
import './WorkCenterForm.css'

const WorkCenterForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    tag: '',
    alternativeWorkCenters: '',
    costPerHour: 0,
    capacity: 1.0,
    timeEfficiency: 100,
    oeeTarget: 0
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchWorkCenter()
    }
  }, [id])

  const fetchWorkCenter = async () => {
    try {
      const response = await workCenterAPI.getWorkCenterById(id)
      setFormData(response.data)
    } catch (error) {
      console.error('Error fetching work center:', error)
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
        await workCenterAPI.updateWorkCenter(id, formData)
      } else {
        await workCenterAPI.createWorkCenter(formData)
      }
      navigate('/work-centers')
    } catch (error) {
      console.error('Error saving work center:', error)
      alert('Error saving work center')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="equipment-form-container">
      <div className="content">
        <div className="form-card">
          <h1>{id ? 'Edit Work Center' : 'New Work Center'}</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label>Work Center Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Tag</label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Alternative Work Centers</label>
                  <input
                    type="text"
                    name="alternativeWorkCenters"
                    value={formData.alternativeWorkCenters}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-column">
                <div className="form-group">
                  <label>Cost per Hour (₹)</label>
                  <input
                    type="number"
                    name="costPerHour"
                    value={formData.costPerHour}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    step="0.1"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Time Efficiency (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="timeEfficiency"
                    value={formData.timeEfficiency}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>OEE Target (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="oeeTarget"
                    value={formData.oeeTarget}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => navigate('/work-centers')} className="btn-cancel">
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

export default WorkCenterForm

