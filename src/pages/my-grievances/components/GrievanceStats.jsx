import React from 'react';
import Icon from '../../../components/AppIcon';

const GrievanceStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Submitted',
      value: stats?.total || 0,
      icon: 'FileText',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      lightGradient: 'from-blue-100 via-blue-200 to-blue-300',
      bgColor: 'bg-blue-50',
      darkBgColor: 'dark:bg-blue-950/20',
      textGradient: 'from-blue-500 to-blue-700',
      iconColor: '#3b82f6',
      borderColor: 'border-blue-100 dark:border-blue-900/30'
    },
    {
      label: 'Pending',
      value: stats?.pending || 0,
      icon: 'Clock',
      gradient: 'from-amber-400 via-orange-500 to-orange-600',
      lightGradient: 'from-amber-100 via-orange-200 to-orange-300',
      bgColor: 'bg-amber-50',
      darkBgColor: 'dark:bg-amber-950/20',
      textGradient: 'from-amber-500 to-orange-600',
      iconColor: '#f59e0b',
      borderColor: 'border-amber-100 dark:border-amber-900/30'
    },
    {
      label: 'In Progress',
      value: stats?.inProgress || 0,
      icon: 'RefreshCw',
      gradient: 'from-purple-400 via-purple-500 to-indigo-600',
      lightGradient: 'from-purple-100 via-purple-200 to-indigo-300',
      bgColor: 'bg-purple-50',
      darkBgColor: 'dark:bg-purple-950/20',
      textGradient: 'from-purple-500 to-indigo-600',
      iconColor: '#a855f7',
      borderColor: 'border-purple-100 dark:border-purple-900/30'
    },
    {
      label: 'Resolved',
      value: stats?.resolved || 0,
      icon: 'CheckCircle',
      gradient: 'from-emerald-400 via-green-500 to-green-600',
      lightGradient: 'from-emerald-100 via-green-200 to-green-300',
      bgColor: 'bg-emerald-50',
      darkBgColor: 'dark:bg-emerald-950/20',
      textGradient: 'from-emerald-500 to-green-600',
      iconColor: '#10b981',
      borderColor: 'border-emerald-100 dark:border-emerald-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div 
          key={index} 
          className={`
            relative
            ${stat.bgColor} ${stat.darkBgColor}
            border ${stat.borderColor}
            rounded-2xl
            p-5
            transition-all duration-300 ease-in-out
            hover:shadow-xl hover:-translate-y-1
            group
            overflow-hidden
          `}
        >
          {/* Background subtle decoration */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.lightGradient} rounded-full blur-3xl opacity-30 transform translate-x-20 -translate-y-20`}></div>
          </div>

          {/* Content Container - Perfect Alignment */}
          <div className="relative flex items-center gap-4">
            {/* Light Gradient Icon */}
            <div 
              className={`
                flex-shrink-0
                w-14 h-14
                rounded-xl
                bg-gradient-to-br ${stat.lightGradient}
                flex items-center justify-center
                shadow-sm
                group-hover:shadow-md group-hover:scale-110
                transition-all duration-300
                border border-white/50
              `}
            >
              <Icon 
                name={stat.icon} 
                size={24} 
                color={stat.iconColor}
              />
            </div>

            {/* Label and Value - Stacked Vertically */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              {/* Label */}
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 truncate">
                {stat.label}
              </p>
              
              {/* Value */}
              <p 
                className={`
                  text-3xl font-bold
                  bg-gradient-to-r ${stat.textGradient}
                  bg-clip-text text-transparent
                  tabular-nums
                  leading-none
                `}
              >
                {stat.value}
              </p>
            </div>
          </div>

          {/* Bottom subtle accent line */}
          <div 
            className={`
              absolute bottom-0 left-0 right-0 h-0.5
              bg-gradient-to-r ${stat.gradient}
              opacity-50 group-hover:opacity-100 group-hover:h-1
              transition-all duration-300
            `}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default GrievanceStats;