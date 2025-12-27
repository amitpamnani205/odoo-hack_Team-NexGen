// Skills API - placeholder for backend integration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const getSkills = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`)
    if (!response.ok) throw new Error('Failed to fetch skills')
    return await response.json()
  } catch (error) {
    console.error('Error fetching skills:', error)
    return { success: false, data: [] }
  }
}

export const addSkill = async (skillData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData)
    })
    if (!response.ok) throw new Error('Failed to add skill')
    return await response.json()
  } catch (error) {
    console.error('Error adding skill:', error)
    return { success: false, message: error.message }
  }
}

export const updateSkill = async (skillId, skillData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/skills/${skillId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData)
    })
    if (!response.ok) throw new Error('Failed to update skill')
    return await response.json()
  } catch (error) {
    console.error('Error updating skill:', error)
    return { success: false, message: error.message }
  }
}

export const deleteSkill = async (skillId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/skills/${skillId}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete skill')
    return await response.json()
  } catch (error) {
    console.error('Error deleting skill:', error)
    return { success: false, message: error.message }
  }
}

