import axios from 'axios'

// Backend default: http://localhost:3000/api/v1 (override with VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true // needed to receive/send httpOnly JWT cookie
})

// Add token header if stored (backend also accepts cookie)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  // backend sets httpOnly cookie; also return user for UI
  return response
}

export const signup = async (name, email, password, role) => {
  const response = await api.post('/auth/signup', { name, email, password, role })
  return response
}

export const logout = async () => {
  return api.post('/auth/logout')
}

export const resetPassword = async (email) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock password reset
  return {
    success: true,
    message: 'Reset link sent (demo)'
  }
}

export default api

