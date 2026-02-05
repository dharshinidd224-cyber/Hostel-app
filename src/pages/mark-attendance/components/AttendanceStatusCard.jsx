import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStatusCard = ({ isMarked, currentDate, currentTime, markedTime }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md transition-all duration-300 ${
              isMarked 
                ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/30' 
                : 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-orange-500/30'
            }`}>
              <Icon 
                name={isMarked ? "CheckCircle2" : "Clock"} 
                size={28} 
                color="white"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {isMarked ? "Attendance Marked" : "Mark Your Attendance"}
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Icon name="Calendar" size={16} color="#6b7280" />
                <p className="text-sm md:text-base font-medium">{currentDate}</p>
              </div>
            </div>
          </div>

          {/* Time Information */}
          <div className="space-y-3 pl-[72px] md:pl-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                <Icon name="Clock" size={18} color="#6b7280" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Current Time</p>
                <p className="text-base md:text-lg font-bold text-gray-900">{currentTime}</p>
              </div>
            </div>

            {isMarked && markedTime && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Icon name="CheckCircle2" size={18} color="#16a34a" />
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Marked At</p>
                  <p className="text-base md:text-lg font-bold text-green-700">{markedTime}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Status Badge */}
        <div className={`px-8 py-6 rounded-2xl text-center shadow-md transition-all duration-300 ${
          isMarked 
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200' 
            : 'bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-orange-200'
        }`}>
          <div className="text-5xl md:text-6xl font-bold mb-2" style={{ 
            color: isMarked ? '#16a34a' : '#f97316' 
          }}>
            {isMarked ? "✓" : "!"}
          </div>
          <div className="text-sm md:text-base font-bold uppercase tracking-wide" style={{ 
            color: isMarked ? '#16a34a' : '#f97316' 
          }}>
            {isMarked ? "Present" : "Not Marked"}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {isMarked && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Info" size={16} color="#16a34a" />
            </div>
            <p className="text-sm md:text-base text-green-800 leading-relaxed">
              Your attendance has been successfully recorded for today. You can view your attendance history below.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceStatusCard;