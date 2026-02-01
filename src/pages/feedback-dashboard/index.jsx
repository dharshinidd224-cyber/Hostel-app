import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';

import Button from '../../components/ui/Button';
import CategoryCard from './components/CategoryCard';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';

const FeedbackDashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/warden-dashboard' },
    { label: 'Feedback Dashboard', path: '/feedback-dashboard' }
  ];

  const categories = [
    {
      id: 'food',
      name: 'Food',
      icon: 'Utensils',
      iconColor: 'var(--color-warning)',
      bgColor: 'bg-warning/10',
      totalFeedback: 145,
      avgRating: 3.8,
      recentCount: 12
    },
    {
      id: 'cleanliness',
      name: 'Cleanliness',
      icon: 'Sparkles',
      iconColor: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10',
      totalFeedback: 98,
      avgRating: 4.2,
      recentCount: 8
    },
    {
      id: 'security',
      name: 'Security',
      icon: 'Shield',
      iconColor: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      totalFeedback: 67,
      avgRating: 4.5,
      recentCount: 5
    },
    {
      id: 'overall',
      name: 'Overall Experience',
      icon: 'Star',
      iconColor: 'var(--color-success)',
      bgColor: 'bg-success/10',
      totalFeedback: 203,
      avgRating: 4.1,
      recentCount: 15
    }
  ];

  const feedbackData = [
    {
      id: 1,
      category: 'food',
      studentName: 'Rahul Kumar',
      studentId: 'STU2024001',
      block: 'Block A',
      room: '301',
      rating: 4,
      comment: 'The food quality has improved significantly. Really appreciate the variety in the menu.',
      timestamp: '2 hours ago',
      status: 'reviewed'
    },
    {
      id: 2,
      category: 'cleanliness',
      studentName: 'Priya Sharma',
      studentId: 'STU2024002',
      block: 'Block B',
      room: '205',
      rating: 3,
      comment: 'Common areas need more frequent cleaning, especially during weekends.',
      timestamp: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      category: 'security',
      studentName: 'Amit Patel',
      studentId: 'STU2024003',
      block: 'Block C',
      room: '412',
      rating: 5,
      comment: 'Security staff is very vigilant and helpful. Feel safe in the hostel.',
      timestamp: '1 day ago',
      status: 'reviewed'
    },
    {
      id: 4,
      category: 'food',
      studentName: 'Sneha Reddy',
      studentId: 'STU2024004',
      block: 'Block A',
      room: '156',
      rating: 2,
      comment: 'Dinner timing is too early. Would be better if extended by 30 minutes.',
      timestamp: '1 day ago',
      status: 'pending'
    },
    {
      id: 5,
      category: 'overall',
      studentName: 'Vikram Singh',
      studentId: 'STU2024005',
      block: 'Block D',
      room: '308',
      rating: 4,
      comment: 'Overall experience is good. Management is responsive to student concerns.',
      timestamp: '2 days ago',
      status: 'reviewed'
    },
    {
      id: 6,
      category: 'cleanliness',
      studentName: 'Anjali Verma',
      studentId: 'STU2024006',
      block: 'Block B',
      room: '401',
      rating: 5,
      comment: 'Washrooms are always clean and well-maintained. Great job by the cleaning staff!',
      timestamp: '2 days ago',
      status: 'reviewed'
    },
    {
      id: 7,
      category: 'food',
      studentName: 'Rohan Gupta',
      studentId: 'STU2024007',
      block: 'Block C',
      room: '210',
      rating: 3,
      comment: 'Need more vegetarian options in the menu. Current variety is limited.',
      timestamp: '3 days ago',
      status: 'pending'
    },
    {
      id: 8,
      category: 'security',
      studentName: 'Kavya Nair',
      studentId: 'STU2024008',
      block: 'Block A',
      room: '502',
      rating: 4,
      comment: 'Entry/exit monitoring is good. Visitor management system works well.',
      timestamp: '3 days ago',
      status: 'reviewed'
    }
  ];

  const filteredFeedback = feedbackData?.filter(feedback => {
    const categoryMatch = selectedCategory === 'all' || feedback?.category === selectedCategory;
    const ratingMatch = selectedRating === 'all' || feedback?.rating === parseInt(selectedRating);
    return categoryMatch && ratingMatch;
  });

  const statsData = {
    totalFeedback: feedbackData?.length || 0,
    avgRating: 4.0,
    pendingReview: feedbackData?.filter(f => f?.status === 'pending')?.length || 0,
    reviewedCount: feedbackData?.filter(f => f?.status === 'reviewed')?.length || 0
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="warden" notificationCount={5} />
      <BreadcrumbNavigation items={breadcrumbItems} />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
              Feedback Dashboard
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              View and manage student feedback across all categories
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              className="text-sm md:text-base"
            >
              Export Report
            </Button>
            <Button
              variant="primary"
              iconName="Filter"
              iconPosition="left"
              className="text-sm md:text-base"
            >
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <FeedbackStats stats={statsData} />

        {/* Category Cards */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
            Feedback Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories?.map((category) => (
              <CategoryCard
                key={category?.id}
                category={category}
                isSelected={selectedCategory === category?.id}
                onClick={() => setSelectedCategory(category?.id)}
              />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e?.target?.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                <option value="food">Food</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="security">Security</option>
                <option value="overall">Overall Experience</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e?.target?.value)}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            {(selectedCategory !== 'all' || selectedRating !== 'all') && (
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedRating('all');
                  }}
                  className="text-sm md:text-base"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Feedback List */}
        <FeedbackList feedbackData={filteredFeedback} />
      </div>
    </div>
  );
};

export default FeedbackDashboard;