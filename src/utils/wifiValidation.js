// Check if current time is within attendance window (e.g., 6 AM - 11 PM)
export const isWithinAttendanceWindow = () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Attendance window: 6 AM to 11 PM
  const startHour = 6;
  const endHour = 23;
  
  return currentHour >= startHour && currentHour < endHour;
};

// Get time remaining in the attendance window (in minutes)
export const getTimeRemainingInWindow = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const endHour = 23; // 11 PM
  
  if (currentHour >= endHour) {
    return 0; // Window closed
  }
  
  const hoursRemaining = endHour - currentHour - 1;
  const minutesRemaining = 60 - currentMinute;
  
  return (hoursRemaining * 60) + minutesRemaining;
};

// Get time until the attendance window opens (in minutes)
export const getTimeUntilWindow = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const startHour = 6; // 6 AM
  
  if (currentHour >= startHour && currentHour < 23) {
    return 0; // Window is open
  }
  
  let hoursUntilStart;
  
  if (currentHour < startHour) {
    // Before 6 AM today
    hoursUntilStart = startHour - currentHour - 1;
  } else {
    // After 11 PM, wait until 6 AM tomorrow
    hoursUntilStart = (24 - currentHour) + startHour - 1;
  }
  
  const minutesUntilStart = 60 - currentMinute;
  
  return (hoursUntilStart * 60) + minutesUntilStart;
};

// Format minutes into hours and minutes string
export const formatTimeRemaining = (minutes) => {
  if (minutes <= 0) return "Window closed";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

// Check if connected to hostel WiFi (mock implementation)
// In production, this would check actual WiFi SSID
export const isConnectedToHostelWifi = () => {
  // Mock implementation - always returns true for development
  // In production, you'd use navigator.connection or backend verification
  return true;
};