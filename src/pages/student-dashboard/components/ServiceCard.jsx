import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  badge, 
  badgeColor = 'bg-primary',
  iconColor = 'var(--color-primary)'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  // Define subtle gradient backgrounds with white base
  const getGradientClass = (title) => {
    const gradients = {
      'Mark Attendance': 'from-emerald-50 via-green-50 to-teal-50',
      'Submit Grievance': 'from-orange-50 via-amber-50 to-yellow-50',
      'My Grievances': 'from-blue-50 via-indigo-50 to-purple-50',
      'Feedback': 'from-pink-50 via-rose-50 to-red-50',
      'Notices': 'from-cyan-50 via-blue-50 to-indigo-50',
      'Alerts': 'from-red-50 via-rose-50 to-pink-50'
    };
    return gradients[title] || 'from-gray-50 to-gray-100';
  };

  // Define colored left border
  const getBorderClass = (title) => {
    const borders = {
      'Mark Attendance': 'border-l-emerald-500',
      'Submit Grievance': 'border-l-orange-500',
      'My Grievances': 'border-l-blue-600',
      'Feedback': 'border-l-pink-500',
      'Notices': 'border-l-cyan-500',
      'Alerts': 'border-l-red-600'
    };
    return borders[title] || 'border-l-gray-500';
  };

  // Define icon colors
  const getIconGradient = (title) => {
    const iconGradients = {
      'Mark Attendance': 'from-emerald-500 to-teal-600',
      'Submit Grievance': 'from-orange-500 to-amber-600',
      'My Grievances': 'from-blue-600 to-purple-600',
      'Feedback': 'from-pink-500 to-rose-600',
      'Notices': 'from-cyan-500 to-blue-600',
      'Alerts': 'from-red-600 to-pink-600'
    };
    return iconGradients[title] || 'from-gray-500 to-gray-600';
  };

  const getIconColor = (title) => {
    const colors = {
      'Mark Attendance': '#10b981',
      'Submit Grievance': '#f97316',
      'My Grievances': '#2563eb',
      'Feedback': '#ec4899',
      'Notices': '#06b6d4',
      'Alerts': '#dc2626'
    };
    return colors[title] || iconColor;
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full bg-gradient-to-br ${getGradientClass(title)} rounded-xl p-6 border-l-4 ${getBorderClass(title)} border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 text-left group relative overflow-hidden`}
    >
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Icon with gradient background */}
          <div className={`bg-gradient-to-br ${getIconGradient(title)} rounded-xl p-3.5 group-hover:scale-110 transition-all duration-300 flex-shrink-0 shadow-md`}>
            <Icon name={icon} size={26} color="white" />
          </div>
          
          {/* Badge */}
          {badge !== undefined && badge !== null && (
            <span className={`${badgeColor} text-white text-sm font-bold px-3 py-1.5 rounded-full flex-shrink-0 shadow-md`}>
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {description}
        </p>

        {/* Access Button */}
        <div className={`flex items-center gap-2 font-semibold text-sm bg-gradient-to-r ${getIconGradient(title)} bg-clip-text text-transparent`}>
          <span>Access</span>
          <Icon 
            name="ArrowRight" 
            size={16} 
            color={getIconColor(title)}
            className="group-hover:translate-x-1 transition-transform duration-300" 
          />
        </div>
      </div>
    </button>
  );
};

export default ServiceCard;