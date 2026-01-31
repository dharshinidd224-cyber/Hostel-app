import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const DateFilter = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (e) => {
    onDateChange?.(e?.target?.value);
  };

  const handleToday = () => {
    const today = new Date()?.toISOString()?.split('T')?.[0];
    onDateChange?.(today);
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Icon 
          name="Calendar" 
          size={18} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" 
        />
        <Input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="pl-10"
        />
      </div>
      <button
        onClick={handleToday}
        className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth whitespace-nowrap"
      >
        Today
      </button>
    </div>
  );
};

export default DateFilter;