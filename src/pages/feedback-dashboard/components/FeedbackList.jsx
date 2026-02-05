import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeedbackList = ({ feedbackData }) => {
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
    return category; // Already formatted from backend
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            color={star <= rating ? 'var(--color-warning)' : 'var(--color-muted)'}
            className={star <= rating ? 'fill-current' : ''}
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
    <div className="bg-card rounded-xl shadow-elevation-md border border-border">
      <div className="p-4 md:p-6 border-b border-border">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">
          Student Feedback ({feedbackData?.length || 0})
        </h2>
      </div>

      <div className="divide-y divide-border">
        {feedbackData?.length > 0 ? (
          feedbackData?.map((feedback) => (
            <div key={feedback?.id} className="p-4 md:p-6 hover:bg-muted/5 transition-smooth">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                        {feedback?.anonymous 
                          ? 'Anonymous Student' 
                          : feedback?.student?.name || 'Unknown Student'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                        {!feedback?.anonymous && (
                          <>
                            <span>{feedback?.user_id}</span>
                            <span>•</span>
                            <span>Block {feedback?.student?.block_number || 'N/A'}</span>
                            <span>•</span>
                            <span>Room {feedback?.student?.room_number || 'N/A'}</span>
                          </>
                        )}
                        {feedback?.anonymous && (
                          <span>Anonymous Feedback</span>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(feedback?.category)}`}>
                      {getCategoryLabel(feedback?.category)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-3">
                    {renderStars(feedback?.rating)}
                    <span className="text-sm font-medium text-foreground">{feedback?.rating}.0</span>
                  </div>

                  {/* Comment */}
                  {feedback?.comment && (
                    <p className="text-sm md:text-base text-foreground mb-3">
                      {feedback?.comment}
                    </p>
                  )}

                  {/* Timestamp and Status */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{formatDate(feedback?.created_at)}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      feedback?.status === 'reviewed' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {feedback?.status === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  {feedback?.status === 'pending' && (
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="Check"
                      iconPosition="left"
                      className="text-xs md:text-sm"
                    >
                      Mark Reviewed
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                    className="text-xs md:text-sm"
                  >
                    Respond
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 md:p-12 text-center">
            <Icon name="Inbox" size={48} color="var(--color-muted)" className="mx-auto mb-4" />
            <p className="text-base md:text-lg text-muted-foreground">
              No feedback found for the selected filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;