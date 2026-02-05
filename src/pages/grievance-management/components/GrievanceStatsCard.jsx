import React from 'react';
import Icon from '../../../components/AppIcon';

const GrievanceStatsCard = ({ title, count, icon, color, isActive = false }) => {
  const getGradientStyle = () => {
    switch(color) {
      case 'blue':
        return {
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          iconBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
          borderColor: '#3b82f6'
        };
      case 'orange':
        return {
          background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
          iconBg: 'linear-gradient(135deg, #f97316, #ea580c)',
          borderColor: '#f97316'
        };
      case 'red':
        return {
          background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
          iconBg: 'linear-gradient(135deg, #ef4444, #dc2626)',
          borderColor: '#ef4444'
        };
      case 'green':
        return {
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          iconBg: 'linear-gradient(135deg, #10b981, #059669)',
          borderColor: '#10b981'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          iconBg: 'linear-gradient(135deg, #6b7280, #4b5563)',
          borderColor: '#6b7280'
        };
    }
  };

  const gradientStyle = getGradientStyle();

  return (
    <div 
      className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        isActive ? 'ring-2 ring-offset-2' : ''
      }`}
      style={{
        background: gradientStyle.background,
        ...(isActive && { ringColor: gradientStyle.borderColor })
      }}
    >
      {/* Progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: gradientStyle.iconBg }} />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:rotate-6"
            style={{ background: gradientStyle.iconBg }}
          >
            <Icon name={icon} size={24} color="#ffffff" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900">{count}</h2>
        </div>
        <p className="text-sm font-semibold text-gray-700">{title}</p>
      </div>
    </div>
  );
};

export default GrievanceStatsCard;