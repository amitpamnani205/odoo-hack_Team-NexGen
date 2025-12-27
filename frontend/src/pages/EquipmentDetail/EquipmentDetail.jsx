import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as equipmentAPI from '../../api/equipment.api';
import * as maintenanceAPI from '../../api/maintenance.api';
import './EquipmentDetail.css';

const EquipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [maintenanceCount, setMaintenanceCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const resEq = await equipmentAPI.getEquipmentById(id);
        const eqData = resEq?.data?.data || resEq?.data || null;
        setEquipment(eqData);

        const resReq = await maintenanceAPI.getMaintenanceRequests({ equipmentId: id });
        const reqData = Array.isArray(resReq?.data?.data) ? resReq.data.data : resReq?.data || [];
        setMaintenanceCount(reqData.length);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || 'Unable to load equipment');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const statusLabel = useMemo(() => (equipment?.isScrapped ? 'Scrapped' : 'Active'), [equipment]);

  if (loading) {
    return <div className="equipment-detail"><div className="content">Loading...</div></div>;
  }

  if (error) {
    return <div className="equipment-detail"><div className="content"><div className="error-message">{error}</div></div></div>;
  }

  if (!equipment) {
    return <div className="equipment-detail"><div className="content"><div className="error-message">Equipment not found</div></div></div>;
  }

  return (
    <div className="equipment-detail">
      <div className="content">
        <div className="detail-card">
          <div className="detail-header">
            <div>
              <h1>{equipment.name}</h1>
              <p className="muted">{equipment.serialNumber}</p>
            </div>
            <div className="header-actions">
              <button className="btn-ghost" onClick={() => navigate(`/equipment/${id}/edit`)}>Edit</button>
              <button className="btn-primary" onClick={() => navigate('/maintenance/new', { state: { equipmentId: id } })}>
                + New Maintenance
              </button>
            </div>
          </div>

          <div className="smart-buttons">
            <button className="smart-btn" onClick={() => navigate('/maintenance', { state: { equipmentId: id } })}>
              Maintenance ({maintenanceCount})
            </button>
          </div>

          <div className="detail-grid">
            <div className="detail-group">
              <label>Category</label>
              <div>{equipment.categoryId?.name || '—'}</div>
            </div>
            <div className="detail-group">
              <label>Maintenance Team</label>
              <div>
                {equipment.maintenanceTeamId?.name ||
                  equipment.categoryId?.defaultMaintenanceTeam?.name ||
                  'Auto from category'}
              </div>
            </div>
            <div className="detail-group">
              <label>Assigned To</label>
              <div>{equipment.assignedToType || '—'} {equipment.assignedToId ? `(${equipment.assignedToId})` : ''}</div>
            </div>
            <div className="detail-group">
              <label>Technician</label>
              <div>{equipment.defaultTechnicianId || '—'}</div>
            </div>
            <div className="detail-group">
              <label>Location</label>
              <div>{equipment.location || '—'}</div>
            </div>
            <div className="detail-group">
              <label>Work Center</label>
              <div>{equipment.workCenter || '—'}</div>
            </div>
            <div className="detail-group">
              <label>Status</label>
              <div className={`status-pill ${equipment.isScrapped ? 'scrapped' : 'active'}`}>{statusLabel}</div>
            </div>
            <div className="detail-group">
              <label>Assigned Date</label>
              <div>{equipment.assignedDate ? new Date(equipment.assignedDate).toLocaleDateString() : '—'}</div>
            </div>
          </div>

          <div className="detail-group full">
            <label>Description</label>
            <div className="description-box">{equipment.description || '—'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
