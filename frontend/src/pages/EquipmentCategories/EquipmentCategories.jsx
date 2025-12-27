import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as equipmentAPI from '../../api/equipment.api'
import './EquipmentCategories.css'

const EquipmentCategories = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await equipmentAPI.getEquipmentCategories()
      setCategories(response.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
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
              <button className="btn-new">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New
              </button>
              <h1 className="title">Equipment Categories</h1>
            </div>
          </div>
          <div className="table-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Responsible</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                      Loading...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
                      No categories found
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category._id || category.id}>
                      <td>{category.name}</td>
                      <td>{category.responsible || 'OdooBot'}</td>
                      <td>{category.company || 'My Company (San Francisco)'}</td>
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

export default EquipmentCategories

