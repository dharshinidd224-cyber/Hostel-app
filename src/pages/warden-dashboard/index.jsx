import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SummaryCard from './components/SummaryCard';
import AttendanceWidget from './components/AttendanceWidget';
import QuickActionCard from './components/QuickActionCard';
import ActivityTimeline from './components/ActivityTimeline';
import BlockFilter from './components/BlockFilter';
import api from '../../utils/api';


const API_URL = "http://localhost:5000"; // change if deployed


const WardenDashboard = () => {
  const [selectedDate] = useState(
  new Date().toISOString().split("T")[0]
);
const [summaryData, setSummaryData] = useState([]);

  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [loading, setLoading] = useState(true);

  // ✅ State for real data
 const [summary, setSummary] = useState({
  total: 0,
  present: 0,
  absent: 0,
  percentage: 0
});

useEffect(() => {
  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    
    // Add block parameter if not 'all'
    const blockParam = selectedBlock !== 'all' ? `&block=${selectedBlock}` : '';
    const url = `${API_URL}/api/attendance/summary?date=${selectedDate}${blockParam}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (data.success) {
      setSummary({
        total: data.total || 0,
        present: data.present || 0,
        absent: data.absent || 0,
        percentage: parseFloat(data.percentage) || 0
      });
    }
  };

  fetchSummary();
}, [selectedDate, selectedBlock]);  // ✅ Add selectedBlock as dependency

  const [recentActivities, setRecentActivities] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/warden-dashboard' }
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Attendance Monitoring',
      description: 'View and manage daily student attendance records',
      icon: 'Users',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      actionText: 'View Attendance',
      actionPath: '/attendance-monitoring',
      badge: null
    },
    {
      id: 2,
      title: 'Grievance Management',
      description: 'Review and resolve student complaints and issues',
      icon: 'AlertCircle',
      iconColor: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      actionText: 'Manage Grievances',
      actionPath: '/grievance-management',
      badge: summaryData.find(s => s.title === 'Pending Complaints')?.count || null
    },
    {
      id: 3,
      title: 'Post Notice & Emergency Alert',
      description: 'Create and publish important announcements',
      icon: 'Bell',
      iconColor: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10',
      actionText: 'Create Notice and Alerts',
      actionPath: '/post-notice-alert',
      badge: null
    },
    {
      id: 4,
      title: 'Feedback Dashboard',
      description: 'View and manage student feedback on food, cleanliness, security',
      icon: 'MessageSquare',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10',
      actionText: 'View Feedback',
      actionPath: '/feedback-dashboard',
      badge: null
    }
  ];

  const blocks = [
  { id: 1, name: 'Block A', value: 'A' },
  { id: 2, name: 'Block B', value: 'B' },
  { id: 3, name: 'Block C', value: 'C' },
  { id: 4, name: 'Block D', value: 'D' }
];

  // ✅ Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch grievances
        const grievancesRes = await api.get('/grievances');
        const grievances = grievancesRes.data;
        console.log('✅ Grievances:', grievances);

        // Fetch feedback
        const feedbackRes = await api.get('/feedback');
        const feedback = feedbackRes.data;
        console.log('✅ Feedback:', feedback);

        // Fetch notices
        const noticesRes = await api.get('/notices');
        const notices = noticesRes.data;
        console.log('✅ Notices:', notices);

        // Calculate summary stats
        const totalGrievances = grievances.length;
        const pendingGrievances = grievances.filter(g => g.status === 'pending').length;
        const inProgressGrievances = grievances.filter(g => g.status === 'in-progress').length;
        const resolvedGrievances = grievances.filter(g => g.status === 'resolved').length;

        setSummaryData([
          {
            id: 1,
            title: 'Total Grievances',
            count: totalGrievances,
            icon: 'AlertCircle',
            iconColor: 'var(--color-primary)',
            bgColor: 'bg-primary/10',
            trend: 'up',
            trendValue: 12
          },
          {
            id: 2,
            title: 'Pending Complaints',
            count: pendingGrievances,
            icon: 'Clock',
            iconColor: 'var(--color-warning)',
            bgColor: 'bg-warning/10',
            trend: 'down',
            trendValue: 8
          },
          {
            id: 3,
            title: 'In Progress',
            count: inProgressGrievances,
            icon: 'RefreshCw',
            iconColor: 'var(--color-secondary)',
            bgColor: 'bg-secondary/10',
            trend: 'up',
            trendValue: 5
          },
          {
            id: 4,
            title: 'Resolved Cases',
            count: resolvedGrievances,
            icon: 'CheckCircle',
            iconColor: 'var(--color-success)',
            bgColor: 'bg-success/10',
            trend: 'up',
            trendValue: 15
          }
        ]);

        // Build activity timeline
        const activities = [];

        // Add recent grievances (high priority ones)
        grievances
          .filter(g => g.priority === 'high' || g.priority === 'urgent')
          .slice(0, 2)
          .forEach(g => {
            activities.push({
              id: `grievance-${g.id}`,
              type: 'grievance',
              priority: g.priority === 'urgent' ? 'high' : g.priority,
              title: `${g.category} - ${g.student?.block_number ? `Block ${g.student.block_number}` : 'Student'}`,
              description: g.description.substring(0, 80) + '...',
              student: g.student?.name || 'Anonymous',
              time: formatTimeAgo(g.created_at)
            });
          });

        // Add recent feedback
        feedback.slice(0, 1).forEach(f => {
          activities.push({
            id: `feedback-${f.id}`,
            type: 'feedback',
            priority: 'low',
            title: `${f.category} Feedback Received`,
            description: `Rating: ${f.rating}/5${f.comment ? ' - ' + f.comment.substring(0, 50) : ''}`,
            student: f.student?.name || 'Anonymous',
            time: formatTimeAgo(f.created_at)
          });
        });

        // Add recent notices
        notices.slice(0, 1).forEach(n => {
          activities.push({
            id: `notice-${n.id}`,
            type: n.type === 'alert' ? 'alert' : 'notice',
            priority: n.priority === 'high' ? 'high' : 'medium',
            title: `${n.type === 'alert' ? 'Alert' : 'Notice'} Posted`,
            description: n.title,
            student: 'Admin',
            time: formatTimeAgo(n.created_at)
          });
        });

        // Add other grievances
        grievances
          .filter(g => g.priority !== 'high' && g.priority !== 'urgent')
          .slice(0, 2)
          .forEach(g => {
            activities.push({
              id: `grievance-other-${g.id}`,
              type: 'grievance',
              priority: g.priority || 'medium',
              title: `${g.category} Issue`,
              description: g.description.substring(0, 80) + '...',
              student: g.student?.name || 'Anonymous',
              time: formatTimeAgo(g.created_at)
            });
          });

        // Sort by time (most recent first)
        activities.sort((a, b) => {
          const getTimestamp = (timeStr) => {
            if (timeStr.includes('min')) return parseInt(timeStr);
            if (timeStr.includes('hour')) return parseInt(timeStr) * 60;
            if (timeStr.includes('day')) return parseInt(timeStr) * 1440;
            return 9999;
          };
          return getTimestamp(a.time) - getTimestamp(b.time);
        });

        setRecentActivities(activities.slice(0, 6));
        setNotificationCount(pendingGrievances + notices.filter(n => n.type === 'alert').length);

      } catch (error) {
        console.error('❌ Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ Helper function to format time
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const handleEmergencyAlert = () => {
    navigate('/send-alert');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavigation userRole="warden" notificationCount={0} />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-8">
      <DashboardNavigation userRole="warden" notificationCount={notificationCount} />
      <BreadcrumbNavigation items={breadcrumbItems} />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              Warden Dashboard
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Monitor hostel operations and manage student activities
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              className="text-sm md:text-base"
            >
              Export Report
            </Button>
            <Button
              variant="destructive"
              iconName="AlertTriangle"
              iconPosition="left"
              onClick={handleEmergencyAlert}
              className="text-sm md:text-base"
            >
              Emergency Alert
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {summaryData?.map((summary) => (
            <SummaryCard
              key={summary?.id}
              title={summary?.title}
              count={summary?.count}
              icon={summary?.icon}
              iconColor={summary?.iconColor}
              bgColor={summary?.bgColor}
              trend={summary?.trend}
              trendValue={summary?.trendValue}
            />
          ))}
        </div>

        {/* Attendance Widget and Block Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="lg:col-span-1">
            <AttendanceWidget
              totalStudents={summary.total}
              presentToday={summary.present}
              absentToday={summary.absent}
              attendanceRate={summary.percentage}
            />
          </div>
          <div className="lg:col-span-2">
            <BlockFilter
              blocks={blocks}
              selectedBlock={selectedBlock}
              onBlockChange={setSelectedBlock}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {quickActions?.map((action) => (
              <QuickActionCard
                key={action?.id}
                title={action?.title}
                description={action?.description}
                icon={action?.icon}
                iconColor={action?.iconColor}
                bgColor={action?.bgColor}
                actionText={action?.actionText}
                actionPath={action?.actionPath}
                badge={action?.badge}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="mb-6 md:mb-8">
          <ActivityTimeline activities={recentActivities} />
        </div>

        {/* Weekly Overview */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
            Weekly Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Avg. Attendance */}
            <div 
              className="relative rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
              style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)',
                borderColor: '#3b82f680'
              }}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-2xl opacity-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #3b82f640 0%, transparent 70%)',
                }}
              />
              <div 
                className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-6 relative z-10"
                style={{
                  background: '#3b82f6',
                  boxShadow: '0 8px 16px #3b82f640'
                }}
              >
                <Icon name="TrendingUp" size={32} color="#ffffff" className="md:w-10 md:h-10" />
              </div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 relative z-10">96%</p>
              <p className="text-sm md:text-base text-gray-600 font-medium relative z-10">Avg. Attendance</p>
            </div>

            {/* Resolution Rate */}
            <div 
              className="relative rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
              style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
                borderColor: '#10b98180'
              }}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-2xl opacity-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #10b98140 0%, transparent 70%)',
                }}
              />
              <div 
                className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-6 relative z-10"
                style={{
                  background: '#10b981',
                  boxShadow: '0 8px 16px #10b98140'
                }}
              >
                <Icon name="CheckCircle" size={32} color="#ffffff" className="md:w-10 md:h-10" />
              </div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 relative z-10">
                {summaryData.length > 0 ? Math.round((summaryData[3].count / summaryData[0].count) * 100) : 78}%
              </p>
              <p className="text-sm md:text-base text-gray-600 font-medium relative z-10">Resolution Rate</p>
            </div>

            {/* Avg. Response Time */}
            <div 
              className="relative rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2"
              style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)',
                borderColor: '#8b5cf680'
              }}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-2xl opacity-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, #8b5cf640 0%, transparent 70%)',
                }}
              />
              <div 
                className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:rotate-6 relative z-10"
                style={{
                  background: '#8b5cf6',
                  boxShadow: '0 8px 16px #8b5cf640'
                }}
              >
                <Icon name="Clock" size={32} color="#ffffff" className="md:w-10 md:h-10" />
              </div>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 relative z-10">2.5h</p>
              <p className="text-sm md:text-base text-gray-600 font-medium relative z-10">Avg. Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;