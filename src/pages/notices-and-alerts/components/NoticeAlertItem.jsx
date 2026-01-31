import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoticeAlertItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRead, setIsRead] = useState(item?.isRead);

  const getPriorityConfig = (priority) => {
    if (priority === 'high') {
      return {
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/30',
        icon: 'AlertTriangle',
        label: 'High Priority',
        badgeBg: 'bg-error',
        badgeText: 'text-error-foreground'
      };
    }
    if (priority === 'medium') {
      return {
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/30',
        icon: 'AlertCircle',
        label: 'Medium Priority',
        badgeBg: 'bg-warning',
        badgeText: 'text-warning-foreground'
      };
    }
    return {
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-border',
      icon: 'Info',
      label: 'Normal',
      badgeBg: 'bg-primary',
      badgeText: 'text-primary-foreground'
    };
  };

  const getTypeConfig = (type) => {
    if (type === 'alert') {
      return {
        label: 'Alert',
        color: 'text-error',
        bgColor: 'bg-error/10'
      };
    }
    return {
      label: 'Notice',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    };
  };

  const config = getPriorityConfig(item?.priority);
  const typeConfig = getTypeConfig(item?.type);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isRead) {
      setIsRead(true);
    }
  };

  return (
    <div
      className={`bg-card rounded-xl border-2 shadow-elevation-sm transition-smooth hover:shadow-elevation-md ${
        config?.borderColor
      } ${!isRead ? 'border-l-4' : ''}`}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className={`${config?.bgColor} rounded-lg p-3 flex-shrink-0`}>
            <Icon name={config?.icon} size={24} className={config?.color} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className={`text-xs font-semibold uppercase px-2 py-1 rounded ${typeConfig?.bgColor} ${typeConfig?.color}`}
                  >
                    {typeConfig?.label}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${config?.badgeBg} ${config?.badgeText}`}
                  >
                    {config?.label}
                  </span>
                  {item?.category && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {item?.category}
                    </span>
                  )}
                  {!isRead && (
                    <span className="flex items-center gap-1 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      <Icon name="Circle" size={8} className="fill-current" />
                      New
                    </span>
                  )}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                  {item?.title}
                </h3>
              </div>
            </div>

            <p
              className={`text-sm text-muted-foreground mb-3 ${
                isExpanded ? '' : 'line-clamp-2'
              }`}
            >
              {item?.message}
            </p>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="User" size={14} />
                  <span>{item?.wardenName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  <span>{item?.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  <span>{item?.time}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleExpand}
                className="text-primary hover:text-primary/80"
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
  );
};

export default NoticeAlertItem;