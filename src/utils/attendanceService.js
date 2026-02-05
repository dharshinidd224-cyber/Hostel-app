import api from './api';

// Mark attendance
export const markAttendance = async () => {
  try {
    const response = await api.post('/attendance/mark');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to mark attendance' };
  }
};

// Get attendance history
export const getAttendanceHistory = async (limit = 30, offset = 0) => {
  try {
    const response = await api.get(`/attendance/history?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch attendance history' };
  }
};

// Get today's attendance status
export const getTodayAttendance = async () => {
  try {
    const response = await api.get('/attendance/today');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch today\'s attendance' };
  }
};

// Validate WiFi connection (for frontend check)
export const validateWifi = async () => {
  try {
    const response = await api.get('/attendance/validate-wifi');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to validate WiFi' };
  }
};

// Get attendance report (for wardens)
export const getAttendanceReport = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.date) params.append('date', filters.date);
    if (filters.block) params.append('block', filters.block);
    if (filters.department) params.append('department', filters.department);
    if (filters.status) params.append('status', filters.status);
    
    const response = await api.get(`/attendance/report?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch attendance report' };
  }
};

// Auto-mark absent students (for wardens)
export const autoMarkAbsent = async () => {
  try {
    const response = await api.post('/attendance/auto-mark-absent');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to auto-mark absent students' };
  }
};

export default {
  markAttendance,
  getAttendanceHistory,
  getTodayAttendance,
  validateWifi,
  getAttendanceReport,
  autoMarkAbsent
};