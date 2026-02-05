import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryCard = ({ category }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2"
      style={{
        background: category.gradient,
        boxShadow: category.shadow,
        borderColor: category.borderColor
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = category.hoverShadow;
        e.currentTarget.style.borderColor = category.iconColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = category.shadow;
        e.currentTarget.style.borderColor = category.borderColor;
      }}
    >
      {/* Animated background glow */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
        style={{ background: category.iconColor }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{
            background: category.iconBg,
            boxShadow: `0 4px 12px ${category.iconColor}30`
          }}
        >
          <Icon name={category.icon} size={24} color="#ffffff" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-0.5">
            {category.name}
          </h3>
          <p className="text-sm text-gray-600">
            {category.totalFeedback} feedback
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {/* Avg Rating */}
        <div>
          <p className="text-xs text-gray-600 font-medium mb-1">Avg Rating</p>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={16} color={category.iconColor} className="fill-current" />
            <span 
              className="text-xl font-bold"
              style={{ color: category.iconColor }}
            >
              {category.avgRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Recent */}
        <div className="text-right">
          <p className="text-xs text-gray-600 font-medium mb-1">Recent</p>
          <div className="inline-flex items-center gap-1.5">
            <span 
              className="text-xl font-bold"
              style={{ color: category.iconColor }}
            >
              {category.recentCount}
            </span>
            <span className="text-sm font-medium text-gray-600">new</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: category.iconColor }}
      />
    </div>
  );
};

const FeedbackCategories = ({ categories, onCategoryClick }) => {
  const categoryData = [
    {
      id: 1,
      name: 'Food',
      icon: 'Utensils',
      totalFeedback: categories?.food?.total || 0,
      avgRating: categories?.food?.avgRating || 0,
      recentCount: categories?.food?.recent || 0,
      iconColor: '#f97316',
      gradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
      iconBg: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      shadow: '0 2px 8px rgba(249, 115, 22, 0.08)',
      hoverShadow: '0 8px 24px rgba(249, 115, 22, 0.15)',
      borderColor: '#fed7aa50'
    },
    {
      id: 2,
      name: 'Cleanliness',
      icon: 'Sparkles',
      totalFeedback: categories?.cleanliness?.total || 0,
      avgRating: categories?.cleanliness?.avgRating || 0,
      recentCount: categories?.cleanliness?.recent || 0,
      iconColor: '#06b6d4',
      gradient: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
      iconBg: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      shadow: '0 2px 8px rgba(6, 182, 212, 0.08)',
      hoverShadow: '0 8px 24px rgba(6, 182, 212, 0.15)',
      borderColor: '#a5f3fc50'
    },
    {
      id: 3,
      name: 'Security',
      icon: 'Shield',
      totalFeedback: categories?.security?.total || 0,
      avgRating: categories?.security?.avgRating || 0,
      recentCount: categories?.security?.recent || 0,
      iconColor: '#3b82f6',
      gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      iconBg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      shadow: '0 2px 8px rgba(59, 130, 246, 0.08)',
      hoverShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
      borderColor: '#bfdbfe50'
    },
    {
      id: 4,
      name: 'Overall Experience',
      icon: 'Star',
      totalFeedback: categories?.overall?.total || 0,
      avgRating: categories?.overall?.avgRating || 0,
      recentCount: categories?.overall?.recent || 0,
      iconColor: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
      iconBg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      shadow: '0 2px 8px rgba(139, 92, 246, 0.08)',
      hoverShadow: '0 8px 24px rgba(139, 92, 246, 0.15)',
      borderColor: '#e9d5ff50'
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        <span className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
        Feedback Categories
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryData.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick && onCategoryClick(category.name.toLowerCase())}
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;