import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, count, icon, iconColor, bgColor, percentage }) => {
  // Determine gradient based on card title
  const getGradientStyle = () => {
    if (title.includes('Total')) {
      return {
        background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)',
        iconBg: 'bg-blue-600',
        iconColor: '#ffffff',
        progressGradient: 'linear-gradient(90deg, #3b82f6, #2563eb)'
      };
    }
    if (title.includes('Present')) {
      return {
        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)',
        iconBg: 'bg-green-600',
        iconColor: '#ffffff',
        progressGradient: 'linear-gradient(90deg, #10b981, #059669)'
      };
    }
    if (title.includes('Absent')) {
      return {
        background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 50%, #f87171 100%)',
        iconBg: 'bg-red-600',
        iconColor: '#ffffff',
        progressGradient: 'linear-gradient(90deg, #ef4444, #dc2626)'
      };
    }
    return {
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)',
      iconBg: bgColor || 'bg-gray-600',
      iconColor: iconColor || '#ffffff',
      progressGradient: 'linear-gradient(90deg, #6b7280, #4b5563)'
    };
  };

  const gradientStyle = getGradientStyle();

  return (
    <div 
      className="rounded-xl p-4 md:p-6 shadow-elevation-md transition-all duration-300 hover:shadow-elevation-lg hover:scale-[1.02]"
      style={{ background: gradientStyle.background }}
    >
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-sm md:text-base text-gray-700 mb-1 md:mb-2 font-medium">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{count}</h3>
            {percentage !== undefined && (
              <span className="text-sm md:text-base text-gray-600 font-medium">({percentage}%)</span>
            )}
          </div>
        </div>
        <div 
          className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl ${gradientStyle.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 hover:rotate-6`}
        >
          <Icon name={icon} size={24} color={gradientStyle.iconColor} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </div>
      
      {percentage !== undefined && (
        <div className="w-full h-2.5 bg-white/40 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ 
              width: `${percentage}%`,
              background: gradientStyle.progressGradient
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;