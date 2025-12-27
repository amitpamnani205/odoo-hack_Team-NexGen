import api from './auth.api'

export const getReports = async () => {
  const res = await api.get('/reports')
  return { data: res?.data?.data || res?.data }
}

export const getReportCategories = async () => {
  const res = await api.get('/reports/categories')
  return { data: res?.data?.data || res?.data }
}

export const generateReport = async (reportType, params) => {
  const res = await api.post(`/reports/${reportType}`, params)
  return { data: res?.data?.data || res?.data }
}

