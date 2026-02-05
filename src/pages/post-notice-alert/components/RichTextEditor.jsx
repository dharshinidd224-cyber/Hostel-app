import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RichTextEditor = ({ value, onChange, maxLength = 1000, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  const formattingTools = [
    { icon: 'Bold', label: 'Bold', action: 'bold' },
    { icon: 'Italic', label: 'Italic', action: 'italic' },
    { icon: 'Underline', label: 'Underline', action: 'underline' },
    { icon: 'List', label: 'Bullet List', action: 'list' },
    { icon: 'ListOrdered', label: 'Numbered List', action: 'numbered' }
  ];

  const handleFormat = (action) => {
    console.log(`Format action: ${action}`);
  };

  const characterCount = value?.length || 0;
  const isNearLimit = characterCount > maxLength * 0.9;
  const isOverLimit = characterCount > maxLength;

  return (
    <>
      <style jsx>{`
        @keyframes focusGlow {
          0%, 100% { box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
          50% { box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2); }
        }

        .editor-focused {
          animation: focusGlow 2s ease-in-out infinite;
        }

        .format-btn {
          transition: all 0.2s ease;
        }

        .format-btn:hover {
          transform: scale(1.1);
          background-color: rgba(37, 99, 235, 0.1);
        }

        .format-btn:active {
          transform: scale(0.95);
        }
      `}</style>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Message Content <span className="text-destructive">*</span>
        </label>
        <div 
          className={`
            border-2 rounded-xl overflow-hidden transition-all duration-300
            ${isFocused ? 'border-primary editor-focused' : error ? 'border-destructive' : 'border-border'}
            ${error ? 'bg-destructive/5' : 'bg-card'}
          `}
        >
          <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
            {formattingTools?.map((tool) => (
              <button
                key={tool?.action}
                type="button"
                onClick={() => handleFormat(tool?.action)}
                className="format-btn w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center"
                title={tool?.label}
              >
                <Icon name={tool?.icon} size={16} />
              </button>
            ))}
          </div>
          
          <textarea
            value={value}
            onChange={(e) => onChange(e?.target?.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your message here... You can use formatting tools above."
            className="w-full min-h-[200px] md:min-h-[250px] lg:min-h-[300px] p-4 md:p-5 lg:p-6 resize-none bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200"
            maxLength={maxLength}
            style={{
              lineHeight: '1.7'
            }}
          />
          
          <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
            <div className="text-xs md:text-sm caption text-muted-foreground flex items-center gap-1">
              <Icon name="Info" size={14} />
              <span>Use formatting tools for better readability</span>
            </div>
            <div 
              className={`
                text-xs md:text-sm font-medium
                ${isOverLimit ? 'text-destructive' : isNearLimit ? 'text-warning' : 'text-muted-foreground'}
              `}
              style={{
                transition: 'color 0.3s ease'
              }}
            >
              {characterCount} / {maxLength}
            </div>
          </div>
        </div>
        {error && (
          <div 
            className="flex items-center gap-2 text-xs md:text-sm text-destructive"
            style={{
              animation: 'cardSlideUp 0.3s ease-out'
            }}
          >
            <Icon name="AlertCircle" size={14} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default RichTextEditor;