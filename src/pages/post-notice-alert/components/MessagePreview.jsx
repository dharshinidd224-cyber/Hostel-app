import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessagePreview = ({ isOpen, onClose, messageData }) => {
  if (!isOpen) return null;

  const { type, title, content, targets, scheduledDate, scheduledTime, attachments } = messageData;

  const isEmergency = type === 'alert';
  const estimatedRecipients = targets?.length * 25;

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

      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">

        {/* 🔥 ONE OVERALL GRADIENT BORDER */}
        <div className="gradient-border p-[2px] w-full max-w-2xl">
          <div className="bg-card rounded-[16px] shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center
                  ${isEmergency ? 'bg-destructive/10' : 'bg-primary/10'}
                `}>
                  <Icon
                    name={isEmergency ? 'AlertTriangle' : 'Eye'}
                    size={20}
                    color={isEmergency ? 'var(--color-destructive)' : 'var(--color-primary)'}
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    Message Preview
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground caption">
                    How students will see this message
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className={`
                p-4 md:p-6 rounded-xl border-2
                ${isEmergency
                  ? 'border-destructive bg-destructive/5'
                  : 'border-primary bg-primary/5'
                }
              `}>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center
                    ${isEmergency ? 'bg-destructive/10' : 'bg-primary/10'}
                  `}>
                    <Icon
                      name={isEmergency ? 'AlertTriangle' : 'Bell'}
                      size={20}
                      color={isEmergency ? 'var(--color-destructive)' : 'var(--color-primary)'}
                    />
                  </div>

                  <div className="flex-1">
                    <div className={`
                      inline-flex px-3 py-1 rounded-lg text-xs font-medium mb-2
                      ${isEmergency
                        ? 'bg-destructive/10 text-destructive border border-destructive/20'
                        : 'bg-primary/10 text-primary border border-primary/20'
                      }
                    `}>
                      {isEmergency ? 'EMERGENCY ALERT' : 'NOTICE'}
                    </div>

                    <h4 className="text-base md:text-lg font-semibold mb-2">
                      {title || 'Untitled Message'}
                    </h4>

                    <div className="text-sm md:text-base whitespace-pre-wrap">
                      {content || 'No content provided'}
                    </div>
                  </div>
                </div>

                {attachments?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Icon name="Paperclip" size={16} />
                      Attachments ({attachments.length})
                    </div>
                    {attachments.map(att => (
                      <div key={att.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon name="File" size={14} />
                        <span className="truncate">{att.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={14} />
                    {scheduledDate && scheduledTime
                      ? new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString()
                      : 'Immediate delivery'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={14} />
                    {estimatedRecipients} recipients
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground">
                <Icon name="Info" size={14} className="inline mr-1" />
                This is how your message will appear to students.
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 md:p-6 border-t border-border">
              <Button variant="outline" onClick={onClose}>
                Close Preview
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePreview;
