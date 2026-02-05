import React from 'react';
import Icon from '../../../components/AppIcon';

const FeedbackStats = ({ stats }) => {
  const statsData = [
    {
      id: 1,
      title: 'Total Feedback',
      count: stats?.totalFeedback || 0,
      icon: 'MessageSquare',
      iconColor: '#3b82f6',
      gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      iconBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      shadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
      hoverShadow: '0 8px 24px rgba(59, 130, 246, 0.25)'
    },
    {
      id: 2,
      title: 'Average Rating',
      count: `${stats?.averageRating || 0}`,
      subtitle: '/ 5.0',
      icon: 'Star',
      iconColor: '#f59e0b',
      gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      iconBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      shadow: '0 4px 12px rgba(245, 158, 11, 0.15)',
      hoverShadow: '0 8px 24px rgba(245, 158, 11, 0.25)'
    },
    {
      id: 3,
      title: 'Pending Review',
      count: stats?.pendingReview || 0,
      icon: 'Clock',
      iconColor: '#f97316',
      gradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      iconBg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      shadow: '0 4px 12px rgba(249, 115, 22, 0.15)',
      hoverShadow: '0 8px 24px rgba(249, 115, 22, 0.25)'
    },
    {
      id: 4,
      title: 'Reviewed',
      count: stats?.reviewed || 0,
      icon: 'CheckCircle',
      iconColor: '#10b981',
      gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      iconBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      shadow: '0 4px 12px rgba(16, 185, 129, 0.15)',
      hoverShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          style={{
            background: stat.gradient,
            boxShadow: stat.shadow
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = stat.hoverShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = stat.shadow;
          }}
        >
          {/* Animated background glow */}
          <div 
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
            style={{ background: stat.iconColor }}
          />
          
          {/* Icon container */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: stat.iconBg,
                boxShadow: `0 4px 12px ${stat.iconColor}40`
              }}
            >
              <Icon name={stat.icon} size={24} color="#ffffff" />
            </div>
            
            {/* Floating indicator */}
            <div className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: stat.iconColor }} />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <p className="text-sm font-medium text-gray-600 mb-1 transition-colors duration-300 group-hover:text-gray-700">
              {stat.title}
            </p>
            <div className="flex items-baseline gap-1">
              <h3 
                className="text-3xl font-bold transition-all duration-300 group-hover:scale-105"
                style={{ color: stat.iconColor }}
              >
                {stat.count}
              </h3>
              {stat.subtitle && (
                <span className="text-lg font-medium text-gray-500">
                  {stat.subtitle}
                </span>
              )}
            </div>
          </div>

          {/* Bottom accent line */}
          <div 
            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
            style={{ background: stat.iconColor }}
          />
        </div>
      ))}
    </div>
  );
};

export default FeedbackStats;