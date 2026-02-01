import React from 'react';
import Icon from '../../../components/AppIcon';

const FeedbackStats = ({ stats }) => {
  const statCards = [
    {
      id: 1,
      title: 'Total Feedback',
      value: stats?.totalFeedback || 0,
      icon: 'MessageSquare',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'Average Rating',
      value: stats?.avgRating?.toFixed(1) || '0.0',
      icon: 'Star',
      iconColor: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      suffix: '/ 5.0'
    },
    {
      id: 3,
      title: 'Pending Review',
      value: stats?.pendingReview || 0,
      icon: 'Clock',
      iconColor: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    },
    {
      id: 4,
      title: 'Reviewed',
      value: stats?.reviewedCount || 0,
      icon: 'CheckCircle',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {statCards?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border"
        >
          <div className="flex items-start gap-3 md:gap-4">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg ${stat?.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon name={stat?.icon} size={24} color={stat?.iconColor} className="md:w-7 md:h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground mb-1">{stat?.title}</p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                  {stat?.value}
                </h3>
                {stat?.suffix && (
                  <span className="text-sm text-muted-foreground">{stat?.suffix}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackStats;