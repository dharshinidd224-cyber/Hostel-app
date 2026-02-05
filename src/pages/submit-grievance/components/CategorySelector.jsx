import React from 'react';
import Select from '../../../components/ui/Select';

const CategorySelector = ({ value, onChange, error }) => {
  const categories = [
    { 
      value: 'water', 
      label: 'Water',
      description: 'Water supply, leakage, or quality issues'
    },
    { 
      value: 'electricity', 
      label: 'Electricity',
      description: 'Power outage, wiring, or electrical appliance issues'
    },
    { 
      value: 'food', 
      label: 'Food',
      description: 'Mess food quality, hygiene, or menu concerns'
    },
    { 
      value: 'internet', 
      label: 'Internet',
      description: 'WiFi connectivity, speed, or network issues'
    },
    { 
      value: 'cleanliness', 
      label: 'Cleanliness',
      description: 'Room, bathroom, or common area cleaning issues'
    },
    { 
      value: 'security', 
      label: 'Security',
      description: 'Safety concerns, access control, or security personnel issues'
    },
    { 
      value: 'others', 
      label: 'Others',
      description: 'Any other hostel-related concerns'
    }
  ];

  return (
    <div className="w-full">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </div>
        Grievance Category <span className="text-red-500">*</span>
      </label>
      <p className="text-xs text-gray-600 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        Select the category that best describes your issue
      </p>
      <Select
        options={categories}
        value={value}
        onChange={onChange}
        error={error}
        required
        searchable
        placeholder="Choose a category"
      />
    </div>
  );
};

export default CategorySelector;