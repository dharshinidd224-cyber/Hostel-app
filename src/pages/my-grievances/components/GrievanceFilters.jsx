import React from 'react';
import Icon from '../../../components/AppIcon';

const GrievanceFilters = ({ filters, onFilterChange, onReset, totalCount, filteredCount }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status', icon: 'ListFilter', color: 'text-gray-600' },
    { value: 'pending', label: 'Pending', icon: 'Clock', color: 'text-amber-600' },
    { value: 'in-progress', label: 'In Progress', icon: 'RefreshCw', color: 'text-indigo-600' },
    { value: 'resolved', label: 'Resolved', icon: 'CheckCircle2', color: 'text-emerald-600' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories', icon: 'Grid3x3' },
    { value: 'Water', label: 'Water', icon: 'Droplet' },
    { value: 'Electricity', label: 'Electricity', icon: 'Zap' },
    { value: 'Food', label: 'Food', icon: 'UtensilsCrossed' },
    { value: 'Internet', label: 'Internet', icon: 'Wifi' },
    { value: 'Cleanliness', label: 'Cleanliness', icon: 'Sparkles' },
    { value: 'Security', label: 'Security', icon: 'Shield' },
    { value: 'Others', label: 'Others', icon: 'AlertCircle' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: 'ArrowDownWideNarrow' },
    { value: 'oldest', label: 'Oldest First', icon: 'ArrowUpWideNarrow' },
    { value: 'status', label: 'By Status', icon: 'ListOrdered' }
  ];

  const hasActiveFilters = filters?.search || 
    filters?.status !== 'all' || 
    filters?.category !== 'all' || 
    filters?.dateFrom || 
    filters?.dateTo;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-gray-100 dark:border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Icon name="SlidersHorizontal" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Filter Grievances
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-bold text-indigo-600 dark:text-indigo-400">{filteredCount}</span> of {totalCount} grievances
              </p>
            </div>
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
            >
              <Icon name="RotateCcw" size={16} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters Content */}
      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
            <Icon name="Search" size={16} />
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID or description..."
              value={filters?.search || ''}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-medium"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            {filters?.search && (
              <button
                onClick={() => onFilterChange('search', '')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Filters - Status, Category, Sort */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              <Icon name="Flag" size={16} />
              Status
            </label>
            <div className="relative">
              <select
                value={filters?.status || 'all'}
                onChange={(e) => onFilterChange('status', e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-medium appearance-none cursor-pointer"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={20} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              <Icon name="FolderOpen" size={16} />
              Category
            </label>
            <div className="relative">
              <select
                value={filters?.category || 'all'}
                onChange={(e) => onFilterChange('category', e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-medium appearance-none cursor-pointer"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={20} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              <Icon name="ArrowUpDown" size={16} />
              Sort By
            </label>
            <div className="relative">
              <select
                value={filters?.sortBy || 'newest'}
                onChange={(e) => onFilterChange('sortBy', e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-medium appearance-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={20} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Date Range Filters */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
            <Icon name="CalendarRange" size={16} />
            Date Range
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block font-medium">
                From Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters?.dateFrom || ''}
                  onChange={(e) => onFilterChange('dateFrom', e.target.value)}
                  className="w-full px-4 py-3 pl-11 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-medium"
                />
                <Icon 
                  name="Calendar" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block font-medium">
                To Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={filters?.dateTo || ''}
                  onChange={(e) => onFilterChange('dateTo', e.target.value)}
                  className="w-full px-4 py-3 pl-11 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 font-medium"
                />
                <Icon 
                  name="Calendar" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-4 border-2 border-indigo-100 dark:border-indigo-900">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Filter" size={16} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                  Active Filters
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filters?.search && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      <Icon name="Search" size={12} />
                      Search: "{filters.search}"
                    </span>
                  )}
                  {filters?.status !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      <Icon name="Flag" size={12} />
                      {statusOptions.find(o => o.value === filters.status)?.label}
                    </span>
                  )}
                  {filters?.category !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      <Icon name="FolderOpen" size={12} />
                      {filters.category}
                    </span>
                  )}
                  {filters?.dateFrom && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      <Icon name="CalendarRange" size={12} />
                      From: {filters.dateFrom}
                    </span>
                  )}
                  {filters?.dateTo && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      <Icon name="CalendarRange" size={12} />
                      To: {filters.dateTo}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceFilters;