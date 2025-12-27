import api from './auth.api'

const base = '/maintenance-requests'

export const getMaintenanceRequests = async (params) => {
  const res = await api.get(base, { params })
  const data = Array.isArray(res?.data?.data) ? res.data.data : res.data
  return { data }
}

export const getMaintenanceRequestById = async (id) => {
  const res = await api.get(`${base}/${id}`)
  const data = res?.data?.data || res.data
  return { data }
}

export const createMaintenanceRequest = async (payload) => {
  const res = await api.post(base, payload)
  const data = res?.data?.data || res.data
  return { data }
}

export const updateMaintenanceRequest = async (id, payload) => {
  const res = await api.put(`${base}/${id}`, payload)
  const data = res?.data?.data || res.data
  return { data }
}

export const deleteMaintenanceRequest = async (id) => {
  const res = await api.delete(`${base}/${id}`)
  const data = res?.data?.data || res.data
  return { data }
}

export const updateMaintenanceRequestStage = async (id, stage) => {
  const res = await api.put(`${base}/${id}/stage`, { stage })
  const data = res?.data?.data || res.data
  return { data }
}

export const getPreventiveRequests = async () => {
  const res = await api.get(`${base}/calendar/preventive`)
  const data = Array.isArray(res?.data?.data) ? res.data.data : res.data
  return { data }
}

