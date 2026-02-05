import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import NoticeAlertHeader from './components/NoticeAlertHeader';
import TabFilter from './components/TabFilter';
import SearchAndFilter from './components/SearchAndFilter';
import NoticeAlertList from './components/NoticeAlertList';
import api from '../../utils/api';
import Icon from '../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const NoticesAndAlerts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notices and alerts from API
  useEffect(() => {
    const fetchNoticesAndAlerts = async () => {
      try {
        const response = await api.get('/notices');
        console.log('✅ Fetched notices:', response.data);
        
        // Separate notices and alerts based on type
        const fetchedNotices = response.data.filter(item => item.type === 'notice');
        const fetchedAlerts = response.data.filter(item => item.type === 'alert');
        
        setNotices(fetchedNotices);
        setAlerts(fetchedAlerts);
      } catch (error) {
        console.error('❌ Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticesAndAlerts();
  }, []);

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

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Notices & Alerts - Student Dashboard</title>
        </Helmet>
        <DashboardNavigation userRole="student" notificationCount={0} />
        <div className="min-h-screen bg-background pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading notices and alerts...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Notices & Alerts - Student Dashboard</title>
        <meta name="description" content="View all hostel notices and alerts from wardens" />
      </Helmet>

      <DashboardNavigation userRole="student" notificationCount={unreadCount} />

      <div className="min-h-screen bg-background pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Back Button */}
<button
  onClick={() => navigate('/student-dashboard')}
  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 mt-8"
>
  <Icon name="ArrowLeft" size={20} />
  <span>Back</span>
</button>


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