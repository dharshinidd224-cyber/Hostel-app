import React, { useState } from 'react';
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

const WardenDashboard = () => {
  const navigate = useNavigate();
  const [selectedBlock, setSelectedBlock] = useState('all');

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/warden-dashboard' }
  ];

  const summaryData = [
    {
      id: 1,
      title: 'Total Grievances',
      count: 156,
      icon: 'AlertCircle',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      trend: 'up',
      trendValue: 12
    },
    {
      id: 2,
      title: 'Pending Complaints',
      count: 23,
      icon: 'Clock',
      iconColor: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      trend: 'down',
      trendValue: 8
    },
    {
      id: 3,
      title: 'In Progress',
      count: 45,
      icon: 'RefreshCw',
      iconColor: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10',
      trend: 'up',
      trendValue: 5
    },
    {
      id: 4,
      title: 'Resolved Cases',
      count: 88,
      icon: 'CheckCircle',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10',
      trend: 'up',
      trendValue: 15
    }
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
      badge: '23'
    },
    {
      id: 3,
      title: 'Post Notice & Emergency Alert',
      description: 'Create and publish important announcements',
      icon: 'Bell',
      iconColor: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10',
      actionText: 'Create Notice and Alerts',
      actionPath: '/post-notice',
      badge: null
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'grievance',
      priority: 'high',
      title: 'Water Supply Issue - Block A',
      description: 'Student reported no water supply in rooms 301-305',
      student: 'Rahul Kumar',
      time: '5 mins ago'
    },
    {
      id: 2,
      type: 'attendance',
      priority: 'low',
      title: 'Attendance Marked',
      description: '423 students marked present for today',
      student: 'System',
      time: '15 mins ago'
    },
    {
      id: 3,
      type: 'grievance',
      priority: 'medium',
      title: 'Food Quality Complaint',
      description: 'Multiple students reported issues with dinner quality',
      student: 'Priya Sharma',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'feedback',
      priority: 'low',
      title: 'Positive Feedback Received',
      description: 'Student appreciated quick resolution of internet issue',
      student: 'Amit Patel',
      time: '2 hours ago'
    },
    {
      id: 5,
      type: 'grievance',
      priority: 'high',
      title: 'Electricity Outage - Block C',
      description: 'Power failure reported in entire Block C',
      student: 'Sneha Reddy',
      time: '3 hours ago'
    },
    {
      id: 6,
      type: 'notice',
      priority: 'medium',
      title: 'Notice Posted',
      description: 'Maintenance schedule for next week published',
      student: 'Admin',
      time: '4 hours ago'
    }
  ];

  const blocks = [
    { id: 1, name: 'Block A' },
    { id: 2, name: 'Block B' },
    { id: 3, name: 'Block C' },
    { id: 4, name: 'Block D' }
  ];

  const handleEmergencyAlert = () => {
    navigate('/send-alert');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="warden" notificationCount={5} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
              <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1 md:mb-2">78%</p>
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