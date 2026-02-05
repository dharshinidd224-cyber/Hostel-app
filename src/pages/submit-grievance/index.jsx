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
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="student" />
      <main className="main-content">
        <div className="content-container">
          <div className="max-w-3xl mx-auto">
            {/* Back button with proper top margin */}
            <button
              onClick={() => navigate('/student-dashboard')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 mt-4"
            >
              <Icon name="ArrowLeft" size={20} />
              <span>Back to Dashboard</span>
            </button>

            <div className="mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="AlertCircle" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                    Submit Grievance
                  </h1>
                  <p className="text-sm text-muted-foreground caption mt-1">
                    Report hostel maintenance and facility issues
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="card ml-0 mt-0 pr-6 pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon name="FileText" size={20} color="var(--color-accent)" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Grievance Details
                  </h2>
                </div>

                <div className="space-y-6">
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
              </div>

              {/* Button group with proper spacing */}
              <div className="flex flex-col sm:flex-row gap-4 pb-8">
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
                  variant="default"
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="left"
                  fullWidth
                  className="sm:flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                </Button>
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
    </div>
  );
};

export default SubmitGrievance;