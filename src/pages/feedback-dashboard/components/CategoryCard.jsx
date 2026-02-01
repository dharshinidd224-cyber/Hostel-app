import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryCard = ({ category, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border transition-smooth cursor-pointer ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:shadow-elevation-lg'
      }`}
    >
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg ${category?.bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon name={category?.icon} size={24} color={category?.iconColor} className="md:w-7 md:h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
            {category?.name}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {category?.totalFeedback} feedback
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Avg Rating</span>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} color="var(--color-warning)" className="fill-current" />
            <span className="text-sm font-semibold text-foreground">{category?.avgRating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Recent</span>
          <span className="text-sm font-semibold text-foreground">{category?.recentCount} new</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;