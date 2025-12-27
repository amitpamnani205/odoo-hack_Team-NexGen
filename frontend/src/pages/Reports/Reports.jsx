import { useState, useEffect } from 'react'
import * as reportsAPI from '../../api/reports.api'
import './Reports.css'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState('reports')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReports()
    fetchCategories()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await reportsAPI.getReports()
      setReports(response.data || [])
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await reportsAPI.getReportCategories()
      setCategories(response.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  return (
    <div className="reports-container">
      <div className="content">
        <div className="table-card">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button
              className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              Report Categories
            </button>
          </div>
          <div className="table-content">
            {activeTab === 'reports' ? (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Report</th>
                    <th>Report Type</th>
                    <th>Created By</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                        Loading...
                      </td>
                    </tr>
                  ) : reports.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                        No reports found
                      </td>
                    </tr>
                  ) : (
                    reports.map((report) => (
                      <tr key={report._id || report.id}>
                        <td>{report.name}</td>
                        <td>{report.type}</td>
                        <td>{report.createdBy?.name || 'N/A'}</td>
                        <td>{new Date(report.createdDate || report.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                        Loading...
                      </td>
                    </tr>
                  ) : categories.length === 0 ? (
                    <tr>
                      <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                        No categories found
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category._id || category.id}>
                        <td>{category.name}</td>
                        <td>{category.description || 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports

