import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusBadgeSystem from '../../../components/ui/StatusBadgeSystem';
import { Checkbox } from '../../../components/ui/Checkbox';

const GrievanceMobileCard = ({ grievance, isSelected, onSelect, onStatusUpdate }) => {
  console.log("📋 Grievance data:", grievance); // Add this line
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="card">
      <div className="flex items-start gap-3 mb-4">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(grievance?.id, e?.target?.checked)}
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
             <div>
  <div className="text-sm font-semibold text-foreground">{grievance?.student?.name}</div>
  <div className="text-xs text-muted-foreground caption">
    Block {grievance?.student?.block_number} • Room {grievance?.student?.room_number}
  </div>
</div>
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium caption ${getPriorityColor(grievance?.priority)}`}>
              <Icon name={getPriorityIcon(grievance?.priority)} size={12} />
              <span className="capitalize">{grievance?.priority}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="text-xs font-medium text-muted-foreground data-text">ID: {grievance?.id}</div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium caption">
              <Icon name="Tag" size={10} />
              {grievance?.category}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-muted-foreground caption">
              {grievance?.submissionDate} • {grievance?.submissionTime}
            </div>
            <StatusBadgeSystem status={grievance?.status} size="small" />
          </div>

          {isExpanded && (
            <div className="mb-4 pt-4 border-t border-border">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="FileText" size={14} color="var(--color-primary)" />
                  <h4 className="text-xs font-semibold text-foreground">Description</h4>
                </div>
                <p className="text-sm text-muted-foreground">{grievance?.description}</p>
              </div>

              {grievance?.images && grievance?.images?.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Image" size={14} color="var(--color-primary)" />
                    <h4 className="text-xs font-semibold text-foreground">Images</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {grievance?.images?.map((img, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden border border-border">
                        <Image
                          src={img?.url}
                          alt={img?.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {grievance?.remarks && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MessageSquare" size={14} color="var(--color-success)" />
                    <h4 className="text-xs font-semibold text-foreground">Remarks</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm text-foreground">{grievance?.remarks}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="left"
              fullWidth
            >
              {isExpanded ? 'Hide Details' : 'View Details'}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onStatusUpdate(grievance)}
              iconName="Edit"
              iconPosition="left"
              fullWidth
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceMobileCard;