import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import GrievanceStats from './components/GrievanceStats';
import GrievanceFilters from './components/GrievanceFilters';
import GrievanceCard from './components/GrievanceCard';
import EmptyState from './components/EmptyState';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import api from '../../utils/api';


const MyGrievances = () => {
  

  // ✅ State for real grievances from API
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    sortBy: 'newest',
    dateFrom: '',
    dateTo: ''
  });

  // ✅ Fetch grievances from backend
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await api.get("/grievances/my-grievances");
        console.log("✅ Fetched my grievances:", response.data);
        setGrievances(response.data);
      } catch (error) {
        console.error("❌ Error fetching grievances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: grievances?.length,
      pending: grievances?.filter((g) => g?.status === 'pending')?.length,
      inProgress: grievances?.filter((g) => g?.status === 'in-progress')?.length,
      resolved: grievances?.filter((g) => g?.status === 'resolved')?.length
    };
  }, [grievances]);

  // Filter and sort grievances
  const filteredGrievances = useMemo(() => {
    let filtered = [...grievances];

    // Search filter
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter((g) =>
        g?.grievance_id?.toLowerCase()?.includes(searchLower) ||
        g?.description?.toLowerCase()?.includes(searchLower) ||
        g?.category?.toLowerCase()?.includes(searchLower)
      );
    }

    // Status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter((g) => g?.status === filters?.status);
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter((g) => g?.category === filters?.category);
    }

    // Date range filter
    if (filters?.dateFrom) {
      filtered = filtered?.filter((g) =>
        new Date(g.created_at) >= new Date(filters.dateFrom)
      );
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter((g) =>
        new Date(g.created_at) <= new Date(filters.dateTo + 'T23:59:59')
      );
    }

    // Sort
    filtered?.sort((a, b) => {
      if (filters?.sortBy === 'newest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (filters?.sortBy === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (filters?.sortBy === 'status') {
        const statusOrder = { 'pending': 0, 'in-progress': 1, 'resolved': 2, 'rejected': 3 };
        return statusOrder?.[a?.status] - statusOrder?.[b?.status];
      }
      return 0;
    });

    return filtered;
  }, [grievances, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      category: 'all',
      sortBy: 'newest',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleViewDetails = (grievance) => {
    console.log('View details for:', grievance?.grievance_id);
  };

  const hasActiveFilters = filters?.search ||
    filters?.status !== 'all' ||
    filters?.category !== 'all' ||
    filters?.dateFrom ||
    filters?.dateTo;

  // ✅ Add loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation userRole="student" />
        <main className="main-content">
          <div className="content-container">
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
      <RoleBasedNavigation userRole="student" />
      <main className="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="content-container">
          {/* Back button with proper spacing */}
          <button
            onClick={() => navigate('/student-dashboard')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 mt-4"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back</span>
          </button>
          

          {/* Page Header with proper spacing */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                My Grievances
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track and manage your submitted grievances with real-time status updates
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => navigate('/submit-grievance')}
              iconName="Plus"
              iconPosition="left"
            >
              New Grievance
            </Button>
          </div>

          {/* Statistics with proper spacing */}
          <div className="mb-8">
            <GrievanceStats stats={stats} />
          </div>

          {/* Filters with proper spacing */}
          <div className="mb-8">
            <GrievanceFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              totalCount={grievances?.length}
              filteredCount={filteredGrievances?.length}
            />
          </div>

          {/* Grievances List with bottom padding */}
          {filteredGrievances?.length > 0 ? (
            <div className="space-y-4 pb-8">
              {filteredGrievances?.map((grievance) => (
                <GrievanceCard
                  key={grievance?.grievance_id}
                  grievance={grievance}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="pb-8">
              <EmptyState
                hasFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
              />
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
};

export default MyGrievances;