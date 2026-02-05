import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentGrievanceCard = ({ grievances }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'Submitted': { 
        color: 'text-indigo-700', 
        gradient: 'bg-gradient-to-br from-indigo-50 via-purple-100 to-violet-100',
        hoverGradient: 'hover:from-indigo-100 hover:via-purple-200 hover:to-violet-200',
        icon: 'FileText',
        iconBg: 'bg-indigo-500',
        iconColor: 'white',
        statusBg: 'bg-indigo-500',
        borderColor: 'border-l-indigo-500'
      },
      'In Progress': { 
        color: 'text-orange-700', 
        gradient: 'bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-100',
        hoverGradient: 'hover:from-orange-100 hover:via-amber-200 hover:to-yellow-200',
        icon: 'Clock',
        iconBg: 'bg-orange-500',
        iconColor: 'white',
        statusBg: 'bg-orange-500',
        borderColor: 'border-l-orange-500'
      },
      'Resolved': { 
        color: 'text-teal-700', 
        gradient: 'bg-gradient-to-br from-teal-50 via-cyan-100 to-sky-100',
        hoverGradient: 'hover:from-teal-100 hover:via-cyan-200 hover:to-sky-200',
        icon: 'CheckCircle2',
        iconBg: 'bg-teal-500',
        iconColor: 'white',
        statusBg: 'bg-teal-500',
        borderColor: 'border-l-teal-500'
      }
    };
    return configs?.[status] || configs?.['Submitted'];
  };

  if (!grievances || grievances?.length === 0) {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 rounded-2xl p-6 border border-purple-200/50 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-md">
            <Icon name="MessageSquare" size={22} color="white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Recent Grievances</h3>
        </div>
        <div className="text-center py-8 bg-white/60 rounded-xl backdrop-blur-sm">
          <Icon name="Inbox" size={48} className="mx-auto mb-4 text-gray-400 opacity-60" />
          <p className="text-sm text-gray-500 font-medium">No grievances submitted yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 rounded-2xl p-6 border border-purple-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header with gradient icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 shadow-md">
          <Icon name="MessageSquare" size={22} color="white" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-800">Recent Grievances</h3>
      </div>

      {/* Grievances list */}
      <div className="space-y-3">
        {grievances?.map((grievance) => {
          const config = getStatusConfig(grievance?.status);
          return (
            <div 
              key={grievance?.id} 
              className={`relative overflow-hidden ${config?.gradient} ${config?.hoverGradient} rounded-xl p-4 border-l-4 ${config?.borderColor} transition-all duration-300 hover:shadow-md group`}
            >
              {/* Subtle shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>

              <div className="relative flex items-start gap-3">
                {/* Icon */}
                <div className={`${config?.iconBg} rounded-lg p-2.5 flex-shrink-0 shadow-sm`}>
                  <Icon name={config?.icon} size={18} color={config?.iconColor} />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Category */}
                  <p className="text-sm font-bold text-gray-800 mb-1">
                    {grievance?.category}
                  </p>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {grievance?.description}
                  </p>
                  
                  {/* Status and Date */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold text-white ${config?.statusBg} px-3 py-1 rounded-full shadow-sm`}>
                      {grievance?.status}
                    </span>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                      {grievance?.date}
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

export default RecentGrievanceCard;