import React, { useState, useEffect } from 'react';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import NotificationDisplay from '../../components/ui/NotificationDisplay';
import GrievanceFilters from './components/GrievanceFilters';
import GrievanceAnalytics from './components/GrievanceAnalytics';
import QuickActions from './components/QuickActions';
import GrievanceTable from './components/GrievanceTable';
import GrievanceMobileCard from './components/GrievanceMobileCard';
import StatusUpdateModal from './components/StatusUpdateModal';
import BulkUpdateModal from './components/BulkUpdateModal';
import api from '../../utils/api';
import Icon from '../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const GrievanceManagement = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [notification, setNotification] = useState({
    type: 'notice',
    title: 'System Update',
    message: 'Grievance management system has been updated with new filtering capabilities',
    timestamp: new Date()?.toISOString()
  });
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
    search: '',
    fromDate: '',
    toDate: ''
  });
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedGrievances, setSelectedGrievances] = useState([]);

  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await api.get("/grievances");
        console.log("✅ Fetched all grievances:", response.data);
        setGrievances(response.data);
      } catch (error) {
        console.error("❌ Error fetching grievances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredGrievances = grievances?.filter(grievance => {
  // Category filter
  const categoryMatch = filters.category === 'all' || 
    grievance?.category?.toLowerCase() === filters.category.toLowerCase();
  
  // Status filter
  const statusMatch = filters.status === 'all' || 
    grievance?.status?.toLowerCase() === filters.status.toLowerCase();
  
  // Priority filter
  const priorityMatch = filters.priority === 'all' || 
    grievance?.priority?.toLowerCase() === filters.priority.toLowerCase();
  
  // Search filter
  const searchMatch = !filters.search || 
    grievance?.grievance_id?.toLowerCase()?.includes(filters.search.toLowerCase()) ||
    grievance?.student?.name?.toLowerCase()?.includes(filters.search.toLowerCase());

  // Date filters
  let fromDateMatch = true;
  let toDateMatch = true;

  if (filters.fromDate) {
    const grievanceDate = new Date(grievance.created_at);
    const fromDate = new Date(filters.fromDate);
    fromDateMatch = grievanceDate >= fromDate;
  }

  if (filters.toDate) {
    const grievanceDate = new Date(grievance.created_at);
    const toDate = new Date(filters.toDate);
    toDateMatch = grievanceDate <= toDate;
  }

  return categoryMatch && statusMatch && priorityMatch && searchMatch && fromDateMatch && toDateMatch;
});
 
console.log("🔍 Active filters:", JSON.stringify(filters, null, 2));
console.log("📦 Total grievances:", grievances?.length);
console.log("✅ Filtered grievances:", filteredGrievances?.length);
console.log("📋 First grievance:", JSON.stringify(grievances?.[0], null, 2));

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      status: 'all',
      priority: 'all',
      search: '',
      fromDate: '',
      toDate: ''
    });
  };

  const handleStatusUpdate = (grievance) => {
    setSelectedGrievance(grievance);
    setIsStatusModalOpen(true);
  };

  const handleUpdateSubmit = async (updateData) => {
    console.log('Updating grievance:', updateData);
    
    try {
      await api.patch(`/grievances/${selectedGrievance.grievance_id}/status`, {
        status: updateData.status,
        resolution_remarks: updateData.remarks
      });

      console.log("✅ Grievance updated successfully");

      // Refresh grievances list
      const response = await api.get("/grievances");
      setGrievances(response.data);

      setIsStatusModalOpen(false);
      setSelectedGrievance(null);
    } catch (error) {
      console.error("❌ Error updating grievance:", error);
      alert("Failed to update grievance. Please try again.");
    }
  };

  const handleBulkUpdate = (selectedIds) => {
    setSelectedGrievances(selectedIds);
    setIsBulkModalOpen(true);
  };

  const handleBulkUpdateSubmit = (updateData) => {
    console.log('Bulk updating grievances:', selectedGrievances, updateData);
    setIsBulkModalOpen(false);
    setSelectedGrievances([]);
  };

  const handleEmergencyClick = () => {
    setFilters((prev) => ({ ...prev, priority: 'high', status: 'submitted' }));
  };

  const handleOverdueClick = () => {
    setFilters((prev) => ({ ...prev, status: 'in-progress' }));
  };

   const analytics = {
    total: grievances?.length || 0,
    pending: grievances?.filter((g) => g?.status === 'pending')?.length || 0,
    inProgress: grievances?.filter((g) => g?.status === 'in-progress')?.length || 0,
    resolved: grievances?.filter((g) => g?.status === 'resolved')?.length || 0
  };

  const emergencyCount = grievances?.filter((g) => 
    (g?.priority === 'high' || g?.priority === 'urgent') && g?.status === 'pending'
  )?.length || 0;
  
  const overdueCount = grievances?.filter((g) => g?.status === 'in-progress')?.length || 0;

if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation userRole="warden" />
        <main className="main-content">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading grievances...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="warden" />

      {notification && (
        <NotificationDisplay
          notification={notification}
          onDismiss={() => setNotification(null)}
          autoHideDuration={5000}
        />
      )}

      {/* ✅ FIXED LAYOUT */}
      <main className="main-content">
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate('/warden-dashboard')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back</span>
          </button>

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Grievance Management
            </h1>
            <p className="text-muted-foreground">
              Review, update, and resolve student complaints efficiently
            </p>
          </div>

          {/* ANALYTICS */}
          <GrievanceAnalytics analytics={analytics} />

          {/* QUICK ACTIONS */}
          <QuickActions
            onEmergencyClick={handleEmergencyClick}
            onOverdueClick={handleOverdueClick}
            emergencyCount={emergencyCount}
            overdueCount={overdueCount}
          />

          {/* FILTERS */}
          <GrievanceFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            resultsCount={filteredGrievances?.length}
          />

          {/* TABLE / MOBILE */}
          {isMobile ? (
            <div className="space-y-4">
              {filteredGrievances?.map((grievance) => (
                <GrievanceMobileCard
                  key={grievance.id}
                  grievance={grievance}
                  isSelected={selectedGrievances.includes(grievance.id)}
                  onSelect={(id, checked) => {
                    if (checked) {
                      setSelectedGrievances([...selectedGrievances, id]);
                    } else {
                      setSelectedGrievances(
                        selectedGrievances.filter(gId => gId !== id)
                      );
                    }
                  }}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </div>
          ) : (
            <GrievanceTable
              grievances={filteredGrievances}
              onStatusUpdate={handleStatusUpdate}
              onBulkUpdate={handleBulkUpdate}
            />
          )}
        </div>
      </main>

      {/* MODALS */}
      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedGrievance(null);
        }}
        grievance={selectedGrievance}
        onUpdate={handleUpdateSubmit}
      />

      <BulkUpdateModal
        isOpen={isBulkModalOpen}
        onClose={() => {
          setIsBulkModalOpen(false);
          setSelectedGrievances([]);
        }}
        selectedCount={selectedGrievances.length}
        onUpdate={handleBulkUpdateSubmit}
      />
    </div>
  );
};

export default GrievanceManagement;