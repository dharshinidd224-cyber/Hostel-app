import React from 'react';
import NoticeAlertItem from './NoticeAlertItem';
import Icon from '../../../components/AppIcon';

const NoticeAlertList = ({ items }) => {
  if (!items || items?.length === 0) {
    return (
      <div className="bg-card rounded-xl p-8 md:p-12 border border-border shadow-elevation-sm">
        <div className="text-center">
          <Icon
            name="Inbox"
            size={64}
            className="mx-auto mb-4 text-muted-foreground opacity-50"
          />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No items found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items?.map((item) => (
        <NoticeAlertItem key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default NoticeAlertList;