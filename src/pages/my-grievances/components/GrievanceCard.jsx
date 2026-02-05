import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

// Import the new StatusBadge component
import StatusBadge from './StatusBadge';

const GrievanceCard = ({ grievance, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Water': 'Droplet',
      'Electricity': 'Zap',
      'Food': 'UtensilsCrossed',
      'Internet': 'Wifi',
      'Cleanliness': 'Sparkles',
      'Security': 'Shield',
      'Others': 'AlertCircle'
    };
    return icons?.[category] || 'AlertCircle';
  };

  const getCategoryColors = (category) => {
    const colors = {
      'Water': {
        gradient: 'from-cyan-400 via-cyan-500 to-blue-500',
        lightGradient: 'from-cyan-100 via-cyan-200 to-blue-200',
        bg: 'bg-gradient-to-br from-cyan-50 to-blue-50',
        darkBg: 'dark:from-cyan-950/20 dark:to-blue-950/20',
        icon: '#06b6d4',
        borderAccent: 'border-t-cyan-400'
      },
      'Electricity': {
        gradient: 'from-yellow-400 via-yellow-500 to-amber-500',
        lightGradient: 'from-yellow-100 via-yellow-200 to-amber-200',
        bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
        darkBg: 'dark:from-yellow-950/20 dark:to-amber-950/20',
        icon: '#eab308',
        borderAccent: 'border-t-yellow-400'
      },
      'Food': {
        gradient: 'from-orange-400 via-orange-500 to-red-500',
        lightGradient: 'from-orange-100 via-orange-200 to-red-200',
        bg: 'bg-gradient-to-br from-orange-50 to-red-50',
        darkBg: 'dark:from-orange-950/20 dark:to-red-950/20',
        icon: '#f97316',
        borderAccent: 'border-t-orange-400'
      },
      'Internet': {
        gradient: 'from-purple-400 via-purple-500 to-pink-500',
        lightGradient: 'from-purple-100 via-purple-200 to-pink-200',
        bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
        darkBg: 'dark:from-purple-950/20 dark:to-pink-950/20',
        icon: '#a855f7',
        borderAccent: 'border-t-purple-400'
      },
      'Cleanliness': {
        gradient: 'from-teal-400 via-teal-500 to-emerald-500',
        lightGradient: 'from-teal-100 via-teal-200 to-emerald-200',
        bg: 'bg-gradient-to-br from-teal-50 to-emerald-50',
        darkBg: 'dark:from-teal-950/20 dark:to-emerald-950/20',
        icon: '#14b8a6',
        borderAccent: 'border-t-teal-400'
      },
      'Security': {
        gradient: 'from-red-400 via-red-500 to-rose-500',
        lightGradient: 'from-red-100 via-red-200 to-rose-200',
        bg: 'bg-gradient-to-br from-red-50 to-rose-50',
        darkBg: 'dark:from-red-950/20 dark:to-rose-950/20',
        icon: '#ef4444',
        borderAccent: 'border-t-red-400'
      },
      'Others': {
        gradient: 'from-gray-400 via-gray-500 to-slate-500',
        lightGradient: 'from-gray-100 via-gray-200 to-slate-200',
        bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
        darkBg: 'dark:from-gray-950/20 dark:to-slate-950/20',
        icon: '#6b7280',
        borderAccent: 'border-t-gray-400'
      }
    };
    return colors[category] || colors['Others'];
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const categoryColors = getCategoryColors(grievance?.category);

  return (
    <div 
      className={`
        relative overflow-hidden
        bg-white dark:bg-gray-900
        border-2 border-gray-100 dark:border-gray-800
        border-t-4 ${categoryColors.borderAccent}
        rounded-2xl 
        shadow-sm
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1 hover:border-gray-200 dark:hover:border-gray-700
        ${isExpanded ? 'shadow-lg' : ''}
      `}
    >
      <div className="p-6">
        {/* Header Section - Icon, Category, Status, and Expand Button */}
        <div className="flex items-start gap-4 mb-5">
          {/* Category Icon with Beautiful Gradient */}
          <div 
            className={`
              flex-shrink-0
              w-16 h-16
              rounded-2xl
              bg-gradient-to-br ${categoryColors.lightGradient}
              border-2 border-white/60 dark:border-gray-800/60
              shadow-lg
              flex items-center justify-center
              transition-transform duration-300
              hover:scale-110 hover:rotate-3
            `}
          >
            <Icon 
              name={getCategoryIcon(grievance?.category)} 
              size={28} 
              color={categoryColors.icon}
              className="drop-shadow-sm"
            />
          </div>

          {/* Category Name, Status Badge, and ID */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {grievance?.category}
              </h3>
              <StatusBadge status={grievance?.status} />
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Icon name="Hash" size={14} />
              <span className="font-mono font-medium">{grievance?.id}</span>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={toggleExpand}
            className={`
              flex-shrink-0 
              w-10 h-10 
              rounded-xl
              transition-all duration-300
              flex items-center justify-center
              ${isExpanded 
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              }
            `}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
            />
          </button>
        </div>

        {/* Date and Time Row with Enhanced Design */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`
            flex items-center gap-2 px-3 py-2 rounded-lg
            ${categoryColors.bg} ${categoryColors.darkBg}
            border border-gray-200/50 dark:border-gray-700/50
          `}>
            <div className="w-8 h-8 rounded-lg bg-white/60 dark:bg-gray-800/60 flex items-center justify-center">
              <Icon name="Calendar" size={16} color={categoryColors.icon} />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {formatDate(grievance?.submittedDate)}
            </span>
          </div>
          
          <div className={`
            flex items-center gap-2 px-3 py-2 rounded-lg
            ${categoryColors.bg} ${categoryColors.darkBg}
            border border-gray-200/50 dark:border-gray-700/50
          `}>
            <div className="w-8 h-8 rounded-lg bg-white/60 dark:bg-gray-800/60 flex items-center justify-center">
              <Icon name="Clock" size={16} color={categoryColors.icon} />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {formatTime(grievance?.submittedDate)}
            </span>
          </div>
        </div>

        {/* Description Preview with Gradient Fade */}
        <div className="relative mb-2">
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-2">
            {grievance?.description}
          </p>
          {!isExpanded && grievance?.description?.length > 100 && (
            <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white dark:from-gray-900 via-white dark:via-gray-900 to-transparent pl-20 pr-2">
              <span className={`text-sm font-semibold bg-gradient-to-r ${categoryColors.gradient} bg-clip-text text-transparent`}>
                Read more
              </span>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pt-6 mt-6 border-t-2 border-gray-100 dark:border-gray-800 space-y-6 animate-in slide-in-from-top-4 duration-300">
            {/* Full Description with Beautiful Card */}
            <div className={`
              ${categoryColors.bg} ${categoryColors.darkBg}
              rounded-2xl p-5
              border-2 border-gray-200/50 dark:border-gray-700/50
              shadow-sm
            `}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`
                  w-10 h-10 rounded-xl
                  bg-gradient-to-br ${categoryColors.lightGradient}
                  flex items-center justify-center
                  shadow-md
                `}>
                  <Icon name="FileText" size={20} color={categoryColors.icon} />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                  Full Description
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {grievance?.description}
              </p>
            </div>

            {/* Uploaded Images Gallery */}
            {grievance?.images && grievance?.images?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`
                    w-10 h-10 rounded-xl
                    bg-gradient-to-br ${categoryColors.lightGradient}
                    flex items-center justify-center
                    shadow-md
                  `}>
                    <Icon name="Image" size={20} color={categoryColors.icon} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Attached Images ({grievance?.images?.length})
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {grievance?.images?.map((img, index) => (
                    <div 
                      key={index} 
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <Image
                        src={img?.url}
                        alt={img?.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Icon 
                            name="ZoomIn" 
                            size={32} 
                            color="white"
                            className="drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline with Modern Design */}
            {grievance?.timeline && grievance?.timeline?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`
                    w-10 h-10 rounded-xl
                    bg-gradient-to-br ${categoryColors.lightGradient}
                    flex items-center justify-center
                    shadow-md
                  `}>
                    <Icon name="GitBranch" size={20} color={categoryColors.icon} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                    Status Timeline
                  </h4>
                </div>
                <div className="space-y-4 ml-5">
                  {grievance?.timeline?.map((event, index) => (
                    <div key={index} className="flex gap-4 relative">
                      {/* Timeline connector line */}
                      {index < grievance?.timeline?.length - 1 && (
                        <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700"></div>
                      )}
                      
                      {/* Timeline dot with gradient */}
                      <div className="relative flex-shrink-0 pt-1.5">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${categoryColors.gradient} shadow-lg ring-4 ring-white dark:ring-gray-900`}></div>
                      </div>

                      {/* Timeline content card */}
                      <div className="flex-1 pb-4">
                        <div className={`
                          ${categoryColors.bg} ${categoryColors.darkBg}
                          rounded-xl p-4
                          border-2 border-gray-200/50 dark:border-gray-700/50
                          hover:shadow-md transition-all duration-300
                        `}>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                              {event?.status}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              {formatDate(event?.date)} • {formatTime(event?.date)}
                            </span>
                          </div>
                          {event?.remarks && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {event?.remarks}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resolution Remarks with Celebration Design */}
            {grievance?.status === 'resolved' && grievance?.resolutionRemarks && (
              <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-emerald-950/30 dark:via-green-900/20 dark:to-teal-950/30 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-800 shadow-lg">
                {/* Decorative background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-green-300/20 rounded-full blur-3xl"></div>
                
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Icon name="CheckCircle2" size={24} color="white" className="drop-shadow-md" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span>✓</span> Resolution Details
                    </h4>
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                      {grievance?.resolutionRemarks}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button with Gradient */}
            <div className="flex justify-end pt-4">
              <Button
                variant="default"
                size="md"
                onClick={() => onViewDetails(grievance)}
                iconName="ExternalLink"
                iconPosition="right"
                className={`
                  bg-gradient-to-r ${categoryColors.gradient}
                  hover:shadow-lg hover:scale-105
                  transition-all duration-300
                  font-semibold
                `}
              >
                View Full Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceCard;