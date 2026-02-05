import React from 'react';
import Icon from '../../../components/AppIcon';
import StarRating from './StarRating';

const FeedbackCategoryCard = ({
  category,
  icon,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  disabled = false
}) => {
  const maxCharacters = 500;
  const remainingCharacters = maxCharacters - (comment?.length || 0);

  return (
    <div className="feedback-category-card">
      <div className="card-header-section">
        <div className="icon-container">
          <Icon name={icon} size={24} color="#ffffff" />
        </div>
        <div className="title-section">
          <h3 className="category-title">{category}</h3>
          <p className="category-subtitle">Rate your experience</p>
        </div>
      </div>

      <div className="rating-section">
        <label className="section-label">
          Rating 
          {rating > 0 && (
            <span className="rating-badge">
              {rating}/5
            </span>
          )}
        </label>
        <div className="rating-stars-wrapper">
          <StarRating
            rating={rating}
            onRatingChange={onRatingChange}
            disabled={disabled}
            size={32}
          />
        </div>
      </div>

      <div className="comment-section">
        <label className="section-label">
          Comments <span className="optional-text">(Optional)</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e?.target?.value)}
          disabled={disabled}
          placeholder={`Share your thoughts about ${category?.toLowerCase()}...`}
          maxLength={maxCharacters}
          rows={4}
          className="comment-textarea"
        />
        <div className="character-count-row">
          <p className="char-limit-text">
            Maximum {maxCharacters} characters
          </p>
          <p className={`char-remaining-text ${remainingCharacters < 50 ? 'warning' : ''}`}>
            {remainingCharacters} remaining
          </p>
        </div>
      </div>

      <style jsx>{`
        .feedback-category-card {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 30%, #e0f2fe 60%, #dbeafe 100%);
          border-radius: 20px;
          padding: 28px;
          border: 2px solid transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
          position: relative;
          overflow: visible;
        }

        .feedback-category-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .feedback-category-card:hover {
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.2);
          transform: translateY(-4px);
        }

        .feedback-category-card:hover::before {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b);
        }

        .card-header-section {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .icon-container {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
          position: relative;
          z-index: 1;
        }

        .feedback-category-card:hover .icon-container {
          transform: scale(1.08) rotate(5deg);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .title-section {
          flex: 1;
        }

        .category-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
        }

        .category-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }
.rating-section {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;

  /* 🌈 Gradient background */
  background: linear-gradient(
    135deg,
    #ecfeff 0%,
    #e0f2fe 35%,
    #dbeafe 70%,
    #ede9fe 100%
  );

  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.15);
}






        .rating-stars-wrapper {
          position: relative;
          z-index: 1;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }

        .rating-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: none;
          letter-spacing: 0;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        }

        .optional-text {
          color: #9ca3af;
          font-weight: 400;
          text-transform: none;
          letter-spacing: 0;
        }

        .comment-section {
          margin-top: 20px;
        }

        .comment-textarea {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(229, 231, 235, 0.6);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          color: #111827;
          font-size: 0.9375rem;
          font-family: inherit;
          line-height: 1.6;
          resize: vertical;
          transition: all 0.2s ease;
          min-height: 100px;
        }

        .comment-textarea::placeholder {
          color: #9ca3af;
        }

        .comment-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .comment-textarea:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: rgba(249, 250, 251, 0.5);
        }

        .character-count-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          gap: 12px;
        }

        .char-limit-text,
        .char-remaining-text {
          font-size: 0.75rem;
          margin: 0;
        }

        .char-limit-text {
          color: #9ca3af;
        }

        .char-remaining-text {
          color: #6b7280;
          font-weight: 500;
        }

        .char-remaining-text.warning {
          color: #f59e0b;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .feedback-category-card {
            padding: 20px;
          }

          .icon-container {
            width: 48px;
            height: 48px;
          }

          .category-title {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackCategoryCard;