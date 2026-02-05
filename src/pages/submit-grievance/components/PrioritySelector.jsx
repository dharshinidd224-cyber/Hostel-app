import React from 'react';
import Icon from '../../../components/AppIcon';

const PrioritySelector = ({ value, onChange }) => {
  const priorities = [
    {
      value: 'low',
      label: 'Low',
      description: 'Can be addressed within a week',
      icon: 'ArrowDown',
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-300',
      gradientFrom: 'from-green-400',
      gradientTo: 'to-emerald-500',
      shadowColor: 'shadow-green-500/30'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Needs attention within 2-3 days',
      icon: 'Minus',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-300',
      gradientFrom: 'from-orange-400',
      gradientTo: 'to-yellow-500',
      shadowColor: 'shadow-orange-500/30'
    },
    {
      value: 'high',
      label: 'High',
      description: 'Requires immediate attention',
      icon: 'ArrowUp',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-300',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-pink-600',
      shadowColor: 'shadow-red-500/30'
    }
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-3">
        Priority Level <span className="text-destructive">*</span>
      </label>
      <p className="text-xs text-muted-foreground mb-4 caption">
        Select the urgency level for your grievance
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {priorities?.map((priority) => (
          <button
            key={priority?.value}
            type="button"
            onClick={() => onChange(priority?.value)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-300 transform
              ${value === priority?.value 
                ? `${priority?.borderColor} ${priority?.bgColor} scale-105 shadow-lg ${priority?.shadowColor}` 
                : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-102 hover:shadow-md'
              }
            `}
          >
            {/* Gradient overlay when selected */}
            {value === priority?.value && (
              <div className={`absolute inset-0 bg-gradient-to-br ${priority?.gradientFrom} ${priority?.gradientTo} opacity-10 rounded-xl`} />
            )}
            
            <div className="relative flex items-start gap-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300
                ${value === priority?.value 
                  ? `bg-gradient-to-br ${priority?.gradientFrom} ${priority?.gradientTo} shadow-md` 
                  : 'bg-gray-100'
                }
              `}>
                <Icon 
                  name={priority?.icon} 
                  size={20} 
                  color={value === priority?.value ? 'white' : '#9ca3af'}
                />
              </div>
              <div className="flex-1 text-left">
                <div className={`font-bold text-base mb-1 transition-colors ${value === priority?.value ? priority?.color : 'text-gray-700'}`}>
                  {priority?.label}
                </div>
                <div className="text-xs text-gray-600">
                  {priority?.description}
                </div>
              </div>
            </div>
            
            {/* Checkmark when selected */}
            {value === priority?.value && (
              <div className="absolute top-3 right-3">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${priority?.gradientFrom} ${priority?.gradientTo} flex items-center justify-center shadow-md`}>
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;