import api from './auth.api'

// Mock data for frontend testing
const mockReports = [
  { _id: '1', name: 'Work Order Report', type: 'Work Order', createdBy: { name: 'Admin' }, createdDate: new Date().toISOString() },
  { _id: '2', name: 'Maintenance Report', type: 'Maintenance', createdBy: { name: 'Manager' }, createdDate: new Date().toISOString() },
  { _id: '3', name: 'Asset Report', type: 'Asset', createdBy: { name: 'Admin' }, createdDate: new Date().toISOString() },
  { _id: '4', name: 'Technician Report', type: 'Technician', createdBy: { name: 'Manager' }, createdDate: new Date().toISOString() },
  { _id: '5', name: 'Overdue Report', type: 'Overdue', createdBy: { name: 'Admin' }, createdDate: new Date().toISOString() }
]

const mockCategories = [
  { _id: '1', name: 'Work Order', description: 'Work order related reports' },
  { _id: '2', name: 'Maintenance', description: 'Maintenance related reports' },
  { _id: '3', name: 'Asset', description: 'Asset related reports' },
  { _id: '4', name: 'Technician', description: 'Technician related reports' },
  { _id: '5', name: 'Overdue', description: 'Overdue maintenance reports' }
]

export const getReports = async () => {
  try {
    const response = await api.get('/reports')
    return response
  } catch (error) {
    return { data: mockReports }
  }
}

export const getReportCategories = async () => {
  try {
    const response = await api.get('/reports/categories')
    return response
  } catch (error) {
    return { data: mockCategories }
  }
}

export const generateReport = async (reportType, params) => {
  try {
    const response = await api.post(`/reports/${reportType}`, params)
    return response
  } catch (error) {
    return { data: { type: reportType, ...params } }
  }
}

