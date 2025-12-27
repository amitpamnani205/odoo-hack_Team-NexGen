import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as equipmentAPI from '../api/equipment.api'
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
      const response = await equipmentAPI.getEquipmentByEquipment(equipmentId)
      const requests = response.data || []
      // Count only open requests (not repaired or scrap)
      const openRequests = requests.filter(
        req => req.stage !== 'repaired' && req.stage !== 'scrap'
      )
      setRequestCount(openRequests.length)
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

