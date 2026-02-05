import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const TargetAudienceSelector = ({ selectedTargets, onTargetChange }) => {
  const [selectAll, setSelectAll] = useState(false);

  const blocks = [
    { id: 'block-a', label: 'Block A', students: 120 },
    { id: 'block-b', label: 'Block B', students: 115 },
    { id: 'block-c', label: 'Block C', students: 108 },
    { id: 'block-d', label: 'Block D', students: 95 }
  ];

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    onTargetChange(checked ? blocks.map(b => b.id) : []);
  };

  const handleTargetToggle = (id) => {
    const updated = selectedTargets.includes(id)
      ? selectedTargets.filter(x => x !== id)
      : [...selectedTargets, id];
    onTargetChange(updated);
    setSelectAll(false);
  };

  const estimatedRecipients = selectedTargets.reduce((sum, id) => {
    const block = blocks.find(b => b.id === id);
    return sum + (block?.students || 0);
  }, 0);

  return (
    <>
      <style jsx>{`
        @keyframes borderGradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .gradient-border {
          background:
            linear-gradient(#ffffff, #ffffff) padding-box,
            linear-gradient(
              135deg,
              #3b82f6,
              #8b5cf6,
              #ec4899,
              #3b82f6
            ) border-box;
          border: 2px solid transparent;
          border-radius: 18px;
          background-size: 200% 200%;
          animation: borderGradientFlow 4s ease infinite;
        }
      `}</style>

      {/* 🔥 ONE OUTER BORDER ONLY */}
      <div className="gradient-border p-[2px]">
        <div className="bg-white rounded-[16px] p-5 space-y-5">

          {/* Header */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Target Audience <span className="text-destructive">*</span>
            </label>
            <Checkbox
              label="Select All"
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
              size="sm"
            />
          </div>

          {/* Hostel Blocks */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Icon name="Building" size={16} />
              <span>Hostel Blocks</span>
            </div>

            <div className="space-y-2">
              {blocks.map(block => (
                <label
                  key={block.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedTargets.includes(block.id)}
                      onChange={() => handleTargetToggle(block.id)}
                    />
                    <span>{block.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {block.students} students
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Estimated Recipients (INSIDE SAME BORDER) */}
          {estimatedRecipients > 0 && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5">
              <div className="flex items-center gap-2 font-medium text-primary">
                <Icon name="Users" size={18} />
                <span>Estimated Recipients</span>
              </div>
              <div className="text-lg font-semibold text-primary">
                {estimatedRecipients}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default TargetAudienceSelector;
