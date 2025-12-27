import api from './auth.api'

const base = '/maintenance-teams'
const unwrapList = (res) =>
  Array.isArray(res?.data?.data) ? res.data.data : res?.data || []

export const getTeams = async () => {
  const res = await api.get(base)
  return { data: unwrapList(res) }
}

export const getTeamById = async (id) => {
  const res = await api.get(`${base}/${id}`)
  return { data: res?.data?.data || res?.data }
}

export const createTeam = async (data) => {
  const res = await api.post(base, data)
  return { data: res?.data?.data || res?.data }
}

export const updateTeam = async (id, data) => {
  const res = await api.put(`${base}/${id}`, data)
  return { data: res?.data?.data || res?.data }
}

export const deleteTeam = async (id) => {
  const res = await api.delete(`${base}/${id}`)
  return { data: res?.data?.data || res?.data }
}

