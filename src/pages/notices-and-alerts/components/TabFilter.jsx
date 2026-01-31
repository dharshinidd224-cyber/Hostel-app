import React from 'react';
import Icon from '../../../components/AppIcon';

const TabFilter = ({ activeTab, setActiveTab, allCount, noticesCount, alertsCount }) => {
  const tabs = [
    { id: 'all', label: 'All', count: allCount, icon: 'Inbox' },
    { id: 'notices', label: 'Notices', count: noticesCount, icon: 'FileText' },
    { id: 'alerts', label: 'Alerts', count: alertsCount, icon: 'AlertTriangle' }
  ];

  return (
    <div className="mb-6">
      <div className="bg-card rounded-xl p-2 border border-border shadow-elevation-sm">
        <div className="flex gap-2 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-smooth whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-elevation-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabFilter;