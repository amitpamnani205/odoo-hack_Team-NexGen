import api from './auth.api'

// Mock data for frontend testing
const mockEquipment = [
  { _id: '1', name: 'Air Compressor', department: 'Production', workCenter: { name: 'Assembly 1' }, technician: { name: 'John Carter' }, category: { name: 'Machinery' } },
  { _id: '2', name: 'Pump 1', department: 'Maintenance', workCenter: { name: 'Drill 1' }, technician: { name: 'Ravi Kumar' }, category: { name: 'Pumps' } },
  { _id: '3', name: 'Motor', department: 'Production', workCenter: { name: 'Assembly 1' }, technician: { name: 'Ashok Mehta' }, category: { name: 'Electrical' } }
]

const mockCategories = [
  { _id: '1', name: 'Computers', responsible: 'OdooBot', company: 'My Company (San Francisco)' },
  { _id: '2', name: 'Software', responsible: 'OdooBot', company: 'My Company (San Francisco)' },
  { _id: '3', name: 'Monitors', responsible: 'Mitchell Admin', company: 'My Company (San Francisco)' }
]

export const getEquipment = async () => {
  try {
    const response = await api.get('/equipment')
    return response
  } catch (error) {
    return { data: mockEquipment }
  }
}

export const getEquipmentById = async (id) => {
  try {
    const response = await api.get(`/equipment/${id}`)
    return response
  } catch (error) {
    return { data: mockEquipment.find(eq => eq._id === id) || mockEquipment[0] }
  }
}

export const createEquipment = async (data) => {
  try {
    const response = await api.post('/equipment', data)
    return response
  } catch (error) {
    return { data: { ...data, _id: Date.now().toString() } }
  }
}

export const updateEquipment = async (id, data) => {
  try {
    const response = await api.put(`/equipment/${id}`, data)
    return response
  } catch (error) {
    return { data: { ...data, _id: id } }
  }
}

export const deleteEquipment = async (id) => {
  try {
    return await api.delete(`/equipment/${id}`)
  } catch (error) {
    return { data: { success: true } }
  }
}

export const getEquipmentCategories = async () => {
  try {
    const response = await api.get('/equipment/categories')
    return response
  } catch (error) {
    return { data: mockCategories }
  }
}

export const getEquipmentByEquipment = async (equipmentId) => {
  try {
    const response = await api.get(`/equipment/${equipmentId}/requests`)
    return response
  } catch (error) {
    return { data: [] }
  }
}

