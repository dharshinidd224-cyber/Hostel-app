import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GrievanceFilters = ({ filters, onFilterChange, onReset, resultsCount }) => {
  return (
    <div className="filters-gradient">
      <div className="filters-inner">

        {/* HEADER */}
        <div className="filters-header">
          <div className="flex items-center gap-3">
            <div className="icon-box">
              <Icon name="Filter" size={18} />
            </div>
            <div>
              <h3 className="title">Filter Grievances</h3>
              <p className="subtitle">{resultsCount} results found</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>

        {/* FILTER GRID */}
        <div className="filters-grid">
          <div className="filter-item">
            <label>Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="food">Food</option>
              <option value="internet">Internet</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="submitted">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange('priority', e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search by ID or student name"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>From Date</label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => onFilterChange('fromDate', e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>To Date</label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => onFilterChange('toDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        /* 🌈 DIFFERENT GRADIENT FOR FILTER SECTION */
        .filters-gradient {
          padding: 3px;
          border-radius: 24px;
          margin-bottom: 28px;
          background: linear-gradient(
            135deg,
            #99f6e4,   /* teal */
            #ddd6fe    /* soft violet */
          );
        }

        .filters-inner {
          background: #ffffff;
          border-radius: 22px;
          padding: 22px 24px;
        }

        .filters-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #5eead4, #8b5cf6);
          color: #ffffff;
        }

        .title {
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
        }

        .subtitle {
          font-size: 0.8rem;
          color: #64748b;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .filter-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .filter-item label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
        }

        .filter-item input,
        .filter-item select {
          height: 42px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 0 14px;
          font-size: 0.875rem;
          background: #ffffff;
          transition: all 0.2s ease;
        }

        .filter-item input:focus,
        .filter-item select:focus {
          outline: none;
          border-color: #14b8a6;
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
        }

        @media (max-width: 1024px) {
          .filters-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default GrievanceFilters;