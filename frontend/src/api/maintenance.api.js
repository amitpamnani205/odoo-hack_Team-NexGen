import api from './auth.api'

// Mock data for frontend testing
const mockRequests = [
  { _id: '1', subject: 'Leaking Oil', equipment: { name: 'Generator' }, assignedTo: { name: 'John Carter' }, stage: 'new', completionType: 'corrective', requestDate: new Date().toISOString(), priority: 'high', isOverdue: false },
  { _id: '2', subject: 'Routine Checkup', equipment: { name: 'CNC Machine' }, assignedTo: { name: 'Ravi Kumar' }, stage: 'in_progress', completionType: 'preventive', requestDate: new Date().toISOString(), scheduledDate: new Date(Date.now() + 86400000).toISOString(), priority: 'medium', isOverdue: false },
  { _id: '3', subject: 'HVAC Maintenance', equipment: { name: 'HVAC System' }, assignedTo: { name: 'Ashok Mehta' }, stage: 'new', completionType: 'corrective', requestDate: new Date().toISOString(), priority: 'high', isOverdue: false },
  { _id: '4', subject: 'Forklift Repair', equipment: { name: 'Forklift' }, assignedTo: { name: 'Mary Joseph' }, stage: 'repaired', completionType: 'corrective', requestDate: new Date().toISOString(), priority: 'low', isOverdue: false }
]

export const getMaintenanceRequests = async (params) => {
  try {
    const response = await api.get('/maintenance/requests', { params })
    return response
  } catch (error) {
    let data = [...mockRequests]
    if (params?.equipment) {
      data = data.filter(r => r.equipment?._id === params.equipment)
    }
    return { data }
  }
}

export const getMaintenanceRequestById = async (id) => {
  try {
    const response = await api.get(`/maintenance/requests/${id}`)
    return response
  } catch (error) {
    return { data: mockRequests.find(r => r._id === id) || mockRequests[0] }
  }
}

export const createMaintenanceRequest = async (data) => {
  try {
    const response = await api.post('/maintenance/requests', data)
    return response
  } catch (error) {
    return { data: { ...data, _id: Date.now().toString() } }
  }
}

export const updateMaintenanceRequest = async (id, data) => {
  try {
    const response = await api.put(`/maintenance/requests/${id}`, data)
    return response
  } catch (error) {
    return { data: { ...data, _id: id } }
  }
}

export const deleteMaintenanceRequest = async (id) => {
  try {
    return await api.delete(`/maintenance/requests/${id}`)
  } catch (error) {
    return { data: { success: true } }
  }
}

export const updateMaintenanceRequestStage = async (id, stage) => {
  try {
    const response = await api.patch(`/maintenance/requests/${id}/stage`, { stage })
    return response
  } catch (error) {
    return { data: { _id: id, stage } }
  }
}

export const getPreventiveRequests = async () => {
  try {
    const response = await api.get('/maintenance/requests/preventive')
    return response
  } catch (error) {
    return { data: mockRequests.filter(r => r.completionType === 'preventive') }
  }
}

