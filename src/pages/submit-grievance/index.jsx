import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CategorySelector from './components/CategorySelector';
import PrioritySelector from './components/PrioritySelector';
import DescriptionInput from './components/DescriptionInput';
import ImageUploader from './components/ImageUploader';
import SuccessModal from './components/SuccessModal';
import api from '../../utils/api';

const SubmitGrievance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    priority: 'medium',
    description: '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [grievanceId, setGrievanceId] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.category) {
      newErrors.category = 'Please select a grievance category';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Please provide a detailed description';
    } else if (formData?.description?.trim()?.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData?.priority) {
      newErrors.priority = 'Please select a priority level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const generateGrievanceId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `GRV${timestamp}${random}`?.slice(0, 15);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ Call backend API
      const response = await api.post("/grievances", {
        category: formData.category,
        priority: formData.priority,
        description: formData.description,
        images: formData.images
      });

      console.log("✅ Grievance submitted:", response.data);

      // Get the grievance ID from response
      const newGrievanceId = response.data.grievanceId;
      setGrievanceId(newGrievanceId);
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        category: '',
        priority: 'medium',
        description: '',
        images: []
      });
      setErrors({});
    } catch (error) {
      console.error('❌ Error submitting grievance:', error);
      
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to submit grievance. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setGrievanceId('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <RoleBasedNavigation userRole="student" />
      
      <main className="main-content py-8 md:py-12">
        <div className="content-container">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="back-button-enhanced"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back</span>
          </button>
          {/* Hero Header - Centered with Gradient */}
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-blue-500/30 mb-6">
              <Icon name="MessageSquare" size={36} color="white" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Submit Your Grievance
            </h1>
          </div>

          {/* Main Form Container - Centered */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Card with Gradient Border */}
              <div className="relative group">
                {/* Gradient Background Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-300 blur"></div>
                
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Icon name="FileText" size={24} color="white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        Grievance Details
                      </h2>
                      <p className="text-sm text-gray-500">Fill in the information below</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-8">
                    <CategorySelector
                      value={formData?.category}
                      onChange={(value) => {
                        setFormData({ ...formData, category: value });
                        setErrors({ ...errors, category: '' });
                      }}
                      error={errors?.category}
                    />

                    <PrioritySelector
                      value={formData?.priority}
                      onChange={(value) => {
                        setFormData({ ...formData, priority: value });
                        setErrors({ ...errors, priority: '' });
                      }}
                    />

                    <DescriptionInput
                      value={formData?.description}
                      onChange={(value) => {
                        setFormData({ ...formData, description: value });
                        setErrors({ ...errors, description: '' });
                      }}
                      error={errors?.description}
                    />

                    <ImageUploader
                      images={formData?.images}
                      onChange={(images) => {
                        setFormData({ ...formData, images });
                      }}
                      error={errors?.images}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          category: '',
                          priority: 'medium',
                          description: '',
                          images: []
                        });
                        setErrors({});
                      }}
                      iconName="RotateCcw"
                      iconPosition="left"
                      className="sm:w-auto"
                    >
                      Reset Form
                    </Button>
                    
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                      fullWidth
                      className="sm:flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      <SuccessModal
        isOpen={showSuccessModal}
        grievanceId={grievanceId}
        onClose={handleCloseSuccessModal}
      />
      <style jsx>{`
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
       `} </style>
    </div>
  );
};

export default SubmitGrievance;