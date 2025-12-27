import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Mock authentication - works without backend
export const login = async (userId, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock successful login - accept any credentials
  return {
    data: {
      token: 'mock-token-' + Date.now(),
      user: {
        id: '1',
        name: userId || 'User',
        email: userId + '@example.com'
      }
    }
  }
}

export const signup = async (name, email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock successful signup
  return {
    data: {
      token: 'mock-token-' + Date.now(),
      user: {
        id: '1',
        name: name,
        email: email
      }
    }
  }
}

export default api

