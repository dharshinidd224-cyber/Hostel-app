import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'pending': {
        label: 'Pending',
        icon: 'Clock',
        gradient: 'from-amber-400 to-orange-500',
        bgGradient: 'from-amber-50 to-orange-50',
        darkBgGradient: 'dark:from-amber-950/40 dark:to-orange-900/40',
        textColor: 'text-amber-700 dark:text-amber-300',
        iconColor: '#f59e0b',
        borderColor: 'border-amber-200 dark:border-amber-800',
        shadowColor: 'shadow-amber-500/20'
      },
      'in-progress': {
        label: 'In Progress',
        icon: 'RefreshCw',
        gradient: 'from-indigo-400 to-purple-500',
        bgGradient: 'from-indigo-50 to-purple-50',
        darkBgGradient: 'dark:from-indigo-950/40 dark:to-purple-900/40',
        textColor: 'text-indigo-700 dark:text-indigo-300',
        iconColor: '#6366f1',
        borderColor: 'border-indigo-200 dark:border-indigo-800',
        shadowColor: 'shadow-indigo-500/20'
      },
      'resolved': {
        label: 'Resolved',
        icon: 'CheckCircle2',
        gradient: 'from-emerald-400 to-green-500',
        bgGradient: 'from-emerald-50 to-green-50',
        darkBgGradient: 'dark:from-emerald-950/40 dark:to-green-900/40',
        textColor: 'text-emerald-700 dark:text-emerald-300',
        iconColor: '#10b981',
        borderColor: 'border-emerald-200 dark:border-emerald-800',
        shadowColor: 'shadow-emerald-500/20'
      },
      'rejected': {
        label: 'Rejected',
        icon: 'XCircle',
        gradient: 'from-red-400 to-rose-500',
        bgGradient: 'from-red-50 to-rose-50',
        darkBgGradient: 'dark:from-red-950/40 dark:to-rose-900/40',
        textColor: 'text-red-700 dark:text-red-300',
        iconColor: '#ef4444',
        borderColor: 'border-red-200 dark:border-red-800',
        shadowColor: 'shadow-red-500/20'
      }
    };

    return configs[status] || configs['pending'];
  };

  const config = getStatusConfig(status);

  return (
    <div 
      className={`
        inline-flex items-center gap-2
        px-4 py-2
        rounded-xl
        bg-gradient-to-r ${config.bgGradient} ${config.darkBgGradient}
        border-2 ${config.borderColor}
        shadow-md ${config.shadowColor}
        transition-all duration-300
        hover:scale-105 hover:shadow-lg
      `}
    >
      {/* Icon with gradient background */}
      <div className={`
        w-6 h-6 
        rounded-lg 
        bg-gradient-to-br ${config.gradient}
        flex items-center justify-center
        shadow-sm
      `}>
        <Icon 
          name={config.icon} 
          size={14} 
          color="white"
          className="drop-shadow-sm"
        />
      </div>
      
      {/* Status label */}
      <span className={`
        text-sm font-bold ${config.textColor}
        tracking-wide
      `}>
        {config.label}
      </span>
    </div>
  );
};

export default StatusBadge;