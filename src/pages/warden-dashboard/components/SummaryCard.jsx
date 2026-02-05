import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, count, icon, iconColor, trend, trendValue, bgColor }) => {
  const isPositiveTrend = trend === 'up';
  
  // Get gradient configurations based on card type
  const getCardStyle = () => {
    if (title.includes('Total') || title.includes('Grievances')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)',
        borderGradient: 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)',
        iconGradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        iconBg: '#3b82f6',
        glowColor: 'rgba(59, 130, 246, 0.2)'
      };
    }
    if (title.includes('Pending')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
        borderGradient: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
        iconGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
        iconBg: '#f59e0b',
        glowColor: 'rgba(245, 158, 11, 0.2)'
      };
    }
    if (title.includes('Progress')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)',
        borderGradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed, #6d28d9)',
        iconGradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        iconBg: '#8b5cf6',
        glowColor: 'rgba(139, 92, 246, 0.2)'
      };
    }
    if (title.includes('Resolved')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
        borderGradient: 'linear-gradient(135deg, #10b981, #059669, #047857)',
        iconGradient: 'linear-gradient(135deg, #10b981, #059669)',
        iconBg: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.2)'
      };
    }
    return {
      backgroundGradient: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)',
      borderGradient: 'linear-gradient(135deg, #6b7280, #4b5563, #374151)',
      iconGradient: 'linear-gradient(135deg, #6b7280, #4b5563)',
      iconBg: '#6b7280',
      glowColor: 'rgba(107, 114, 128, 0.2)'
    };
  };

  const cardStyle = getCardStyle();
  
  return (
    <div 
      className="relative rounded-2xl p-[2px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      style={{
        background: cardStyle.borderGradient
      }}
    >
      {/* Inner card with background */}
      <div 
        className="relative rounded-2xl p-5 md:p-6 h-full"
        style={{
          background: cardStyle.backgroundGradient
        }}
      >
        {/* Glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"
          style={{
            background: cardStyle.backgroundGradient,
            boxShadow: `0 0 40px ${cardStyle.glowColor}`
          }}
        />

        {/* Main Content */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm md:text-base text-gray-600 mb-2 font-medium">
              {title}
            </p>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              {count}
            </h3>
          </div>
          
          {/* Icon with Solid Background */}
          <div 
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform transition-transform duration-300 hover:rotate-6"
            style={{
              background: cardStyle.iconBg,
              boxShadow: `0 8px 16px ${cardStyle.glowColor}`
            }}
          >
            <Icon name={icon} size={28} color="#ffffff" className="md:w-8 md:h-8" />
          </div>
        </div>
        
        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center gap-2 pt-3">
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold ${
                isPositiveTrend 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <Icon 
                name={isPositiveTrend ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                color={isPositiveTrend ? '#059669' : '#dc2626'} 
              />
              <span className="text-sm font-bold">
                {trendValue}%
              </span>
            </div>
            <span className="text-sm text-gray-600 font-medium">vs last week</span>
          </div>
        )}

        {/* Decorative shimmer effect */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 rounded-2xl opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${cardStyle.iconBg}40 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
};

export default SummaryCard;