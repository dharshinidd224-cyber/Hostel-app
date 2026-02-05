import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoticeAlertItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRead, setIsRead] = useState(item?.isRead);

  const getPriorityConfig = (priority, type) => {
    // For ALERTS - Light Red/Orange gradient borders
    if (type === 'alert') {
      if (priority === 'high') {
        return {
          color: 'text-red-700',
          borderGradient: 'linear-gradient(135deg, #fecaca, #fca5a5, #fbbcbc)',
          icon: 'AlertTriangle',
          label: 'High Priority',
          badgeBg: 'bg-red-600',
          badgeText: 'text-white',
          iconBg: 'bg-red-600',
          iconColor: '#ffffff',
          shadowColor: 'rgba(220, 38, 38, 0.08)'
        };
      }
      if (priority === 'medium') {
        return {
          color: 'text-orange-700',
          borderGradient: 'linear-gradient(135deg, #fed7aa, #fdba74, #fcd2a0)',
          icon: 'AlertCircle',
          label: 'Medium Priority',
          badgeBg: 'bg-orange-600',
          badgeText: 'text-white',
          iconBg: 'bg-orange-600',
          iconColor: '#ffffff',
          shadowColor: 'rgba(234, 88, 12, 0.08)'
        };
      }
      return {
        color: 'text-amber-700',
        borderGradient: 'linear-gradient(135deg, #fde68a, #fcd34d, #fde99a)',
        icon: 'Info',
        label: 'Normal',
        badgeBg: 'bg-amber-600',
        badgeText: 'text-white',
        iconBg: 'bg-amber-600',
        iconColor: '#ffffff',
        shadowColor: 'rgba(217, 119, 6, 0.08)'
      };
    }
    
    // For NOTICES - Light Blue gradient border
    return {
      color: 'text-blue-700',
      borderGradient: 'linear-gradient(135deg, #bfdbfe, #93c5fd, #c3dffe)',
      icon: 'Bell',
      label: 'General Notice',
      badgeBg: 'bg-blue-600',
      badgeText: 'text-white',
      iconBg: 'bg-blue-600',
      iconColor: '#ffffff',
      shadowColor: 'rgba(37, 99, 235, 0.08)'
    };
  };

  const getTypeConfig = (type) => {
    if (type === 'alert') {
      return {
        label: 'ALERT',
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      };
    }
    return {
      label: 'NOTICE',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    };
  };

  const config = getPriorityConfig(item?.priority, item?.type);
  const typeConfig = getTypeConfig(item?.type);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isRead) {
      setIsRead(true);
    }
  };

  return (
    <div 
      className="relative rounded-2xl p-[2px] transition-all duration-300 hover:shadow-md"
      style={{
        background: config?.borderGradient
      }}
    >
      {/* Main Content with White Background */}
      <div className="relative rounded-2xl bg-white">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            {/* Icon Container */}
            <div 
              className={`rounded-2xl p-3.5 flex-shrink-0 ${config?.iconBg}`}
            >
              <Icon name={config?.icon} size={24} color={config?.iconColor} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1.5 rounded-lg border ${typeConfig?.bgColor} ${typeConfig?.color} ${typeConfig?.borderColor}`}
                    >
                      {typeConfig?.label}
                    </span>
                    <span
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${config?.badgeBg} ${config?.badgeText}`}
                    >
                      {config?.label}
                    </span>
                    {item?.category && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200">
                        {item?.category}
                      </span>
                    )}
                    {!isRead && (
                      <span className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-semibold">
                        <Icon name="Circle" size={8} className="fill-current" />
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                    {item?.title}
                  </h3>
                </div>
              </div>

              <p
                className={`text-sm text-gray-700 mb-3 leading-relaxed ${
                  isExpanded ? '' : 'line-clamp-2'
                }`}
              >
                {item?.message}
              </p>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Icon name="User" size={14} />
                    <span className="font-medium">{item?.wardenName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Calendar" size={14} />
                    <span>{item?.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Clock" size={14} />
                    <span>{item?.time}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleExpand}
                  className="text-gray-700 hover:text-gray-900 font-semibold"
                >
                  {isExpanded ? (
                    <>
                      <Icon name="ChevronUp" size={16} className="mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <Icon name="ChevronDown" size={16} className="mr-1" />
                      Read More
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeAlertItem;