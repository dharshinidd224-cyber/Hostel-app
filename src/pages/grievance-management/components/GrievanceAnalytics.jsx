import React from 'react';
import Icon from '../../../components/AppIcon';

const GrievanceAnalytics = ({ analytics }) => {
  const statCards = [
    { label: 'Total Grievances', value: analytics?.total, icon: 'FileText', color: '#2563eb' },
    { label: 'Pending', value: analytics?.pending, icon: 'Clock', color: '#f59e0b' },
    { label: 'In Progress', value: analytics?.inProgress, icon: 'RefreshCw', color: '#6366f1' },
    { label: 'Resolved', value: analytics?.resolved, icon: 'CheckCircle', color: '#16a34a' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {statCards.map((stat, i) => (
        <div key={i} className="stat-card">
          <div className="stat-inner">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon name={stat.icon} size={22} color={stat.color} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>

            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: analytics?.total
                    ? `${(stat.value / analytics.total) * 100}%`
                    : '0%',
                  backgroundColor: stat.color
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .stat-card {
          position: relative;
          padding: 2px;
          border-radius: 18px;
          background: linear-gradient(135deg, #e0e7ff, #fdf2f8);
        }

        .stat-inner {
          background: #ffffff;
          border-radius: 16px;
          padding: 18px;
          transition: all 0.25s ease;
        }

        .stat-card:hover .stat-inner {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }
      `}</style>
    </div>
  );
};

export default GrievanceAnalytics;