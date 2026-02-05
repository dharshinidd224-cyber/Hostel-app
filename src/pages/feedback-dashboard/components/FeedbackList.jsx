import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeedbackList = ({ feedbackData }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'bg-warning/10 text-warning',
      'Cleanliness': 'bg-secondary/10 text-secondary',
      'Security': 'bg-primary/10 text-primary',
      'Overall Experience': 'bg-success/10 text-success'
    };
    return colors?.[category] || 'bg-muted/10 text-muted-foreground';
  };

  const getCategoryLabel = (category) => {
    return category;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1 feedback-stars">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            color={star <= rating ? 'var(--color-warning)' : 'var(--color-muted)'}
            className={`star-icon ${star <= rating ? 'fill-current star-filled' : 'star-empty'}`}
            style={{ 
              animationDelay: `${star * 0.1}s`,
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <style>{`
        /* ============================================
           FEEDBACK CONTAINER - MAIN WRAPPER
           ============================================ */

        .feedback-container-wrapper {
          animation: fadeInUp 0.6s ease-out;
        }

        .feedback-card-main {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feedback-list-container {
          background: transparent;
        }

        /* ============================================
           HEADER ANIMATIONS
           ============================================ */

        .feedback-header-animated {
          position: relative;
        }

        .feedback-title-animated {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: slideInLeft 0.5s ease-out;
        }

        .feedback-count-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: white;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          animation: scaleIn 0.5s ease-out 0.3s both;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }

        /* ============================================
           FEEDBACK ITEM CONTAINER
           ============================================ */

        .feedback-item {
          position: relative;
          animation: fadeInUp 0.5s ease-out both;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          overflow: hidden;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .feedback-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 0;
        }

        .feedback-item > * {
          position: relative;
          z-index: 1;
        }

        /* Gradient overlay that appears on hover */
        .feedback-gradient-overlay {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(99, 102, 241, 0.08) 50%, 
            transparent 100%
          );
          transition: left 0.6s ease;
          pointer-events: none;
          z-index: 0;
        }

        /* Hover indicator line */
        .feedback-hover-line {
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 0;
          background: linear-gradient(180deg, #6366f1 0%, #a855f7 100%);
          transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
          z-index: 2;
        }

        /* Hover state */
        .feedback-item-hovered {
          background-color: rgba(99, 102, 241, 0.02);
          transform: translateX(4px) translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .feedback-item-hovered::before {
          opacity: 1;
        }

        .feedback-item-hovered .feedback-gradient-overlay {
          left: 100%;
        }

        .feedback-item-hovered .feedback-hover-line {
          height: 100%;
        }

        .feedback-item-hovered .feedback-avatar {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
        }

        .feedback-item-hovered .category-badge {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .feedback-item-hovered .star-filled {
          transform: scale(1.2) rotate(15deg);
        }

        /* ============================================
           STUDENT INFO SECTION
           ============================================ */

        .feedback-student-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .feedback-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
          animation: scaleIn 0.4s ease-out;
          flex-shrink: 0;
        }

        .feedback-name {
          animation: fadeIn 0.5s ease-out 0.1s both;
          transition: color 0.3s ease;
        }

        .feedback-item-hovered .feedback-name {
          color: #6366f1;
        }

        .feedback-meta {
          animation: fadeIn 0.5s ease-out 0.2s both;
        }

        .feedback-meta-item {
          transition: all 0.2s ease;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .feedback-item-hovered .feedback-meta-item {
          background-color: rgba(99, 102, 241, 0.08);
          color: #6366f1;
        }

        .feedback-meta-separator {
          color: rgba(107, 114, 128, 0.5);
        }

        /* ============================================
           CATEGORY BADGE
           ============================================ */

        .category-badge {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slideInRight 0.5s ease-out;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
        }

        .category-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .feedback-item-hovered .category-badge::before {
          left: 100%;
        }

        /* ============================================
           RATING SECTION
           ============================================ */

        .rating-section {
          animation: fadeInUp 0.5s ease-out 0.3s both;
        }

        .feedback-stars {
          gap: 4px;
        }

        .star-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .star-filled {
          filter: drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3));
          animation: starPop 0.4s ease-out both;
        }

        .star-empty {
          opacity: 0.3;
        }

        .feedback-item-hovered .star-empty {
          opacity: 0.5;
          transform: scale(1.05);
        }

        .rating-value {
          font-weight: 700;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeIn 0.5s ease-out 0.4s both;
        }

        /* ============================================
           COMMENT BOX
           ============================================ */

        .feedback-comment-box {
          position: relative;
          padding: 1rem;
          margin: 0.75rem 0;
          background: rgba(243, 244, 246, 0.5);
          border-left: 3px solid transparent;
          border-radius: 8px;
          transition: all 0.3s ease;
          animation: fadeInUp 0.5s ease-out 0.4s both;
        }

        .feedback-item-hovered .feedback-comment-box {
          background: rgba(99, 102, 241, 0.05);
          border-left-color: #6366f1;
          transform: translateX(4px);
        }

        .feedback-comment-box p {
          line-height: 1.6;
          color: #374151;
        }

        /* ============================================
           FOOTER INFO
           ============================================ */

        .feedback-footer-info {
          animation: fadeIn 0.5s ease-out 0.5s both;
        }

        .timestamp-badge {
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(243, 244, 246, 0.8);
          transition: all 0.3s ease;
        }

        .feedback-item-hovered .timestamp-badge {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
          transform: translateY(-1px);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .status-reviewed {
          animation: successPulse 0.6s ease-out;
        }

        .status-pending {
          animation: pendingPulse 2s ease-in-out infinite;
        }

        .feedback-item-hovered .status-badge {
          transform: scale(1.05) translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* ============================================
           ACTION BUTTONS
           ============================================ */

        .feedback-actions {
          animation: fadeInRight 0.5s ease-out 0.3s both;
        }

        .btn-mark-reviewed,
        .btn-respond {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-mark-reviewed::before,
        .btn-respond::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }

        .btn-mark-reviewed:hover::before,
        .btn-respond:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-mark-reviewed:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
        }

        .btn-respond:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        /* ============================================
           EMPTY STATE
           ============================================ */

        .empty-state {
          animation: fadeIn 0.8s ease-out;
        }

        .empty-state-icon {
          animation: float 3s ease-in-out infinite;
        }

        /* ============================================
           KEYFRAME ANIMATIONS
           ============================================ */

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes starPop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes successPulse {
          0%, 100% {
            box-shadow: 0 2px 6px rgba(16, 185, 129, 0.2);
          }
          50% {
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
        }

        @keyframes pendingPulse {
          0%, 100% {
            box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2);
            opacity: 1;
          }
          50% {
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* ============================================
           RESPONSIVE DESIGN
           ============================================ */

        @media (max-width: 768px) {
          .feedback-avatar {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .feedback-count-badge {
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
          }

          .category-badge {
            font-size: 0.65rem;
            padding: 0.25rem 0.625rem;
          }

          .feedback-comment-box {
            padding: 0.75rem;
          }

          .feedback-item-hovered {
            transform: translateX(2px);
          }
        }

        /* ============================================
           ACCESSIBILITY & REDUCED MOTION
           ============================================ */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .feedback-gradient-overlay,
          .feedback-hover-line,
          .empty-state-icon {
            animation: none !important;
          }
        }

        /* ============================================
           PRINT STYLES
           ============================================ */

        @media print {
          .feedback-actions,
          .feedback-gradient-overlay,
          .feedback-hover-line {
            display: none !important;
          }

          .feedback-item {
            page-break-inside: avoid;
          }
        }

        /* ============================================
           DARK MODE SUPPORT (if needed)
           ============================================ */

        @media (prefers-color-scheme: dark) {
          .feedback-comment-box {
            background: rgba(31, 41, 55, 0.5);
          }

          .feedback-item-hovered .feedback-comment-box {
            background: rgba(99, 102, 241, 0.1);
          }

          .timestamp-badge {
            background: rgba(31, 41, 55, 0.8);
          }

          .feedback-item-hovered .timestamp-badge {
            background: rgba(99, 102, 241, 0.2);
          }
        }
      `}</style>

      <div className="feedback-container-wrapper">
        <div className="bg-card rounded-xl shadow-elevation-md border border-border feedback-card-main">
          {/* Header with animation */}
          <div className="p-4 md:p-6 border-b border-border feedback-header-animated">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground feedback-title-animated">
              Student Feedback 
              <span className="feedback-count-badge">({feedbackData?.length || 0})</span>
            </h2>
          </div>

          <div className="feedback-list-container p-4 md:p-6">
            {feedbackData?.length > 0 ? (
              feedbackData?.map((feedback, index) => (
                <div 
                  key={feedback?.id} 
                  className={`feedback-item p-4 md:p-6 mb-4 transition-smooth ${
                    hoveredId === feedback?.id ? 'feedback-item-hovered' : ''
                  }`}
                  onMouseEnter={() => setHoveredId(feedback?.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Animated gradient overlay */}
                  <div className="feedback-gradient-overlay"></div>
                  
                  {/* Hover indicator line */}
                  <div className="feedback-hover-line"></div>

                  <div className="flex flex-col lg:flex-row lg:items-start gap-4 relative">
                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="feedback-student-info">
                          {/* Avatar with animation */}
                          <div className="feedback-avatar">
                            {feedback?.anonymous ? '?' : (feedback?.student?.name || 'U').charAt(0)}
                          </div>
                          
                          <div className="ml-3">
                            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 feedback-name">
                              {feedback?.anonymous 
                                ? 'Anonymous Student' 
                                : feedback?.student?.name || 'Unknown Student'}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground feedback-meta">
                              {!feedback?.anonymous && (
                                <>
                                  <span className="feedback-meta-item">{feedback?.user_id}</span>
                                  <span className="feedback-meta-separator">•</span>
                                  <span className="feedback-meta-item">Block {feedback?.student?.block_number || 'N/A'}</span>
                                  <span className="feedback-meta-separator">•</span>
                                  <span className="feedback-meta-item">Room {feedback?.student?.room_number || 'N/A'}</span>
                                </>
                              )}
                              {feedback?.anonymous && (
                                <span className="feedback-meta-item">Anonymous Feedback</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <span className={`px-3 py-1.5 text-xs font-medium rounded-full category-badge ${getCategoryColor(feedback?.category)}`}>
                          {getCategoryLabel(feedback?.category)}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-3 mb-3 rating-section">
                        {renderStars(feedback?.rating)}
                        <span className="text-sm font-medium text-foreground rating-value">
                          {feedback?.rating}.0
                        </span>
                      </div>

                      {/* Comment */}
                      {feedback?.comment && (
                        <div className="feedback-comment-box">
                          <p className="text-sm md:text-base text-foreground">
                            {feedback?.comment}
                          </p>
                        </div>
                      )}

                      {/* Timestamp and Status */}
                      <div className="flex items-center gap-4 mt-3 feedback-footer-info">
                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground timestamp-badge">
                          <Icon name="Clock" size={14} />
                          <span>{formatDate(feedback?.created_at)}</span>
                        </div>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full status-badge ${
                          feedback?.status === 'reviewed' 
                            ? 'bg-success/10 text-success status-reviewed' 
                            : 'bg-warning/10 text-warning status-pending'
                        }`}>
                          {feedback?.status === 'reviewed' ? '✓ Reviewed' : '⏱ Pending Review'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 feedback-actions">
                      {feedback?.status === 'pending' && (
                        <Button
                          variant="primary"
                          size="sm"
                          iconName="Check"
                          iconPosition="left"
                          className="text-xs md:text-sm btn-mark-reviewed"
                        >
                          Mark Reviewed
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="MessageSquare"
                        iconPosition="left"
                        className="text-xs md:text-sm btn-respond"
                      >
                        Respond
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 md:p-12 text-center empty-state">
                <div className="empty-state-icon">
                  <Icon name="Inbox" size={48} color="var(--color-muted)" className="mx-auto mb-4" />
                </div>
                <p className="text-base md:text-lg text-muted-foreground">
                  No feedback found for the selected filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackList;