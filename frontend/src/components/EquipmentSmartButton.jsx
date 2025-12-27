import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as maintenanceAPI from '../api/maintenance.api'
import './EquipmentSmartButton.css'

const EquipmentSmartButton = ({ equipmentId }) => {
  const navigate = useNavigate()
  const [requestCount, setRequestCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (equipmentId) {
      fetchRequestCount()
    }
  }, [equipmentId])

  const fetchRequestCount = async () => {
    try {
      const response = await maintenanceAPI.getOpenRequestsCount(equipmentId)
      const count = response?.data?.count ?? 0
      setRequestCount(count)
    } catch (error) {
      console.error('Error fetching equipment requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    navigate('/maintenance', { state: { equipmentId } })
  }

  return (
    <button className="smart-button" onClick={handleClick} disabled={loading}>
      Maintenance
      {requestCount > 0 && (
        <span className="badge">{requestCount}</span>
      )}
    </button>
  )
}

export default EquipmentSmartButton
