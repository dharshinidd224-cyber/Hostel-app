import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

// Safe avatar gradient generator with undefined checks
const getAvatarGradient = (name) => {
  // Return default gradient if name is undefined, null, or empty
  if (!name || typeof name !== 'string' || name.length === 0) {
    return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'; // Default gray gradient
  }

  const colors = [
    ['#3b82f6', '#2563eb'], // Blue
    ['#8b5cf6', '#7c3aed'], // Purple
    ['#06b6d4', '#0891b2'], // Cyan
    ['#10b981', '#059669'], // Green
    ['#f59e0b', '#d97706'], // Amber
    ['#ef4444', '#dc2626'], // Red
    ['#ec4899', '#db2777'], // Pink
    ['#6366f1', '#4f46e5'], // Indigo
  ];

  const charCode = name.charCodeAt(0);
  const index = charCode % colors.length;
  const [color1, color2] = colors[index];
  
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};

// Get initials safely
const getInitials = (name) => {
  if (!name || typeof name !== 'string' || name.length === 0) {
    return '?'; // Default for undefined names
  }

  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const GrievanceTableRow = ({ grievance, onStatusUpdate, isSelected, onSelect, onView }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      'urgent': '#dc2626',
      'high': '#f97316',
      'medium': '#f59e0b',
      'low': '#10b981'
    };
    return colors[priority?.toLowerCase()] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      'submitted': '#f59e0b',
      'pending': '#f59e0b',
      'in-progress': '#3b82f6',
      'resolved': '#10b981',
      'rejected': '#dc2626'
    };
    return colors[status?.toLowerCase()] || '#6b7280';
  };

  // Safe data extraction with correct API structure mapping
  const studentName = grievance?.student?.name || 'Unknown Student';
  const grievanceId = grievance?.grievance_id || grievance?.id || 'N/A';
  const userId = grievance?.user_id || 'N/A';
  const block = grievance?.student?.block_number || 'N/A';
  const room = grievance?.student?.room_number || 'N/A';
  const category = grievance?.category || 'Uncategorized';
  const description = grievance?.description || 'No description provided';
  const status = grievance?.status || 'pending';
  const priority = grievance?.priority || 'medium';
  const createdAt = grievance?.created_at || new Date().toISOString();
  const images = grievance?.images || [];
  const resolutionRemarks = grievance?.resolution_remarks;

  // Format date safely
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const priorityColor = getPriorityColor(priority);
  const statusColor = getStatusColor(status);

  const handleViewToggle = () => {
    setIsExpanded(!isExpanded);
    if (onView) {
      onView(grievance);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 relative z-0">
        {/* Checkbox */}
        <td className="px-4 py-4 w-12">
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={(e) => onSelect && onSelect(grievance.id, e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </td>

        {/* ID */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0"
              style={{ background: getAvatarGradient(studentName) }}
            >
              {getInitials(studentName)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {grievanceId}
              </p>
            </div>
          </div>
        </td>

        {/* User */}
        <td className="px-4 py-4">
          <div>
            <p className="font-medium text-gray-900 text-sm">
              {studentName}
            </p>
            <p className="text-xs text-gray-500">
              Block {block} • Room {room}
            </p>
          </div>
        </td>

        {/* Category */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Icon name="Tag" size={14} color="#6b7280" />
            <span className="text-sm text-gray-700 font-medium capitalize">
              {category}
            </span>
          </div>
        </td>

        {/* Date */}
        <td className="px-4 py-4">
          <p className="text-sm text-gray-700">
            {formatDate(createdAt)}
          </p>
        </td>

        {/* Status */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Icon 
              name={status === 'resolved' ? 'CheckCircle' : 'Clock'} 
              size={16} 
              color={statusColor}
            />
            <span className="text-sm font-medium capitalize" style={{ color: statusColor }}>
              {status}
            </span>
          </div>
        </td>

        {/* Priority */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Icon 
              name={priority === 'high' || priority === 'urgent' ? 'AlertCircle' : 'Circle'} 
              size={16} 
              color={priorityColor}
            />
            <span className="text-sm font-medium capitalize" style={{ color: priorityColor }}>
              {priority}
            </span>
          </div>
        </td>

        {/* Actions */}
        <td className="px-4 py-4">
          <div className="flex items-center gap-2 relative z-0">
            <button
              onClick={handleViewToggle}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Icon 
                name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                size={14} 
                color="currentColor" 
              />
              <span>View</span>
            </button>
            <button
              onClick={() => onStatusUpdate && onStatusUpdate(grievance)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 relative z-0"
            >
              <Icon name="Edit" size={14} color="white" />
              <span>Update</span>
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded Details Row */}
      {isExpanded && (
        <tr className="bg-gray-50 border-b border-gray-200">
          <td colSpan="8" className="px-4 py-6">
            <div className="max-w-5xl">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Grievance Details
                  </h3>
                  <p className="text-sm text-gray-500">
                    Submitted on {formatDateTime(createdAt)}
                  </p>
                </div>
                <button
                  onClick={handleViewToggle}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={20} color="currentColor" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Student Info */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Student Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon name="User" size={16} color="#6b7280" />
                        <span className="text-sm text-gray-600">Name:</span>
                        <span className="text-sm font-medium text-gray-900">{studentName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Hash" size={16} color="#6b7280" />
                        <span className="text-sm text-gray-600">Student ID:</span>
                        <span className="text-sm font-medium text-gray-900">{userId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Home" size={16} color="#6b7280" />
                        <span className="text-sm text-gray-600">Location:</span>
                        <span className="text-sm font-medium text-gray-900">Block {block}, Room {room}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Description</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{description}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Status & Priority */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Status & Priority</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Status</span>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" 
                             style={{ backgroundColor: `${statusColor}15`, border: `1px solid ${statusColor}30` }}>
                          <Icon name={status === 'resolved' ? 'CheckCircle' : 'Clock'} size={16} color={statusColor} />
                          <span className="text-sm font-medium capitalize" style={{ color: statusColor }}>
                            {status}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Priority</span>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg" 
                             style={{ backgroundColor: `${priorityColor}15`, border: `1px solid ${priorityColor}30` }}>
                          <Icon name={priority === 'high' || priority === 'urgent' ? 'AlertCircle' : 'Circle'} 
                                size={16} 
                                color={priorityColor} />
                          <span className="text-sm font-medium capitalize" style={{ color: priorityColor }}>
                            {priority}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 block mb-1">Category</span>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-300">
                          <Icon name="Tag" size={16} color="#6b7280" />
                          <span className="text-sm font-medium capitalize text-gray-700">
                            {category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resolution Remarks */}
                  {resolutionRemarks && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <Icon name="CheckCircle" size={16} color="#059669" />
                        Resolution Remarks
                      </h4>
                      <p className="text-sm text-green-700 whitespace-pre-wrap">{resolutionRemarks}</p>
                    </div>
                  )}

                  {/* Images */}
                  {images && images.length > 0 && (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Attached Images</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default GrievanceTableRow;