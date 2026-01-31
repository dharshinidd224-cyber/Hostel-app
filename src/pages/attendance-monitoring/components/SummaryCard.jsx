import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, count, icon, iconColor, bgColor, percentage }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border transition-smooth hover:shadow-elevation-lg">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground mb-1 md:mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">{count}</h3>
            {percentage !== undefined && (
              <span className="text-sm md:text-base text-muted-foreground">({percentage}%)</span>
            )}
          </div>
        </div>
        <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={24} color={iconColor} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </div>
      
      {percentage !== undefined && (
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-smooth"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;