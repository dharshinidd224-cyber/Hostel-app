import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DescriptionInput = ({ value, onChange, error }) => {
  const maxLength = 500;
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const newValue = e?.target?.value;
    if (newValue?.length <= maxLength) {
      onChange(newValue);
    }
  };

  const remainingChars = maxLength - value?.length;
  const isNearLimit = remainingChars <= 50;
  const progressPercentage = ((maxLength - remainingChars) / maxLength) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <Icon name="FileText" size={16} color="white" />
          </div>
          Detailed Description <span className="text-red-500">*</span>
        </label>
        
        {/* Character count badge */}
        <div className={`
          px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300
          ${value?.length === 0 ? 'bg-gray-100 text-gray-500' : 
            isNearLimit ? 'bg-orange-100 text-orange-700' : 
            'bg-blue-100 text-blue-700'}
        `}>
          {value?.length} / {maxLength}
        </div>
      </div>
      
      <p className="text-xs text-gray-600 mb-4 flex items-center gap-2">
        <Icon name="Info" size={14} color="#6b7280" />
        Provide a clear and detailed description of your grievance
      </p>
      
      {/* Textarea with gradient border effect */}
      <div className="relative group">
        {/* Gradient border effect on focus */}
        {isFocused && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-30 blur transition duration-300" />
        )}
        
        <div className={`
          relative rounded-xl overflow-hidden
          ${error ? 'ring-2 ring-red-400' : 
            isFocused ? 'ring-2 ring-blue-400 shadow-lg' : 
            'ring-1 ring-gray-300'}
        `}>
          <textarea
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Example: The water tap in my room (Block A, Room 205) has been leaking continuously for the past two days. Water is dripping even when the tap is fully closed, causing wastage and dampness in the bathroom floor."
            className="w-full px-4 py-4 bg-white text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none text-sm leading-relaxed min-h-[160px] border-0"
            required
          />
          
          {/* Bottom info section - NO border-t */}
          <div className="bg-gray-50 px-4 py-3">
            {/* Visual progress bar */}
            <div className="h-1 bg-gray-200 rounded-full mb-3 -mx-4">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  progressPercentage < 25 ? 'bg-gradient-to-r from-red-400 to-orange-400' :
                  progressPercentage < 50 ? 'bg-gradient-to-r from-orange-400 to-yellow-400' :
                  progressPercentage < 75 ? 'bg-gradient-to-r from-yellow-400 to-green-400' :
                  'bg-gradient-to-r from-green-400 to-emerald-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Location tip */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <div className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center">
                    <Icon name="MapPin" size={12} color="#3b82f6" />
                  </div>
                  <span className="font-medium">Location</span>
                </div>
                
                {/* Time tip */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <div className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center">
                    <Icon name="Clock" size={12} color="#9333ea" />
                  </div>
                  <span className="font-medium">Timing</span>
                </div>
                
                {/* Details tip */}
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <div className="w-5 h-5 rounded-md bg-pink-100 flex items-center justify-center">
                    <Icon name="AlertCircle" size={12} color="#ec4899" />
                  </div>
                  <span className="font-medium">Details</span>
                </div>
              </div>
              
              {/* Remaining characters with animation */}
              <div className={`
                text-xs font-bold transition-all duration-300
                ${remainingChars < 50 ? 'text-orange-600 animate-pulse' : 
                  remainingChars < 100 ? 'text-yellow-600' : 
                  'text-gray-500'}
              `}>
                {remainingChars} left
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error message with animation */}
      {error && (
        <div className="flex items-center gap-2 mt-3 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
            <Icon name="AlertCircle" size={12} color="white" />
          </div>
          <span className="text-xs font-medium text-red-700">{error}</span>
        </div>
      )}

      {/* Helpful tips section - Only show when empty and not focused */}
      {!error && value?.length === 0 && !isFocused && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={16} color="white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-blue-900">Location</h4>
                <p className="text-xs text-blue-700">Block & Room #</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={16} color="white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-purple-900">When</h4>
                <p className="text-xs text-purple-700">Date & Time</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 border border-pink-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size={16} color="white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-pink-900">Details</h4>
                <p className="text-xs text-pink-700">Describe Issue</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionInput;