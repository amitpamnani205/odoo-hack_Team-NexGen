import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as maintenanceAPI from '../../api/maintenance.api'
import './MaintenanceKanban.css'

const MaintenanceKanban = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [requests, setRequests] = useState({
    new: [],
    in_progress: [],
    repaired: [],
    scrap: []
  })
  const [loading, setLoading] = useState(true)
  const equipmentId = location.state?.equipmentId

  useEffect(() => {
    fetchRequests()
  }, [equipmentId])

  const fetchRequests = async () => {
    try {
      const params = equipmentId ? { equipment: equipmentId } : {}
      const response = await maintenanceAPI.getMaintenanceRequests(params)
      const data = response.data || []
      
      setRequests({
        new: data.filter(r => r.stage === 'new'),
        in_progress: data.filter(r => r.stage === 'in_progress'),
        repaired: data.filter(r => r.stage === 'repaired'),
        scrap: data.filter(r => r.stage === 'scrap')
      })
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragStart = (e, request) => {
    e.dataTransfer.setData('request', JSON.stringify(request))
  }

  const handleDrop = async (e, targetStage) => {
    e.preventDefault()
    const requestData = JSON.parse(e.dataTransfer.getData('request'))
    
    try {
      await maintenanceAPI.updateMaintenanceRequestStage(requestData._id || requestData.id, targetStage)
      fetchRequests()
    } catch (error) {
      console.error('Error updating stage:', error)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const renderCard = (request) => {
    const isOverdue = request.isOverdue || (request.scheduledDate && new Date(request.scheduledDate) < new Date())
    
    return (
      <div
        key={request._id || request.id}
        className={`kanban-card ${isOverdue ? 'overdue' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, request)}
        onClick={() => navigate(`/maintenance/${request._id || request.id}`)}
      >
        <div className="card-header">
          <span className="card-type">{request.completionType === 'preventive' ? 'Preventive' : 'Corrective'}</span>
          {isOverdue && <span className="overdue-badge">Overdue</span>}
        </div>
        <h4>{request.subject}</h4>
        <div className="card-info">
          <p><strong>Equipment:</strong> {request.equipment?.name || 'N/A'}</p>
          <p><strong>Assigned:</strong> {request.assignedTo?.name || 'Unassigned'}</p>
          {request.assignedTo && (
            <div className="avatar">
              {request.assignedTo.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {request.scheduledDate && (
          <div className="card-date">
            {new Date(request.scheduledDate).toLocaleDateString()}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h1>
          Maintenance Requests
          {equipmentId && <span style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: 'normal' }}> (Filtered by Equipment)</span>}
        </h1>
        <button className="btn-new" onClick={() => navigate('/maintenance/new')}>
          + New Request
        </button>
      </div>
      <div className="kanban-board">
        <div
          className="kanban-column"
          onDrop={(e) => handleDrop(e, 'new')}
          onDragOver={handleDragOver}
        >
          <div className="column-header">
            <h2>New</h2>
            <span className="count">{requests.new.length}</span>
          </div>
          <div className="cards-container">
            {requests.new.map(renderCard)}
          </div>
        </div>
        <div
          className="kanban-column"
          onDrop={(e) => handleDrop(e, 'in_progress')}
          onDragOver={handleDragOver}
        >
          <div className="column-header">
            <h2>In Progress</h2>
            <span className="count">{requests.in_progress.length}</span>
          </div>
          <div className="cards-container">
            {requests.in_progress.map(renderCard)}
          </div>
        </div>
        <div
          className="kanban-column"
          onDrop={(e) => handleDrop(e, 'repaired')}
          onDragOver={handleDragOver}
        >
          <div className="column-header">
            <h2>Repaired</h2>
            <span className="count">{requests.repaired.length}</span>
          </div>
          <div className="cards-container">
            {requests.repaired.map(renderCard)}
          </div>
        </div>
        <div
          className="kanban-column"
          onDrop={(e) => handleDrop(e, 'scrap')}
          onDragOver={handleDragOver}
        >
          <div className="column-header">
            <h2>Scrap</h2>
            <span className="count">{requests.scrap.length}</span>
          </div>
          <div className="cards-container">
            {requests.scrap.map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceKanban

