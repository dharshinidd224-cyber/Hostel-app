import React from 'react';
import Icon from '../../../components/AppIcon';

const NoticeAlertCard = ({ notices, alerts }) => {
  const hasContent = (notices && notices?.length > 0) || (alerts && alerts?.length > 0);

  const getItemConfig = (priority) => {
    const configs = {
      'high': {
        gradient: 'bg-gradient-to-br from-red-50 via-rose-100 to-pink-100',
        hoverGradient: 'hover:from-red-100 hover:via-rose-200 hover:to-pink-200',
        icon: 'AlertTriangle',
        iconBg: 'bg-rose-500',
        label: 'ALERT',
        labelColor: 'text-rose-700',
        textColor: 'text-gray-800',
        descColor: 'text-gray-600',
        badgeBg: 'bg-red-600',
        borderColor: 'border-l-rose-500'
      },
      'normal': {
        gradient: 'bg-gradient-to-br from-cyan-50 via-blue-100 to-indigo-100',
        hoverGradient: 'hover:from-cyan-100 hover:via-blue-200 hover:to-indigo-200',
        icon: 'Bell',
        iconBg: 'bg-blue-500',
        label: 'NOTICE',
        labelColor: 'text-blue-700',
        textColor: 'text-gray-800',
        descColor: 'text-gray-600',
        badgeBg: 'bg-blue-600',
        borderColor: 'border-l-blue-500'
      }
    };
    return configs?.[priority] || configs?.['normal'];
  };

  if (!hasContent) {
    return (
      <div className="bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 rounded-2xl p-6 border border-cyan-200/50 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 shadow-md">
            <Icon name="Bell" size={22} color="white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Latest Updates</h3>
        </div>
        <div className="text-center py-8 bg-white/60 rounded-xl backdrop-blur-sm">
          <Icon name="Inbox" size={48} className="mx-auto mb-4 text-gray-400 opacity-60" />
          <p className="text-sm text-gray-500 font-medium">No updates available</p>
        </div>
      </div>
    );
  }

  const allItems = [
    ...(alerts?.map(alert => ({ ...alert, type: 'alert' })) || []),
    ...(notices?.map(notice => ({ ...notice, type: 'notice' })) || [])
  ].sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return 0;
  });

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-100 rounded-2xl p-6 border border-cyan-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header with gradient icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 shadow-md">
          <Icon name="Bell" size={22} color="white" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Latest Updates</h3>
      </div>

      {/* Updates list */}
      <div className="space-y-3">
        {allItems?.map((item, index) => {
          const config = getItemConfig(item?.priority);
          return (
            <div 
              key={index} 
              className={`relative overflow-hidden ${config?.gradient} ${config?.hoverGradient} rounded-xl p-4 border-l-4 ${config?.borderColor} transition-all duration-300 hover:shadow-md group`}
            >
              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>

              <div className="relative flex items-start gap-3">
                {/* Icon */}
                <div className={`${config?.iconBg} rounded-lg p-2.5 flex-shrink-0 shadow-sm`}>
                  <Icon name={config?.icon} size={18} color="white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Label and Priority Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold ${config?.labelColor}`}>
                      {config?.label}
                    </span>
                    {item?.priority === 'high' && (
                      <span className={`text-xs font-bold text-white ${config?.badgeBg} px-2 py-0.5 rounded-full shadow-sm`}>
                        High Priority
                      </span>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h4 className={`text-sm font-bold ${config?.textColor} mb-2`}>
                    {item?.title}
                  </h4>
                  
                  {/* Message */}
                  <p className={`text-xs ${config?.descColor} line-clamp-2 mb-3`}>
                    {item?.message}
                  </p>
                  
                  {/* Date */}
                  <div className="flex items-center justify-end">
                    <span className="text-xs text-gray-500 font-medium">
                      {item?.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoticeAlertCard;