import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';
import NoticeAlertHeader from './components/NoticeAlertHeader';
import TabFilter from './components/TabFilter';
import SearchAndFilter from './components/SearchAndFilter';
import NoticeAlertList from './components/NoticeAlertList';

const NoticesAndAlerts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const [notices] = useState([
    {
      id: 1,
      title: "Hostel Maintenance Schedule",
      message: "Routine maintenance work will be conducted in Block A on 02/02/2026 from 10:00 AM to 2:00 PM. Water supply may be affected during this period. Please plan accordingly and keep water stored for the duration.",
      date: "30/01/2026",
      time: "09:30 AM",
      priority: "normal",
      wardenName: "Mr. Rajesh Kumar",
      category: "Maintenance",
      isRead: false
    },
    {
      id: 2,
      title: "Mess Menu Update",
      message: "New breakfast options including South Indian dishes (Idli, Dosa, Vada) will be available from next week. Feedback forms available at mess counter. Special dietary requirements can be submitted to mess committee.",
      date: "29/01/2026",
      time: "08:15 AM",
      priority: "normal",
      wardenName: "Ms. Priya Sharma",
      category: "Mess",
      isRead: true
    },
    {
      id: 3,
      title: "Library Hours Extension",
      message: "Library hours extended till 11:00 PM during examination period starting from 05/02/2026. Additional study spaces available in common rooms. Silent zones strictly enforced.",
      date: "28/01/2026",
      time: "02:45 PM",
      priority: "normal",
      wardenName: "Dr. Amit Patel",
      category: "General",
      isRead: true
    },
    {
      id: 4,
      title: "Internet Maintenance Notice",
      message: "Wi-Fi services will be temporarily unavailable on 03/02/2026 from 2:00 AM to 4:00 AM for router upgrades. Mobile data recommended during this period.",
      date: "27/01/2026",
      time: "06:00 PM",
      priority: "normal",
      wardenName: "Mr. Rajesh Kumar",
      category: "Maintenance",
      isRead: true
    },
    {
      id: 5,
      title: "Guest Room Booking Policy",
      message: "New guest room booking system launched. Book online through hostel portal at least 48 hours in advance. Maximum 2 nights per booking. Valid ID proof of guests mandatory.",
      date: "26/01/2026",
      time: "11:20 AM",
      priority: "normal",
      wardenName: "Ms. Priya Sharma",
      category: "General",
      isRead: true
    }
  ]);

  const [alerts] = useState([
    {
      id: 6,
      title: "Emergency Contact Update Required",
      message: "All students must update their emergency contact details in the hostel office by 05/02/2026. This is mandatory for safety protocols and emergency situations. Bring valid ID proof and parent contact verification.",
      date: "31/01/2026",
      time: "10:00 AM",
      priority: "high",
      wardenName: "Dr. Amit Patel",
      category: "Emergency",
      isRead: false
    },
    {
      id: 7,
      title: "Fire Safety Drill Scheduled",
      message: "Mandatory fire safety drill on 04/02/2026 at 4:00 PM. All students must participate. Evacuation procedures will be practiced. Assembly point: Main ground. Attendance will be marked.",
      date: "30/01/2026",
      time: "03:30 PM",
      priority: "high",
      wardenName: "Mr. Rajesh Kumar",
      category: "Emergency",
      isRead: false
    },
    {
      id: 8,
      title: "Security Alert - Visitor Verification",
      message: "Enhanced security measures in effect. All visitors must register at main gate with valid ID. Students must accompany visitors at all times. Unescorted visitors will not be permitted entry.",
      date: "29/01/2026",
      time: "07:00 AM",
      priority: "medium",
      wardenName: "Ms. Priya Sharma",
      category: "Security",
      isRead: true
    },
    {
      id: 9,
      title: "Health Checkup Camp",
      message: "Free health checkup camp organized on 06/02/2026 from 9:00 AM to 5:00 PM in hostel premises. General physician, dentist, and eye specialist available. Registration at hostel office.",
      date: "28/01/2026",
      time: "01:15 PM",
      priority: "medium",
      wardenName: "Dr. Amit Patel",
      category: "Health",
      isRead: true
    }
  ]);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Notices & Alerts', path: '/notices-and-alerts' }
  ];

  // Combine and filter items
  const allItems = [
    ...notices?.map(n => ({ ...n, type: 'notice' })),
    ...alerts?.map(a => ({ ...a, type: 'alert' }))
  ];

  const getFilteredItems = () => {
    let filtered = allItems;

    // Tab filter
    if (activeTab === 'notices') {
      filtered = filtered?.filter(item => item?.type === 'notice');
    } else if (activeTab === 'alerts') {
      filtered = filtered?.filter(item => item?.type === 'alert');
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(item =>
        item?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.message?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.wardenName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered?.filter(item => item?.priority === priorityFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      filtered = filtered?.filter(item => {
        const itemDate = new Date(item?.date?.split('/')?.reverse()?.join('-'));
        const diffDays = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));

        if (dateFilter === 'today') return diffDays === 0;
        if (dateFilter === 'week') return diffDays <= 7;
        if (dateFilter === 'month') return diffDays <= 30;
        return true;
      });
    }

    // Sort by date (newest first) and priority (high first)
    return filtered?.sort((a, b) => {
      // Priority sort
      const priorityOrder = { high: 0, medium: 1, normal: 2 };
      const priorityDiff = priorityOrder?.[a?.priority] - priorityOrder?.[b?.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Date sort
      const dateA = new Date(a?.date?.split('/')?.reverse()?.join('-'));
      const dateB = new Date(b?.date?.split('/')?.reverse()?.join('-'));
      return dateB - dateA;
    });
  };

  const filteredItems = getFilteredItems();
  const unreadCount = allItems?.filter(item => !item?.isRead)?.length;
  const noticesCount = notices?.length;
  const alertsCount = alerts?.length;

  return (
    <>
      <Helmet>
        <title>Notices & Alerts - Student Dashboard</title>
        <meta name="description" content="View all hostel notices and alerts from wardens" />
      </Helmet>

      <DashboardNavigation userRole="student" notificationCount={unreadCount} />

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbNavigation items={breadcrumbItems} />

          <NoticeAlertHeader unreadCount={unreadCount} />

          <TabFilter
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            noticesCount={noticesCount}
            alertsCount={alertsCount}
            allCount={allItems?.length}
          />

          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <NoticeAlertList items={filteredItems} />
        </div>
      </div>
    </>
  );
};

export default NoticesAndAlerts;