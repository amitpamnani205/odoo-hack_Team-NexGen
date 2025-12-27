import { createContext, useContext, useState, useEffect } from 'react'
import * as authAPI from '../api/auth.api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    // Return default values if not in AuthProvider
    return {
      user: null,
      login: async () => ({ success: false, error: 'Not implemented' }),
      signup: async () => ({ success: false, error: 'Not implemented' }),
      logout: () => {},
      loading: false
    }
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      const userData = response?.data?.data || response?.data?.user || response?.data
      const token = response?.data?.token || 'session-cookie'
      if (userData) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      }
      return { success: false, error: 'Invalid login response' }
    } catch (error) {
      return { success: false, error: error?.response?.data?.message || 'Login failed' }
    }
  }

  const signup = async (name, email, password, role) => {
    try {
      const response = await authAPI.signup(name, email, password, role)
      const userData = response?.data?.data || response?.data?.user || response?.data
      const token = response?.data?.token || 'session-cookie'
      if (userData) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        return { success: true }
      }
      return { success: false, error: 'Invalid signup response' }
    } catch (error) {
      return { success: false, error: error?.response?.data?.message || 'Signup failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

