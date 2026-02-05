import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import NotificationDisplay from '../../components/ui/NotificationDisplay';
import Button from '../../components/ui/Button';
import api from "../../utils/api";

import Icon from '../../components/AppIcon';
import FeedbackCategoryCard from './components/FeedbackCategoryCard';
import SuccessModal from './components/SuccessModal';

const GiveFeedback = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [notification] = useState({
    type: 'notice',
    title: 'Feedback Guidelines',
    message: 'Your honest feedback helps us improve hostel facilities. All submissions are reviewed by administration.',
    timestamp: new Date()?.toISOString()
  });

  const handleDismissNotification = () => {
    // Handler for dismissing notification
  };

  const [feedbackCategories, setFeedbackCategories] = useState([
    {
      id: 'food',
      category: 'Food',
      icon: 'Utensils',
      rating: 0,
      comment: ''
    },
    {
      id: 'cleanliness',
      category: 'Cleanliness',
      icon: 'Sparkles',
      rating: 0,
      comment: ''
    },
    {
      id: 'security',
      category: 'Security',
      icon: 'Shield',
      rating: 0,
      comment: ''
    },
    {
      id: 'overall',
      category: 'Overall Experience',
      icon: 'Heart',
      rating: 0,
      comment: ''
    }
  ]);

  const handleRatingChange = (categoryId, newRating) => {
    setFeedbackCategories(prev =>
      prev?.map(cat =>
        cat?.id === categoryId ? { ...cat, rating: newRating } : cat
      )
    );
  };

  const handleCommentChange = (categoryId, newComment) => {
    setFeedbackCategories(prev =>
      prev?.map(cat =>
        cat?.id === categoryId ? { ...cat, comment: newComment } : cat
      )
    );
  };

  const hasAnyRating = feedbackCategories?.some(cat => cat?.rating > 0);

  const handleSubmit = async (e) => {
  e.preventDefault();

   console.log("🔥 HANDLE SUBMIT TRIGGERED");

  if (!hasAnyRating) {
    console.log("❌ No rating selected");
    return;
  }

  console.log("✅ Ratings exist, proceeding");

  setIsSubmitting(true);

  try {
    console.log("✅ Inside TRY block");

    const feedbackData = {
      anonymous: isAnonymous,
      categories: feedbackCategories
        .filter(cat => cat.rating > 0)
        .map(cat => ({
          category: cat.category,
          rating: cat.rating,
          comment: cat.comment || null
        }))
    };
await api.post("/feedback", {
      message: JSON.stringify(feedbackData)
    });
    console.log("📦 Feedback payload:", feedbackData);

    // TEMP: comment API call
    // await api.post("/feedback", { message: JSON.stringify(feedbackData) });

    console.log("🎉 FEEDBACK SUBMIT LOGIC FINISHED");

    setShowSuccessModal(true);
  } catch (error) {
    console.error("❌ ERROR IN SUBMIT:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleReset = () => {
    setFeedbackCategories(prev =>
      prev?.map(cat => ({ ...cat, rating: 0, comment: '' }))
    );
    setIsAnonymous(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/attendance-marking');
  };

  const handleSubmitAnother = () => {
    setShowSuccessModal(false);
    handleReset();
  };

  return (
    <div className="feedback-page-wrapper">
      <RoleBasedNavigation userRole="student" />

      <div className="main-content with-notification">
        <div className="content-container-enhanced">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="back-button-enhanced"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back</span>
          </button>

          {/* Header Section */}
          <div className="header-section-enhanced">
            <div className="header-content">
              <div className="icon-wrapper-large">
                <Icon name="MessageSquare" size={32} color="#ffffff" />
              </div>
              <div className="header-text">
                <h1 className="page-title-enhanced">Give Feedback</h1>
                <p className="page-subtitle-enhanced">
                  Share your experience to help us improve
                </p>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="feedback-form-enhanced">
            <div className="categories-grid-enhanced">
              {feedbackCategories?.map((category, index) => (
                <div 
                  key={category.id}
                  className="category-card-wrapper"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <FeedbackCategoryCard
                    category={category.category}
                    icon={category.icon}
                    rating={category.rating}
                    comment={category.comment}
                    onRatingChange={(rating) =>
                      handleRatingChange(category.id, rating)
                    }
                    onCommentChange={(comment) =>
                      handleCommentChange(category.id, comment)
                    }
                    disabled={isSubmitting}
                  />
                </div>
              ))}
            </div>

            {/* Warning Message */}
            {!hasAnyRating && (
              <div className="warning-message">
                <Icon name="AlertCircle" size={20} />
                <p>Please rate at least one category before submitting your feedback.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons-enhanced">
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting || !hasAnyRating}
                className="reset-button-enhanced"
              >
                <Icon name="RotateCcw" size={18} />
                Reset Form
              </button>

              <button
                type="submit"
                disabled={!hasAnyRating || isSubmitting}
                className="submit-button-enhanced"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={18} />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        onSubmitAnother={handleSubmitAnother}
      />

      <style jsx>{`
        .feedback-page-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        }

        .content-container-enhanced {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 16px;
        }

        .back-button-enhanced {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          color: #6b7280;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 24px;
        }

        .back-button-enhanced:hover {
          color: #111827;
          border-color: #d1d5db;
          background: #f9fafb;
          transform: translateX(-4px);
        }

        .header-section-enhanced {
          background: white;
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;
        }

        .header-section-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .icon-wrapper-large {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .header-text {
          flex: 1;
        }

        .page-title-enhanced {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
          letter-spacing: -0.02em;
        }

        .page-subtitle-enhanced {
          font-size: 1.0625rem;
          color: #6b7280;
          margin: 0;
        }

        .feedback-form-enhanced {
          animation: fadeInUp 0.6s ease-out;
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

        .categories-grid-enhanced {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .category-card-wrapper {
          animation: slideIn 0.5s ease-out backwards;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .guidelines-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .guidelines-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .guidelines-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guidelines-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .guidelines-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .guideline-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .guideline-item:hover {
          background: #f3f4f6;
        }

        .check-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #d1fae5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .guideline-item span {
          font-size: 0.9375rem;
          color: #374151;
          line-height: 1.6;
          padding-top: 2px;
        }

        .warning-message {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: #fef3c7;
          border: 1px solid #fde68a;
          border-radius: 12px;
          margin-bottom: 24px;
          color: #92400e;
        }

        .warning-message p {
          margin: 0;
          font-size: 0.9375rem;
          font-weight: 500;
        }

        .action-buttons-enhanced {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .reset-button-enhanced,
        .submit-button-enhanced {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
        }

        .reset-button-enhanced {
          background: white;
          color: #374151;
          border: 2px solid #e5e7eb;
        }

        .reset-button-enhanced:hover:not(:disabled) {
          background: #f9fafb;
          border-color: #d1d5db;
          transform: translateY(-1px);
        }

        .reset-button-enhanced:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-button-enhanced {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .submit-button-enhanced:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .submit-button-enhanced:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button-enhanced:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .categories-grid-enhanced {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .content-container-enhanced {
            padding: 16px 12px;
          }

          .header-section-enhanced {
            padding: 24px 20px;
          }

          .icon-wrapper-large {
            width: 60px;
            height: 60px;
          }

          .page-title-enhanced {
            font-size: 1.5rem;
          }

          .page-subtitle-enhanced {
            font-size: 0.9375rem;
          }

          .action-buttons-enhanced {
            flex-direction: column-reverse;
          }

          .reset-button-enhanced,
          .submit-button-enhanced {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default GiveFeedback;