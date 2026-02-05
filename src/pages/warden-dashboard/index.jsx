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

const WardenDashboard = () => {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState('all');
  const [loading, setLoading] = useState(true);

  // ✅ State for real data
  const [summaryData, setSummaryData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/warden-dashboard' }
  ];

  const attendanceData = {
    totalStudents: 450,
    presentToday: 423,
    absentToday: 27,
    attendanceRate: 94
  };

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
    { id: 1, name: 'Block A' },
    { id: 2, name: 'Block B' },
    { id: 3, name: 'Block C' },
    { id: 4, name: 'Block D' }
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
    <div className="min-h-screen bg-background">
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
              totalStudents={attendanceData?.totalStudents}
              presentToday={attendanceData?.presentToday}
              absentToday={attendanceData?.absentToday}
              attendanceRate={attendanceData?.attendanceRate}
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

        {/* Statistics Overview */}
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
            Weekly Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="var(--color-primary)" className="md:w-8 md:h-8" />
              </div>
              <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1 md:mb-2">96%</p>
              <p className="text-sm md:text-base text-muted-foreground">Avg. Attendance</p>
            </div>

            <div className="text-center p-4 md:p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" className="md:w-8 md:h-8" />
              </div>
              <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1 md:mb-2">
                {summaryData.length > 0 ? Math.round((summaryData[3].count / summaryData[0].count) * 100) : 78}%
              </p>
              <p className="text-sm md:text-base text-muted-foreground">Resolution Rate</p>
            </div>

            <div className="text-center p-4 md:p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Icon name="Clock" size={24} color="var(--color-secondary)" className="md:w-8 md:h-8" />
              </div>
              <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1 md:mb-2">2.5h</p>
              <p className="text-sm md:text-base text-muted-foreground">Avg. Response Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;