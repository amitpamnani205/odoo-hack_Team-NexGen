import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { resetPassword as resetPasswordApi } from '../../api/auth.api'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Email required')
      return
    }

    try {
      const response = await resetPasswordApi(email)
      if (response.success) {
        showToast('Reset link sent (demo)')
        setEmail('')
      } else {
        showToast(response.message || 'Email not found')
      }
    } catch (error) {
      showToast('Email not found')
    }
  }

  const showToast = (message) => {
    const toast = document.getElementById('toast')
    if (toast) {
      toast.textContent = message
      toast.classList.add('show')
      setTimeout(() => {
        toast.classList.remove('show')
      }, 2500)
    }
  }

  return (
    <>
      <div className="container">
        <form className="card" onSubmit={handleSubmit}>
          <h2>Forget Password</h2>

          <input
            type="email"
            placeholder="Registered email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
          />
          <small className="error">{error}</small>

          <button type="submit">Reset Password</button>

          <p className="link">
            <span onClick={() => navigate('/login')}>Back to Login</span>
          </p>
        </form>
      </div>

      {/* Toast */}
      <div id="toast"></div>
    </>
  )
}

export default ForgotPassword

