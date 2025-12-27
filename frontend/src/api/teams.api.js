// Teams API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getTeams = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`)
    if (!response.ok) throw new Error('Failed to fetch teams')
    return await response.json()
  } catch (error) {
    console.error('Error fetching teams:', error)
    return { success: false, data: [] }
  }
}

export const getTeamById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`)
    if (!response.ok) throw new Error('Failed to fetch team')
    return await response.json()
  } catch (error) {
    console.error('Error fetching team:', error)
    return { success: false, message: error.message }
  }
}

export const createTeam = async (teamData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData)
    })
    if (!response.ok) throw new Error('Failed to create team')
    return await response.json()
  } catch (error) {
    console.error('Error creating team:', error)
    return { success: false, message: error.message }
  }
}

export const updateTeam = async (id, teamData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData)
    })
    if (!response.ok) throw new Error('Failed to update team')
    return await response.json()
  } catch (error) {
    console.error('Error updating team:', error)
    return { success: false, message: error.message }
  }
}

export const deleteTeam = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete team')
    return await response.json()
  } catch (error) {
    console.error('Error deleting team:', error)
    return { success: false, message: error.message }
  }
}

