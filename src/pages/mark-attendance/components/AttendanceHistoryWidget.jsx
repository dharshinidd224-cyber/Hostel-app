import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceHistoryWidget = ({ attendanceRecords, currentStreak }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return { name: 'CheckCircle2', color: 'var(--color-success)' };
      case 'absent':
        return { name: 'XCircle', color: 'var(--color-error)' };
      default:
        return { name: 'MinusCircle', color: 'var(--color-muted-foreground)' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return 'bg-success/10 text-success border-success/20';
      case 'absent':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-elevation-md p-4 md:p-6 lg:p-8 border border-border">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground flex items-center gap-2 md:gap-3">
          <Icon name="Calendar" size={24} color="var(--color-primary)" />
          Attendance History
        </h3>
        <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-lg border border-primary/20">
          <Icon name="Flame" size={18} color="var(--color-primary)" />
          <span className="text-sm md:text-base font-semibold text-primary whitespace-nowrap">
            {currentStreak} Day Streak
          </span>
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        {attendanceRecords?.map((record) => {
          const statusIcon = getStatusIcon(record?.status);
          const statusBadge = getStatusBadge(record?.status);

          return (
            <div
              key={record?.id}
              className="flex items-center justify-between p-3 md:p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border transition-smooth"
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  record?.status === 'present' ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <Icon name={statusIcon?.name} size={20} color={statusIcon?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-medium text-foreground">
                    {record?.date}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                    {record?.time_marked}
                  </p>
                </div>
              </div>
              <span className={`text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full border ${statusBadge} whitespace-nowrap`}>
                {record?.status?.charAt(0)?.toUpperCase() + record?.status?.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
      {attendanceRecords?.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <Icon name="Calendar" size={32} color="var(--color-muted-foreground)" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            No attendance records yet. Mark your first attendance today!
          </p>
        </div>
      )}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-success mb-1">
              {attendanceRecords?.filter(r => r?.status === 'present')?.length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Present Days</div>
          </div>
          <div className="text-center p-3 md:p-4 bg-error/5 rounded-lg border border-error/20">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-error mb-1">
              {attendanceRecords?.filter(r => r?.status === 'absent')?.length}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Absent Days</div>
          </div>
          <div className="text-center p-3 md:p-4 bg-primary/5 rounded-lg border border-primary/20 col-span-2 md:col-span-1">
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1">
              {attendanceRecords?.length > 0 
                ? Math.round((attendanceRecords?.filter(r => r?.status === 'present')?.length / attendanceRecords?.length) * 100)
                : 0}%
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">Attendance Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistoryWidget;