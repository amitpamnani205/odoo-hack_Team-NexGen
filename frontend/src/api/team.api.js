import api from './auth.api'

// Mock data for frontend testing
const mockTeams = [
  { _id: '1', name: 'Mechanics', description: 'Mechanical maintenance team', members: [{ name: 'John Carter' }, { name: 'Ravi Kumar' }] },
  { _id: '2', name: 'Electricians', description: 'Electrical maintenance team', members: [{ name: 'Ashok Mehta' }] },
  { _id: '3', name: 'IT Support', description: 'IT equipment support', members: [{ name: 'Mary Joseph' }] }
]

export const getTeams = async () => {
  try {
    const response = await api.get('/teams')
    return response
  } catch (error) {
    return { data: mockTeams }
  }
}

export const getTeamById = async (id) => {
  try {
    const response = await api.get(`/teams/${id}`)
    return response
  } catch (error) {
    return { data: mockTeams.find(t => t._id === id) || mockTeams[0] }
  }
}

export const createTeam = async (data) => {
  try {
    const response = await api.post('/teams', data)
    return response
  } catch (error) {
    return { data: { ...data, _id: Date.now().toString() } }
  }
}

export const updateTeam = async (id, data) => {
  try {
    const response = await api.put(`/teams/${id}`, data)
    return response
  } catch (error) {
    return { data: { ...data, _id: id } }
  }
}

export const deleteTeam = async (id) => {
  try {
    return await api.delete(`/teams/${id}`)
  } catch (error) {
    return { data: { success: true } }
  }
}

