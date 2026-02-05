import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AbsentStudentsList = ({ students }) => {
  const navigate = useNavigate();

  const handleSendReminder = (studentId) => {
    console.log('Sending reminder to student:', studentId);
  };

  const handleViewHistory = (studentId) => {
    console.log('Viewing attendance history for student:', studentId);
  };

  const getAbsenceSeverity = (consecutiveAbsences) => {
    if (consecutiveAbsences >= 4) return 'high';
    if (consecutiveAbsences >= 2) return 'medium';
    return 'low';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (!students || students?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">All Students Present</h3>
        <p className="text-sm text-muted-foreground">No absent students found for the selected criteria.</p>
      </div>
    );
  }

  return (
    <div 
      className="rounded-xl p-[2px] shadow-elevation-md"
      style={{
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
      }}
    >
      <div className="bg-card rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Icon name="UserX" size={20} color="var(--color-error)" />
            <h3 className="text-base md:text-lg font-semibold text-foreground">
              Absent Students ({students?.length})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Student Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Student ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Block</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Room Number</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Last Attendance</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student) => {
                  const severity = getAbsenceSeverity(student?.consecutiveAbsences);
                  return (
                    <tr key={student?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="User" size={18} color="var(--color-primary)" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{student?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{student?.studentId}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Icon name="Building2" size={16} color="var(--color-primary)" />
                          <span className="text-sm text-foreground">{student?.block}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-foreground">{student?.roomNumber}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(student?.lastAttendance)?.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(severity)}`}>
                          {student?.consecutiveAbsences} day{student?.consecutiveAbsences > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Bell"
                            onClick={() => handleSendReminder(student?.id)}
                            className="text-primary hover:text-primary"
                          >
                            Remind
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="History"
                            onClick={() => handleViewHistory(student?.id)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            History
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4 p-4">
            {students?.map((student) => {
              const severity = getAbsenceSeverity(student?.consecutiveAbsences);
              return (
                <div key={student?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="User" size={18} color="var(--color-primary)" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{student?.name}</h4>
                        <p className="text-xs text-muted-foreground">{student?.studentId}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getSeverityColor(severity)}`}>
                      {student?.consecutiveAbsences} day{student?.consecutiveAbsences > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Block:</span>
                      <div className="flex items-center gap-1">
                        <Icon name="Building2" size={14} color="var(--color-primary)" />
                        <span className="text-foreground font-medium">{student?.block}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Room:</span>
                      <span className="text-foreground font-medium">{student?.roomNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Attendance:</span>
                      <span className="text-foreground font-medium">
                        {new Date(student?.lastAttendance)?.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Bell"
                      onClick={() => handleSendReminder(student?.id)}
                      className="flex-1"
                    >
                      Send Reminder
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="History"
                      onClick={() => handleViewHistory(student?.id)}
                      className="flex-1"
                    >
                      View History
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsentStudentsList;