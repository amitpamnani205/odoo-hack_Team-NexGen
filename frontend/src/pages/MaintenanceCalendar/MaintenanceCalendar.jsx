import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as maintenanceAPI from '../../api/maintenance.api'
import './MaintenanceCalendar.css'

const MaintenanceCalendar = () => {
  const navigate = useNavigate()
  const [preventiveRequests, setPreventiveRequests] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPreventiveRequests()
  }, [])

  const fetchPreventiveRequests = async () => {
    try {
      const response = await maintenanceAPI.getPreventiveRequests()
      setPreventiveRequests(response.data || [])
    } catch (error) {
      console.error('Error fetching preventive requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getRequestsForDate = (date) => {
    if (!date) return []
    return preventiveRequests.filter(req => {
      const reqDate = new Date(req.scheduledDate)
      return reqDate.toDateString() === date.toDateString()
    })
  }

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date)
      navigate('/maintenance/new', { state: { scheduledDate: date.toISOString().split('T')[0] } })
    }
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const days = getDaysInMonth(currentMonth)
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>Maintenance Calendar</h1>
        <button className="btn-new" onClick={() => navigate('/maintenance/new')}>
          + New Request
        </button>
      </div>
      <div className="calendar-controls">
        <button onClick={previousMonth} className="nav-btn">‹</button>
        <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
        <button onClick={nextMonth} className="nav-btn">›</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {weekDays.map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {days.map((date, index) => {
            const requests = getRequestsForDate(date)
            return (
              <div
                key={index}
                className={`calendar-day ${!date ? 'empty' : ''} ${date && date.toDateString() === new Date().toDateString() ? 'today' : ''}`}
                onClick={() => handleDateClick(date)}
              >
                {date && (
                  <>
                    <div className="day-number">{date.getDate()}</div>
                    {requests.length > 0 && (
                      <div className="day-requests">
                        {requests.slice(0, 3).map((req, idx) => (
                          <div key={req._id || req.id || idx} className="request-dot" title={req.subject}>
                            {req.subject.substring(0, 1)}
                          </div>
                        ))}
                        {requests.length > 3 && (
                          <div className="more-requests">+{requests.length - 3}</div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MaintenanceCalendar

