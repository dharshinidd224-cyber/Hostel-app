import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusBadgeSystem from '../../../components/ui/StatusBadgeSystem';
import { Checkbox } from '../../../components/ui/Checkbox';

const GrievanceMobileCard = ({ grievance, isSelected, onSelect, onStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mobile-gradient">
      <div className="mobile-inner">
        <div className="flex items-start gap-3 mb-4">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(grievance.id, e.target.checked)}
          />

          <div className="flex-1">
            <div className="flex justify-between mb-3">
              <div className="flex gap-3">
                
                <div>
                  <div className="font-semibold">{grievance.studentName}</div>
                  <div className="text-xs text-muted-foreground">
                    Block {grievance.block} • Room {grievance.room}
                  </div>
                </div>
              </div>
              <StatusBadgeSystem status={grievance.status} size="small" />
            </div>

            {isExpanded && (
              <p className="text-sm text-muted-foreground mb-4">
                {grievance.description}
              </p>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                fullWidth
              >
                {isExpanded ? 'Hide' : 'View'}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onStatusUpdate(grievance)}
                fullWidth
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-gradient {
          padding: 2px;
          border-radius: 18px;
          background: linear-gradient(135deg, #c7d2fe, #fbcfe8);
        }

        .mobile-inner {
          background: #ffffff;
          border-radius: 16px;
          padding: 16px;
        }
      `}</style>
    </div>
  );
};

export default GrievanceMobileCard;