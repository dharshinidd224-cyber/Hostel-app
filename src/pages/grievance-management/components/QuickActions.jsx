import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onEmergencyClick, onOverdueClick, emergencyCount, overdueCount }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
          <Icon name="AlertTriangle" size={20} color="#dc2626" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Immediate attention required</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Emergency */}
        <button onClick={onEmergencyClick} className="action-card">
          <div className="action-inner">
            <div className="flex items-center gap-4">
              <div className="icon-box red">
                <Icon name="AlertCircle" size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Emergency Grievances</h3>
                <p className="text-sm text-muted-foreground">Requires immediate action</p>
              </div>
            </div>
            <span className="count red">{emergencyCount}</span>
          </div>
        </button>

        {/* Overdue */}
        <button onClick={onOverdueClick} className="action-card">
          <div className="action-inner">
            <div className="flex items-center gap-4">
              <div className="icon-box orange">
                <Icon name="Clock" size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Overdue Items</h3>
                <p className="text-sm text-muted-foreground">Past resolution deadline</p>
              </div>
            </div>
            <span className="count orange">{overdueCount}</span>
          </div>
        </button>
      </div>

      <style jsx>{`
        .action-card {
          padding: 2px;
          border-radius: 18px;
          background: linear-gradient(135deg, #fee2e2, #ffedd5);
          transition: all 0.25s ease;
        }

        .action-inner {
          background: white;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .action-card:hover .action-inner {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-box.red { background: #fee2e2; color: #dc2626; }
        .icon-box.orange { background: #ffedd5; color: #ea580c; }

        .count {
          font-size: 1.8rem;
          font-weight: 700;
        }

        .count.red { color: #dc2626; }
        .count.orange { color: #ea580c; }
      `}</style>
    </div>
  );
};

export default QuickActions;