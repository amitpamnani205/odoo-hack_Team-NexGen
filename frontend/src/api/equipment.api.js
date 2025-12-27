import api from './auth.api'

const unwrapList = (res) =>
  Array.isArray(res?.data?.data) ? res.data.data : res?.data || []

export const getEquipment = async () => {
  const res = await api.get('/equipment')
  return { data: unwrapList(res) }
}

export const createEquipment = async (data) => {
  const res = await api.post('/equipment', data)
  return { data: res?.data?.data || res?.data }
}

// Backend currently exposes only list/create; add by-id handlers when backend supports them
export const getEquipmentCategories = async () => {
  const res = await api.get('/equipment-categories')
  return { data: unwrapList(res) }
}

export const getEquipmentById = async (id) => {
  const res = await api.get(`/equipment/${id}`)
  return { data: res?.data?.data || res?.data }
}

export const updateEquipment = async (id, payload) => {
  const res = await api.put(`/equipment/${id}`, payload)
  return { data: res?.data?.data || res?.data }
}

export const deleteEquipment = async (id) => {
  const res = await api.delete(`/equipment/${id}`)
  return { data: res?.data?.data || res?.data }
}

