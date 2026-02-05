import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DateFilter = ({ onSearch, onBlockChange, onDateChange, selectedBlock, selectedDate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isBlockDropdownOpen, setIsBlockDropdownOpen] = useState(false);

  const blocks = ['All Blocks', 'Block A', 'Block B', 'Block C', 'Block D'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleBlockSelect = (block) => {
    onBlockChange?.(block);
    setIsBlockDropdownOpen(false);
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    onDateChange?.(today);
  };

  return (
    <div className="px-4 md:px-6 mb-6">
      {/* Gradient Border Wrapper */}
      <div 
        className="rounded-xl p-[3px] shadow-lg transition-all duration-300 hover:shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
        }}
      >
        {/* Inner White Container */}
        <div className="bg-white rounded-xl p-5 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <Icon name="Filter" size={20} color="#3b82f6" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Filters</h3>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Icon name="Search" size={18} color="#9ca3af" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by name, ID, or room..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all duration-200 text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Block Dropdown */}
            <div className="md:w-56 relative">
              <button
                onClick={() => setIsBlockDropdownOpen(!isBlockDropdownOpen)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 hover:bg-gray-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all duration-200 flex items-center justify-between text-sm font-medium text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <Icon name="Building2" size={18} color="#6b7280" />
                  <span>{selectedBlock || 'All Blocks'}</span>
                </div>
                <Icon 
                  name={isBlockDropdownOpen ? "ChevronUp" : "ChevronDown"} 
                  size={18} 
                  color="#6b7280" 
                />
              </button>

              {/* Dropdown Menu */}
              {isBlockDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                  {blocks.map((block, index) => (
                    <button
                      key={index}
                      onClick={() => handleBlockSelect(block)}
                      className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors duration-150 flex items-center gap-2 ${
                        selectedBlock === block
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon name="Building2" size={16} color={selectedBlock === block ? '#3b82f6' : '#6b7280'} />
                      {block}
                      {selectedBlock === block && (
                        <Icon name="Check" size={16} color="#3b82f6" className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div className="md:w-56">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Icon name="Calendar" size={18} color="#9ca3af" />
                </div>
                <input
                  type="date"
                  value={selectedDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => onDateChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all duration-200 text-sm text-gray-900 outline-none"
                />
              </div>
            </div>

            {/* Today Button */}
            <div className="md:w-28">
              <button
                onClick={handleTodayClick}
                className="w-full px-4 py-3 rounded-lg font-semibold text-sm text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                }}
              >
                Today
              </button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(searchQuery || (selectedBlock && selectedBlock !== 'All Blocks')) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        onSearch?.('');
                      }}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <Icon name="X" size={12} color="#1d4ed8" />
                    </button>
                  </span>
                )}
                {selectedBlock && selectedBlock !== 'All Blocks' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                    {selectedBlock}
                    <button 
                      onClick={() => handleBlockSelect('All Blocks')}
                      className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                    >
                      <Icon name="X" size={12} color="#7c3aed" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateFilter;