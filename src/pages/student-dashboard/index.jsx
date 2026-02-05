import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';
import WelcomeCard from './components/WelcomeCard';
import AttendanceStatusWidget from './components/AttendanceStatusWidget';
import ServiceCard from './components/ServiceCard';
import RecentGrievanceCard from './components/RecentGrievanceCard';
import NoticeAlertCard from './components/NoticeAlertCard';
import api from "../../utils/api";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ✅ Replace dummy data with state
  const [recentGrievances, setRecentGrievances] = useState([]);
  const [notices, setNotices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [grievanceStats, setGrievanceStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

  const [attendanceData] = useState({
    status: "present",
    lastMarkedTime: "08:45 AM",
    markedDate: "31/01/2026"
  });

  const [notificationCount, setNotificationCount] = useState(0);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' }
  ];

  const serviceCards = [
    {
      title: "Mark Attendance",
      description: "Mark your daily hostel attendance using Wi-Fi validation",
      icon: "CheckSquare",
      route: "/mark-attendance",
      iconColor: "var(--color-success)"
    },
    {
      title: "Submit Grievance",
      description: "Report maintenance issues and facility complaints",
      icon: "MessageSquare",
      route: "/submit-grievance",
      badge: grievanceStats?.pending > 0 ? grievanceStats?.pending : null,
      badgeColor: 'bg-orange-500',
      iconColor: "var(--color-warning)"
    },
    {
      title: "My Grievances",
      description: "Track status of your submitted complaints and requests",
      icon: "FileText",
      route: "/my-grievances",
      badge: grievanceStats?.total,
      badgeColor: 'bg-primary',
      iconColor: "var(--color-primary)"
    },
    {
      title: "Feedback",
      description: "Share your experience and rate hostel facilities",
      icon: "Star",
      route: "/feedback",
      iconColor: "var(--color-accent)"
    },
    {
      title: "Notices",
      description: "View important announcements and hostel updates",
      icon: "Bell",
      route: "/notices-and-alerts",
      badge: notices?.length,
      badgeColor: 'bg-blue-500',
      iconColor: "var(--color-secondary)"
    },
    {
      title: "Alerts",
      description: "Check priority notifications and emergency messages",
      icon: "AlertTriangle",
      route: "/notices-and-alerts",
      badge: alerts?.length,
      badgeColor: 'bg-error',
      iconColor: "var(--color-error)"
    }
  ];

  // ✅ Fetch all data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch student data
        const studentRes = await api.get("/auth/me");
        setStudentData(studentRes.data);
        console.log("✅ Student data:", studentRes.data);

        // Fetch grievances
        const grievancesRes = await api.get("/grievances/my-grievances");
        const allGrievances = grievancesRes.data;
        console.log("✅ Grievances:", allGrievances);

        // Calculate grievance stats
        setGrievanceStats({
          total: allGrievances.length,
          pending: allGrievances.filter(g => g.status === 'pending').length,
          inProgress: allGrievances.filter(g => g.status === 'in-progress').length,
          resolved: allGrievances.filter(g => g.status === 'resolved').length
        });

        // Get latest 3 grievances and format them
        const formattedGrievances = allGrievances
          .slice(0, 3)
          .map(g => ({
            id: g.id,
            category: g.category,
            description: g.description,
            status: g.status === 'in-progress' ? 'In Progress' : 
                    g.status === 'pending' ? 'Submitted' : 'Resolved',
            date: new Date(g.created_at).toLocaleDateString('en-GB')
          }));
        setRecentGrievances(formattedGrievances);

        // Fetch notices
        const noticesRes = await api.get("/notices");
        const allNotices = noticesRes.data;
        console.log("✅ Notices:", allNotices);

        // Separate notices and alerts
        const noticesList = allNotices
          .filter(n => n.type === 'notice')
          .slice(0, 3)
          .map(n => ({
            title: n.title,
            message: n.message,
            date: new Date(n.created_at).toLocaleDateString('en-GB'),
            priority: n.priority
          }));

        const alertsList = allNotices
          .filter(n => n.type === 'alert')
          .slice(0, 3)
          .map(n => ({
            title: n.title,
            message: n.message,
            date: new Date(n.created_at).toLocaleDateString('en-GB'),
            priority: n.priority
          }));

        setNotices(noticesList);
        setAlerts(alertsList);

        // Calculate notification count (unread notices + pending grievances)
        setNotificationCount(
          alertsList.length + 
          allGrievances.filter(g => g.status === 'pending').length
        );

      } catch (err) {
        console.error("❌ Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Student Dashboard - HostelApp</title>
        <meta name="description" content="Access all hostel services including attendance, grievances, feedback, and communications from your student dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <DashboardNavigation userRole="student" notificationCount={notificationCount} />
        <BreadcrumbNavigation items={breadcrumbItems} />

        <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="space-y-6 md:space-y-8">
            <WelcomeCard 
              studentName={studentData?.name}
              roomNumber={studentData?.roomNumber}
              blockNumber={studentData?.blockNumber}
            />

            <AttendanceStatusWidget 
  status={attendanceData?.status}
  lastMarkedTime={attendanceData?.lastMarkedTime}
/>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
                Hostel Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {serviceCards?.map((card, index) => (
                  <ServiceCard key={index} {...card} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <RecentGrievanceCard grievances={recentGrievances} />
              <NoticeAlertCard notices={notices} alerts={alerts} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;