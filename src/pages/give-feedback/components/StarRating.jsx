import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ 
  rating, 
  onRatingChange, 
  disabled = false, 
  size = 32 
}) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (starValue) => {
    if (!disabled) {
      onRatingChange(starValue);
    }
  };

  const handleMouseEnter = (starValue) => {
    if (!disabled) {
      setHoveredStar(starValue);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredStar(0);
    }
  };

  return (
    <div className="star-rating-container">
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled = starValue <= (hoveredStar || rating);
        
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            className={`star-button ${isFilled ? 'filled' : ''} ${disabled ? 'disabled' : ''}`}
            aria-label={`Rate ${starValue} stars`}
          >
            <Star
              size={size}
              className={`star-icon ${isFilled ? 'filled' : ''}`}
              fill={isFilled ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          </button>
        );
      })}

      <style jsx>{`
        .star-rating-container {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .star-button {
          background: none;
          border: none;
          padding: 2px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          color: #e5e7eb;
          position: relative;
          border-radius: 4px;
        }

        .star-button:not(.disabled):hover {
          transform: scale(1.1);
        }

        .star-button:not(.disabled):active {
          transform: scale(0.95);
        }

        .star-button.disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .star-icon {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: block;
        }

        .star-icon.filled {
          color: #fbbf24;
        }

        .star-button:not(.disabled):hover .star-icon {
          filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3));
        }

        /* Remove the pop animation for cleaner look */
        .star-button.filled .star-icon {
          color: #fbbf24;
        }
      `}</style>
    </div>
  );
};

export default StarRating;