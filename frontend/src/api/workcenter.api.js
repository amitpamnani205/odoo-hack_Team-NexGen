import api from './auth.api'

const unwrapList = (res) =>
  Array.isArray(res?.data?.data) ? res.data.data : res?.data || []

export const getWorkCenters = async () => {
  const res = await api.get('/workcenters')
  return { data: unwrapList(res) }
}

export const getWorkCenterById = async (id) => {
  const res = await api.get(`/workcenters/${id}`)
  return { data: res?.data?.data || res?.data }
}

export const createWorkCenter = async (data) => {
  const res = await api.post('/workcenters', data)
  return { data: res?.data?.data || res?.data }
}

export const updateWorkCenter = async (id, data) => {
  const res = await api.put(`/workcenters/${id}`, data)
  return { data: res?.data?.data || res?.data }
}

export const deleteWorkCenter = async (id) => {
  const res = await api.delete(`/workcenters/${id}`)
  return { data: res?.data?.data || res?.data }
}

