import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageTypeSelector = ({ selectedType, onTypeChange }) => {
  const messageTypes = [
    {
      id: 'notice',
      label: 'General Notice',
      description: 'Regular announcements and updates',
      icon: 'Bell',
      color: 'primary'
    },
    {
      id: 'alert',
      label: 'Emergency Alert',
      description: 'Urgent notifications requiring immediate attention',
      icon: 'AlertTriangle',
      color: 'destructive'
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes borderGradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes checkmarkPop {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .message-type-btn:hover .icon-container {
          animation: iconFloat 0.6s ease-in-out;
        }

        .gradient-border-animate {
          position: relative;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #2563eb 0%, #3b82f6 25%, #60a5fa 50%, #10b981 75%, #2563eb 100%) border-box;
          border: 2px solid transparent;
          background-size: 200% 200%;
          animation: borderGradientFlow 3s ease infinite;
        }

        .gradient-border-animate-red {
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #ef4444 0%, #f87171 25%, #fca5a5 50%, #f87171 75%, #ef4444 100%) border-box;
          border: 2px solid transparent;
          background-size: 200% 200%;
          animation: borderGradientFlow 3s ease infinite;
        }

        .checkmark-icon {
          animation: checkmarkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Message Type <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {messageTypes?.map((type) => (
            <button
              key={type?.id}
              type="button"
              onClick={() => onTypeChange(type?.id)}
              className={`
                message-type-btn relative p-4 md:p-5 lg:p-6 rounded-xl transition-all duration-300
                ${selectedType === type?.id
                  ? type?.color === 'destructive' 
                    ? 'gradient-border-animate-red bg-destructive/5' 
                    : 'gradient-border-animate bg-primary/5'
                  : 'border-2 border-border bg-card hover:border-muted-foreground/30 hover:shadow-lg hover:-translate-y-1'
                }
              `}
              style={selectedType === type?.id ? {
                boxShadow: type?.color === 'destructive'
                  ? '0 0 0 1px rgba(239, 68, 68, 0.1), 0 8px 24px -4px rgba(239, 68, 68, 0.25)'
                  : '0 0 0 1px rgba(37, 99, 235, 0.1), 0 8px 24px -4px rgba(37, 99, 235, 0.25)'
              } : {}}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div 
                  className={`
                    icon-container flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all duration-300
                    ${selectedType === type?.id
                      ? type?.color === 'destructive' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                    }
                  `}
                >
                  <Icon name={type?.icon} size={20} />
                </div>
                <div className="flex-1 text-left">
                  <div className={`
                    text-sm md:text-base font-semibold mb-1 transition-colors duration-200
                    ${selectedType === type?.id
                      ? type?.color === 'destructive' 
                        ? 'text-destructive' 
                        : 'text-primary'
                      : 'text-foreground'
                    }
                  `}>
                    {type?.label}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground caption">
                    {type?.description}
                  </div>
                </div>
                {selectedType === type?.id && (
                  <div 
                    className={`
                      checkmark-icon absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center
                      ${type?.color === 'destructive' ? 'bg-destructive' : 'bg-primary'}
                    `}
                    style={{
                      boxShadow: type?.color === 'destructive' 
                        ? '0 2px 8px rgba(239, 68, 68, 0.4)' 
                        : '0 2px 8px rgba(37, 99, 235, 0.4)'
                    }}
                  >
                    <Icon name="Check" size={12} color="white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MessageTypeSelector;