import React from 'react';
import Icon from '../../../components/AppIcon';

const NoticeAlertHeader = ({ unreadCount }) => {
  return (
    
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Notices & Alerts
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Stay updated with important communications from wardens
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-2 bg-error/10 text-error px-4 py-2 rounded-lg">
            <Icon name="Bell" size={20} />
            <span className="font-semibold">{unreadCount} Unread</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeAlertHeader;