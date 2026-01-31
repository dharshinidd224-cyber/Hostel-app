import React from 'react';

import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  dateFilter,
  setDateFilter
}) => {
  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'normal', label: 'Normal Priority' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  return (
    <div className="mb-6">
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search notices and alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>

          <div>
            <Select
              options={priorityOptions}
              value={priorityFilter}
              onChange={setPriorityFilter}
              placeholder="Filter by priority"
            />
          </div>

          <div>
            <Select
              options={dateOptions}
              value={dateFilter}
              onChange={setDateFilter}
              placeholder="Filter by date"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;