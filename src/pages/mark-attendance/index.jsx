import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';
import AttendanceStatusCard from './components/AttendanceStatusCard';
import WiFiValidationCard from './components/WiFiValidationCard';
import AttendanceHistoryWidget from './components/AttendanceHistoryWidget';
import AttendancePolicyCard from './components/AttendancePolicyCard';
import Icon from '../../components/AppIcon';

// ✅ Dynamic API URL - works for both localhost and network
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MarkAttendance = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  //const [isMarked, setIsMarked] = useState(false);
  const [todayMarked, setIsMarkedToday] = useState(false);
  const [markedTime, setMarkedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [wifiStatus, setWifiStatus] = useState({
    isConnected: false,
    isValidNetwork: false,
    networkName: 'Checking...',
    clientIP: ''
  });

  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [currentStreak, setCurrentStreak] = useState(0);
  //const currentStreak = 3;
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Mark Attendance', path: '/mark-attendance' }
  ];

  // ✅ Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ WiFi status check with dynamic API URL
  useEffect(() => {
    const checkWiFiStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${API_URL}/api/attendance/validate-wifi`, // ✅ Using API_URL
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();
        
        console.log('🔍 WiFi Response:', data);
        
        setWifiStatus({
          isConnected: true,
          isValidNetwork: data.isHostelWifi,
          networkName: data.isHostelWifi ? 'Hostel WiFi' : 'Non-College WiFi',
          clientIP: data.ip || 'unknown'
        });

      } catch (err) {
        console.log('❌ Backend Offline - Using fallback');
        setWifiStatus({
          isConnected: true,
          isValidNetwork: false,
          networkName: 'Backend Offline',
          clientIP: 'Unknown'
        });
      }
    };

    checkWiFiStatus();
    const interval = setInterval(checkWiFiStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Attendance history with dynamic API URL
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.error('No token found');
          return;
        }

        const res = await fetch(
          `${API_URL}/api/attendance/history`, // ✅ Using API_URL
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (res.status === 401) {
          console.error('Token expired or invalid');
          localStorage.removeItem('token');
          localStorage.removeItem('studentId');
          localStorage.removeItem('userId');
          navigate('/login');
          return;
        }

        const data = await res.json();
        console.log("Attendance API response:", data);


        if (data.success) {
          setAttendanceRecords(data.records);
          setIsMarkedToday(data.todayMarked);   // ✅ backend truth
  setCurrentStreak(data.currentStreak); 

        }
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      }
    };

    fetchAttendance();
  }, [navigate]);

  const formatDate = (date) => date?.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const formatTime = (date) => date?.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  // ✅ Mark attendance with dynamic API URL
  const handleMarkAttendance = async () => {
    if (!wifiStatus.isValidNetwork || todayMarked || isLoading) {
      if (!wifiStatus.isValidNetwork) {
        alert(`⚠️ Connect to Hostel WiFi!\nCurrent IP: ${wifiStatus.clientIP}\nRequired: 192.168.100.x - 192.168.111.x`);
      }
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const studentId = localStorage.getItem('studentId') || 
                        localStorage.getItem('userId') ;
      
      console.log('🔍 Marking attendance for:', studentId);
      
      const res = await fetch(`${API_URL}/api/attendance/mark`, { // ✅ Using API_URL
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({})
      });

      const data = await res.json();
      console.log('📡 Backend response:', data);

      /*if (res.status === 403) {
        setErrorMessage(`WiFi Access Denied: ${data.currentIP}`);
        alert(`❌ WiFi Blocked!\nIP: ${data.currentIP}\nRequired: Hostel WiFi (192.168.100.x - 192.168.111.x)`);
        return;
      }*/

      if (!res.ok) {
        setErrorMessage(data.error || 'Attendance failed');
        alert(data.error || 'Failed to mark attendance');
        return;
      }

      // ✅ SUCCESS
      const now = new Date();
      setMarkedTime(formatTime(now));
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 4000);
      
    } catch (err) {
      setErrorMessage('Backend not responding');
      console.error('❌ Backend error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-6">
      <DashboardNavigation userRole="student" notificationCount={3} />
      <BreadcrumbNavigation items={breadcrumbItems} />
      
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="group flex items-center gap-2 px-4 py-2 text-sm md:text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
          >
            <Icon name="ArrowLeft" size={18} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="inline-block mb-3">
                <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <Icon name="Calendar" size={14} />
                  <span>Daily Check-in</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Mark Attendance
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Record your daily hostel presence with Wi-Fi validation
              </p>
            </div>
            
            {/* 🆕 TODAY'S DEADLINE - RIGHT OF MARK ATTENDANCE */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 min-w-[280px]">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Clock" size={16} color="#6b7280" />
                <h3 className="text-sm font-bold text-gray-900">
                  Today's Deadline
                </h3>
              </div>
              <div className="text-center py-3 bg-gray-50 rounded-lg">
                <div className="text-3xl font-extrabold text-blue-600 mb-1">
                  11:59 PM
                </div>
                <p className="text-xs text-gray-600">
                  Time remaining to mark attendance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WiFi Status Banner */}
        <div className="mb-6 md:mb-8">
          <div className={`rounded-xl p-4 border-2 transition-all duration-300 ${
            wifiStatus.isValidNetwork 
              ? 'bg-green-50 border-green-200 hover:border-green-300' 
              : 'bg-red-50 border-red-200 hover:border-red-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                wifiStatus.isValidNetwork 
                  ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' 
                  : 'bg-red-500 shadow-lg shadow-red-500/50'
              }`} />
              <div className="flex-1">
                <span className={`font-semibold ${
                  wifiStatus.isValidNetwork ? 'text-green-900' : 'text-red-900'
                }`}>
                  {wifiStatus.networkName}
                </span>
                <span className={`text-sm ml-2 ${
                  wifiStatus.isValidNetwork ? 'text-green-700' : 'text-red-700'
                }`}>
                  IP: {wifiStatus.clientIP}
                </span>
              </div>
              {wifiStatus.isValidNetwork ? (
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1.5 rounded-full">
                  <Icon name="CheckCircle2" size={16} color="#16a34a" />
                  <span className="text-xs font-semibold text-green-700">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-100 px-3 py-1.5 rounded-full">
                  <Icon name="XCircle" size={16} color="#dc2626" />
                  <span className="text-xs font-semibold text-red-700">Disconnected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 md:mb-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 hover:border-red-300 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="AlertTriangle" size={20} color="#dc2626" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 mb-1">Error</h4>
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content - Professional White Cards */}
        <div className="space-y-6 md:space-y-8">
          <AttendanceStatusCard
            isMarked={todayMarked}
            currentDate={formatDate(currentTime)}
            currentTime={formatTime(currentTime)}
            markedTime={markedTime}
          />

          <WiFiValidationCard
            isConnected={wifiStatus.isConnected}
            isValidNetwork={wifiStatus.isValidNetwork}
            networkName={wifiStatus.networkName}
            clientIP={wifiStatus.clientIP}
            onMarkAttendance={handleMarkAttendance}
            isLoading={isLoading}
            isMarked={todayMarked}
          />

          <AttendanceHistoryWidget
            attendanceRecords={attendanceRecords}
            currentStreak={currentStreak}
          />
        </div>
      </div>

      {/* Success Modal - Enhanced */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 max-w-md w-full border border-gray-100 animate-in zoom-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50 animate-in zoom-in duration-700">
                <Icon name="CheckCircle2" size={48} color="white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Attendance Marked!
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Your attendance has been successfully recorded for today at{' '}
                <span className="font-semibold text-green-600">{markedTime}</span>.
              </p>
              <div className="flex items-center justify-center gap-2 bg-green-50 px-4 py-3 rounded-xl border border-green-200">
                <Icon name="CheckCircle2" size={18} color="#16a34a" />
                <span className="text-sm font-semibold text-green-700">You're all set for today</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;