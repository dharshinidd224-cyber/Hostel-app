import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceWidget = ({ totalStudents, present, absent, attendanceRate }) => {
  return (
    <div 
      className="rounded-xl p-[2px] shadow-elevation-md transition-all duration-300 hover:shadow-xl"
      style={{
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
      }}
    >
      <div className="bg-white rounded-xl p-5 md:p-6 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            Today's Attendance
          </h3>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Icon name="Users" size={20} color="#3b82f6" />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4 mb-6">
          {/* Total Students */}
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-600">Total Students</span>
            <span className="text-2xl font-bold text-gray-900">{totalStudents}</span>
          </div>

          {/* Present */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-base text-gray-600">Present</span>
            </div>
            <span className="text-2xl font-bold text-green-600">{present}</span>
          </div>

          {/* Absent */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-base text-gray-600">Absent</span>
            </div>
            <span className="text-2xl font-bold text-red-600">{absent}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-5"></div>

        {/* Attendance Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-700 font-medium">Attendance Rate</span>
            <span className="text-2xl font-bold text-blue-600">{attendanceRate}%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${attendanceRate}%`,
                background: 'linear-gradient(90deg, #3b82f6, #2563eb)'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceWidget;