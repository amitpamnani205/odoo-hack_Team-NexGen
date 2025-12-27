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

export const getEquipmentCategories = async () => {
  const res = await api.get('/equipment-categories')
  return { data: unwrapList(res) }
}

export const createEquipmentCategory = async (payload) => {
  const res = await api.post('/equipment-categories', payload)
  return { data: res?.data?.data || res?.data }
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
