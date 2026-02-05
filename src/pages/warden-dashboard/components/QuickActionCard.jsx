import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, iconColor, bgColor, actionText, actionPath, badge }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath);
    }
  };

  // Get gradient configurations based on card type
  const getCardStyle = () => {
    if (title.includes('Attendance')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)',
        iconBg: '#3b82f6',
        borderColor: '#3b82f680',
        buttonHoverBg: '#3b82f6',
        buttonTextColor: '#3b82f6'
      };
    }
    if (title.includes('Grievance')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)',
        iconBg: '#f59e0b',
        borderColor: '#f59e0b80',
        buttonHoverBg: '#f59e0b',
        buttonTextColor: '#f59e0b'
      };
    }
    if (title.includes('Notice')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
        iconBg: '#10b981',
        borderColor: '#10b98180',
        buttonHoverBg: '#10b981',
        buttonTextColor: '#10b981'
      };
    }
    if (title.includes('Emergency') || title.includes('Alert')) {
      return {
        backgroundGradient: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fecaca 100%)',
        iconBg: '#ef4444',
        borderColor: '#ef444480',
        buttonHoverBg: '#ef4444',
        buttonTextColor: '#ef4444'
      };
    }
    return {
      backgroundGradient: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)',
      iconBg: '#6b7280',
      borderColor: '#6b728080',
      buttonHoverBg: '#6b7280',
      buttonTextColor: '#6b7280'
    };
  };

  const cardStyle = getCardStyle();

  return (
    <div 
      className="relative rounded-2xl p-5 md:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 group"
      style={{
        background: cardStyle.backgroundGradient,
        borderColor: cardStyle.borderColor
      }}
    >
      {/* Decorative shimmer effect */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-2xl opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${cardStyle.iconBg}40 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          {/* Icon Container */}
          <div 
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform transition-transform duration-300 group-hover:rotate-6"
            style={{
              background: cardStyle.iconBg,
              boxShadow: `0 8px 16px ${cardStyle.iconBg}40`
            }}
          >
            <Icon name={icon} size={28} color="#ffffff" className="md:w-8 md:h-8" />
          </div>

          {/* Title and Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">
                {title}
              </h3>
              {badge && (
                <span 
                  className="px-2.5 py-1 text-xs font-bold bg-red-600 text-white rounded-full shadow-sm"
                >
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAction}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-md group/btn"
          style={{
            borderColor: cardStyle.borderColor,
            color: cardStyle.buttonTextColor,
            background: 'white'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = cardStyle.buttonHoverBg;
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.borderColor = cardStyle.buttonHoverBg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = cardStyle.buttonTextColor;
            e.currentTarget.style.borderColor = cardStyle.borderColor;
          }}
        >
          <span>{actionText}</span>
          <Icon 
            name="ArrowRight" 
            size={18} 
            className="transform transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

export default QuickActionCard;