// Matches API - placeholder for backend integration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getMatches = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`)
    if (!response.ok) throw new Error('Failed to fetch matches')
    return await response.json()
  } catch (error) {
    console.error('Error fetching matches:', error)
    return { success: false, data: [] }
  }
}

export const createMatch = async (matchData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData)
    })
    if (!response.ok) throw new Error('Failed to create match')
    return await response.json()
  } catch (error) {
    console.error('Error creating match:', error)
    return { success: false, message: error.message }
  }
}

export const acceptMatch = async (matchId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}/accept`, {
      method: 'PUT'
    })
    if (!response.ok) throw new Error('Failed to accept match')
    return await response.json()
  } catch (error) {
    console.error('Error accepting match:', error)
    return { success: false, message: error.message }
  }
}

export const rejectMatch = async (matchId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}/reject`, {
      method: 'PUT'
    })
    if (!response.ok) throw new Error('Failed to reject match')
    return await response.json()
  } catch (error) {
    console.error('Error rejecting match:', error)
    return { success: false, message: error.message }
  }
}

