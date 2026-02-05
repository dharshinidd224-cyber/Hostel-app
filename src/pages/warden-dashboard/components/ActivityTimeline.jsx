import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      grievance: 'AlertCircle',
      attendance: 'CheckSquare',
      notice: 'Bell',
      alert: 'AlertTriangle',
      feedback: 'MessageSquare'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (priority) => {
    const colorMap = {
      high: 'text-error',
      medium: 'text-warning',
      low: 'text-muted-foreground'
    };
    return colorMap?.[priority] || 'text-muted-foreground';
  };

  const getActivityBgColor = (priority) => {
    const bgMap = {
      high: 'bg-error/10',
      medium: 'bg-warning/10',
      low: 'bg-muted'
    };
    return bgMap?.[priority] || 'bg-muted';
  };

  return (
    <div 
      className="rounded-xl p-[2px] shadow-elevation-md"
      style={{
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
      }}
    >
      <div className="bg-card rounded-xl p-4 md:p-6 h-full">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground">Recent Activity</h3>
          <button className="text-sm md:text-base text-primary hover:text-primary/80 font-medium transition-smooth">
            View All
          </button>
        </div>
        <div className="space-y-3 md:space-y-4 max-h-96 overflow-y-auto">
          {activities?.map((activity, index) => (
            <div key={activity?.id} className="flex gap-3 md:gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${getActivityBgColor(activity?.priority)} flex items-center justify-center`}>
                  <Icon 
                    name={getActivityIcon(activity?.type)} 
                    size={16} 
                    color={activity?.priority === 'high' ? 'var(--color-error)' : activity?.priority === 'medium' ? 'var(--color-warning)' : 'var(--color-muted-foreground)'}
                    className="md:w-5 md:h-5"
                  />
                </div>
                {index < activities?.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2"></div>
                )}
              </div>

              <div className="flex-1 min-w-0 pb-3 md:pb-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm md:text-base font-medium text-foreground line-clamp-2">{activity?.title}</p>
                  {activity?.priority === 'high' && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-error/10 text-error rounded-full whitespace-nowrap flex-shrink-0">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 line-clamp-2">{activity?.description}</p>
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="User" size={12} className="md:w-3.5 md:h-3.5" />
                    {activity?.student}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} className="md:w-3.5 md:h-3.5" />
                    {activity?.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;