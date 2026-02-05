import React, { useState, useEffect } from 'react';
import { markAttendance, getTodayAttendance } from '../../../utils/attendanceService';
import { isWithinAttendanceWindow, getTimeRemainingInWindow, getTimeUntilWindow } from '../../../utils/wifiValidation';

const AttendanceCard = ({ studentInfo, onMarkSuccess }) => {
  const [todayAttendance, setTodayAttendance] = useState({
    marked: false,
    timestamp: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeInfo, setTimeInfo] = useState({
    isInWindow: false,
    timeRemaining: null,
    timeUntil: null
  });

  // Check today's attendance on component mount
  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  // Update time info every minute
  useEffect(() => {
    updateTimeInfo();
    const interval = setInterval(updateTimeInfo, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const updateTimeInfo = () => {
    const isInWindow = isWithinAttendanceWindow();
    setTimeInfo({
      isInWindow,
      timeRemaining: isInWindow ? getTimeRemainingInWindow() : null,
      timeUntil: !isInWindow ? getTimeUntilWindow() : null
    });
  };

  const fetchTodayAttendance = async () => {
    try {
      const response = await getTodayAttendance();
      if (response.success && response.data.marked) {
        const attendance = response.data.attendance;
        setTodayAttendance({
          marked: true,
          timestamp: formatTime(attendance.time_marked)
        });
      }
    } catch (err) {
      console.error('Error fetching today\'s attendance:', err);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return null;
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleMarkAttendance = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await markAttendance();
      
      if (response.success) {
        const formattedTime = formatTime(response.data.time_marked);
        setTodayAttendance({
          marked: true,
          timestamp: formattedTime
        });
        
        if (onMarkSuccess) {
          onMarkSuccess(formattedTime);
        }
      }
    } catch (err) {
      console.error('Error marking attendance:', err);
      
      let errorMessage = 'Failed to mark attendance';
      
      if (err.error === 'INVALID_WIFI') {
        errorMessage = 'You must be connected to hostel WiFi to mark attendance';
      } else if (err.error === 'INVALID_TIME') {
        errorMessage = 'Attendance can only be marked between 8:00 PM and 11:59 PM';
      } else if (err.error === 'ALREADY_MARKED') {
        errorMessage = 'Attendance already marked for today';
        // Update state to show already marked
        setTodayAttendance({
          marked: true,
          timestamp: formatTime(err.data?.time)
        });
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-md border border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Mark Attendance</h2>
        <p className="text-sm text-muted-foreground">
          Daily attendance window: 8:00 PM - 11:59 PM
        </p>
      </div>

      {/* Student Info */}
      <div className="bg-background rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Name</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">College ID</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.collegeId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Block & Room</p>
            <p className="text-sm font-medium text-foreground">
              Block {studentInfo.block}, Room {studentInfo.room}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Department</p>
            <p className="text-sm font-medium text-foreground">{studentInfo.department}</p>
          </div>
        </div>
      </div>

      {/* Time Window Info */}
      {!timeInfo.isInWindow && timeInfo.timeUntil && (
        <div className="bg-warning/10 border border-warning rounded-lg p-4 mb-4">
          <p className="text-sm text-warning">
            ⏰ Attendance window opens in {timeInfo.timeUntil}
          </p>
        </div>
      )}

      {timeInfo.isInWindow && timeInfo.timeRemaining && !todayAttendance.marked && (
        <div className="bg-primary/10 border border-primary rounded-lg p-4 mb-4">
          <p className="text-sm text-primary">
            ⏱️ {timeInfo.timeRemaining} remaining to mark attendance
          </p>
        </div>
      )}

      {/* Attendance Status */}
      {todayAttendance.marked ? (
        <div className="bg-success/10 border border-success rounded-lg p-6 text-center">
          <div className="text-success text-5xl mb-3">✓</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Attendance Marked Successfully
          </h3>
          <p className="text-sm text-muted-foreground">
            Marked at {todayAttendance.timestamp}
          </p>
        </div>
      ) : (
        <>
          <button
            onClick={handleMarkAttendance}
            disabled={isLoading || !timeInfo.isInWindow}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
              isLoading || !timeInfo.isInWindow
                ? 'bg-muted cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 active:scale-95'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Marking Attendance...
              </span>
            ) : !timeInfo.isInWindow ? (
              'Attendance Window Closed'
            ) : (
              'Mark My Attendance'
            )}
          </button>

          {error && (
            <div className="mt-4 bg-error/10 border border-error rounded-lg p-4">
              <p className="text-sm text-error">❌ {error}</p>
            </div>
          )}
        </>
      )}

      {/* Requirements Notice */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground mb-3">Requirements to mark attendance:</p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="text-primary">•</span>
            <span>Connected to hostel WiFi network (SSID: Student)</span>
          </li>
          <li className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="text-primary">•</span>
            <span>Within time window: 8:00 PM - 11:59 PM</span>
          </li>
          <li className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="text-primary">•</span>
            <span>Can only mark once per day</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AttendanceCard;