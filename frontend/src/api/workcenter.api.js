import api from './auth.api'

const unwrapList = (res) =>
  Array.isArray(res?.data?.data) ? res.data.data : res?.data || []

export const getWorkCenters = async () => {
  const res = await api.get('/work-centers')
  return { data: unwrapList(res) }
}

export const getWorkCenterById = async (id) => {
  const res = await api.get(`/work-centers/${id}`)
  return { data: res?.data?.data || res?.data }
}

export const createWorkCenter = async (data) => {
  const res = await api.post('/work-centers', data)
  return { data: res?.data?.data || res?.data }
}

export const updateWorkCenter = async (id, data) => {
  const res = await api.put(`/work-centers/${id}`, data)
  return { data: res?.data?.data || res?.data }
}

export const deleteWorkCenter = async (id) => {
  const res = await api.delete(`/work-centers/${id}`)
  return { data: res?.data?.data || res?.data }
}

