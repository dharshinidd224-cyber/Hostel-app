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
  <div className="min-h-screen bg-background">
    <RoleBasedNavigation userRole="student" />

    <div className="main-content with-notification">
      {/* CENTERED SPACING CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>Back</span>
        </button>

        <div className="content-container">

          {/* Header */}
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Icon name="MessageSquare" size={28} color="var(--color-accent)" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Give Feedback
                </h1>
                <p className="text-sm lg:text-base text-muted-foreground">
                  Share your experience to help us improve
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {feedbackCategories?.map(category => (
                <FeedbackCategoryCard
                  key={category.id}
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
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isSubmitting || !hasAnyRating}
              >
                Reset Form
              </Button>

              <button
                type="submit"
                disabled={!hasAnyRating || isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Submit Feedback
              </button>
            </div>

            {!hasAnyRating && (
              <div className="mt-4 flex items-center gap-2 text-sm text-warning bg-warning/10 rounded-lg p-3">
                <Icon name="AlertCircle" size={16} />
                <p>Please rate at least one category.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>

    {/* MODAL STAYS OUTSIDE MAIN CONTENT */}
    <SuccessModal
      isOpen={showSuccessModal}
      onClose={handleSuccessClose}
      onSubmitAnother={handleSubmitAnother}
    />
  </div>
);

};

export default GiveFeedback;