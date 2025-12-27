import api from './auth.api'

// Mock data for frontend testing
const mockWorkCenters = [
  { _id: '1', name: 'Assembly 1', code: 'ASM-001', tag: 'Assembly', alternativeWorkCenters: 'Assembly 2', costPerHour: 500, capacity: 1.0, timeEfficiency: 100.0, oeeTarget: 34.59 },
  { _id: '2', name: 'Drill 1', code: 'DRL-002', tag: 'Drilling', alternativeWorkCenters: 'Drill 2', costPerHour: 650, capacity: 1.0, timeEfficiency: 100.0, oeeTarget: 90.0 },
  { _id: '3', name: 'Paint Booth', code: 'PNT-003', tag: 'Painting', alternativeWorkCenters: '—', costPerHour: 450, capacity: 0.8, timeEfficiency: 95.0, oeeTarget: 78.5 }
]

export const getWorkCenters = async () => {
  try {
    const response = await api.get('/workcenters')
    return response
  } catch (error) {
    return { data: mockWorkCenters }
  }
}

export const getWorkCenterById = async (id) => {
  try {
    const response = await api.get(`/workcenters/${id}`)
    return response
  } catch (error) {
    return { data: mockWorkCenters.find(wc => wc._id === id) || mockWorkCenters[0] }
  }
}

export const createWorkCenter = async (data) => {
  try {
    const response = await api.post('/workcenters', data)
    return response
  } catch (error) {
    return { data: { ...data, _id: Date.now().toString() } }
  }
}

export const updateWorkCenter = async (id, data) => {
  try {
    const response = await api.put(`/workcenters/${id}`, data)
    return response
  } catch (error) {
    return { data: { ...data, _id: id } }
  }
}

export const deleteWorkCenter = async (id) => {
  try {
    return await api.delete(`/workcenters/${id}`)
  } catch (error) {
    return { data: { success: true } }
  }
}

