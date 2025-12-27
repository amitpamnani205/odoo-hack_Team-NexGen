import { useNavigate } from 'react-router-dom'
import './EquipmentHome.css'

const EquipmentHome = () => {
  const navigate = useNavigate()

  return (
    <div className="equipment-home">
      <div className="equipment-home__content">
        <div className="equipment-home__header">
          <h1>Equipment</h1>
          <p className="muted">Choose what you want to manage.</p>
        </div>
        <div className="equipment-home__grid">
          <div className="equipment-card" onClick={() => navigate('/work-centers')}>
            <div className="equipment-card__title">Work Centers</div>
            <p className="equipment-card__desc">
              Configure production/maintenance work centers with cost, capacity, and efficiency.
            </p>
            <span className="equipment-card__link">Open</span>
          </div>
          <div className="equipment-card" onClick={() => navigate('/equipment')}>
            <div className="equipment-card__title">Machines &amp; Tools</div>
            <p className="equipment-card__desc">
              Create and manage equipment assets. Maintenance team auto-assigns from category.
            </p>
            <span className="equipment-card__link">Open</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipmentHome

