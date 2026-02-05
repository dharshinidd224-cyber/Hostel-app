import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const PageHeader = ({ title, subtitle, showExportButton = false, onExport }) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="mb-6 px-4 md:px-6">
      {/* Back Button with Gradient Effect */}
      <button
        onClick={handleBackToDashboard}
        className="inline-flex items-center gap-2 mb-4 group transition-all duration-300 hover:gap-3"
      >
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
          }}
        >
          <Icon name="ArrowLeft" size={18} color="#ffffff" />
        </div>
        <span className="text-sm font-semibold text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
          Back to Dashboard
        </span>
      </button>

      {/* Page Title and Export Button */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        {showExportButton && (
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #1e40af, #3b82f6)'
            }}
          >
            <Icon name="Download" size={18} color="#ffffff" />
            Export Report
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;