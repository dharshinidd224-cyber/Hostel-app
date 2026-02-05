import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import NotificationDisplay from '../../components/ui/NotificationDisplay';
import MessageTypeSelector from './components/MessageTypeSelector';
import RichTextEditor from './components/RichTextEditor';
import TargetAudienceSelector from './components/TargetAudienceSelector';
import api from '../../utils/api';

import AttachmentUpload from './components/AttachmentUpload';
import MessagePreview from './components/MessagePreview';
import SuccessConfirmation from './components/SuccessConfirmation';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const PostNoticeAlert = () => {
  const navigate = useNavigate();
  const [userRole] = useState('warden');

  const [notification, setNotification] = useState({
    type: 'notice',
    title: 'Welcome to Notice Management',
    message: 'Create and distribute important communications to hostel students',
    timestamp: new Date()
  });

  const [formData, setFormData] = useState({
    type: 'notice',
    title: '',
    content: '',
    targets: [],
    scheduleEnabled: false,
    scheduledDate: '',
    scheduledTime: '',
    attachments: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (formData?.title || formData?.content) {
        setAutoSaveStatus('Draft saved');
        setTimeout(() => setAutoSaveStatus(''), 2000);
      }
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  }, [formData?.title, formData?.content]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData?.title?.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData?.content?.trim()) {
      newErrors.content = 'Message content is required';
    } else if (formData?.content?.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }

    if (formData?.targets?.length === 0) {
      newErrors.targets = 'Please select at least one target audience';
    }

    if (formData?.scheduleEnabled) {
      if (!formData?.scheduledDate) {
        newErrors.scheduledDate = 'Scheduled date is required';
      }
      if (!formData?.scheduledTime) {
        newErrors.scheduledTime = 'Scheduled time is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const noticeData = {
        type: formData.type,
        title: formData.title,
        message: formData.content,
        priority: formData.type === 'alert' ? 'high' : 'normal',
        targets: formData.targets,
        scheduled_date: formData.scheduleEnabled ? formData.scheduledDate : null,
        scheduled_time: formData.scheduleEnabled ? formData.scheduledTime : null,
        attachments: formData.attachments
      };

      const response = await api.post('/notices', noticeData);
      console.log('✅ Notice posted successfully:', response.data);
      
      setShowSuccess(true);
    } catch (error) {
      console.error('❌ Error posting notice:', error);
      alert('Failed to post notice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePostAnother = () => {
    setShowSuccess(false);
    setFormData({
      type: 'notice',
      title: '',
      content: '',
      targets: [],
      scheduleEnabled: false,
      scheduledDate: '',
      scheduledTime: '',
      attachments: []
    });
    setErrors({});
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/grievance-management');
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes cardSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.1); }
          50% { box-shadow: 0 0 30px rgba(37, 99, 235, 0.2); }
        }

        .card {
          position: relative;
          overflow: hidden;
          animation: cardSlideUp 0.5s ease-out both;
        }

        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .card:hover::before {
          left: 100%;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
        }

        .gradient-border-card {
          position: relative;
          background: white;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(
            135deg,
            #2563eb 0%,
            #3b82f6 25%,
            #60a5fa 50%,
            #10b981 75%,
            #2563eb 100%
          );
          background-size: 200% 200%;
          animation: gradientFlow 3s ease infinite;
        }

        .gradient-border-content {
          background: white;
          border-radius: 14px;
          padding: 1.5rem;
        }

        @media (min-width: 768px) {
          .gradient-border-content {
            padding: 2rem;
          }
        }
      `}</style>

      <div className="min-h-screen bg-background">
        <RoleBasedNavigation userRole={userRole} />
        <NotificationDisplay
          notification={notification}
          onDismiss={() => setNotification(null)}
          autoHideDuration={5000}
        />
        <main className="main-content">
          <div className="content-container">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center"
                  style={{
                    animation: 'pulseGlow 2s ease-in-out infinite',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon name="Bell" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
                    Post Notice & Alert
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Create and distribute important communications to students
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="gradient-border-card">
                    <div className="gradient-border-content">
                      <MessageTypeSelector
                        selectedType={formData?.type}
                        onTypeChange={(type) => setFormData({ ...formData, type })}
                      />
                    </div>
                  </div>

                  <div className="card">
                    <Input
                      type="text"
                      label="Message Title"
                      placeholder="Enter a clear and concise title"
                      value={formData?.title}
                      onChange={(e) => setFormData({ ...formData, title: e?.target?.value })}
                      error={errors?.title}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="card">
                    <RichTextEditor
                      value={formData?.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      error={errors?.content}
                      maxLength={1000}
                    />
                  </div>

                  <div className="card">
                    <TargetAudienceSelector
                      selectedTargets={formData?.targets}
                      onTargetChange={(targets) => setFormData({ ...formData, targets })}
                    />
                    {errors?.targets && (
                      <div className="flex items-center gap-2 text-xs md:text-sm text-destructive mt-2">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors?.targets}</span>
                      </div>
                    )}
                  </div>

                  <div className="card">
                    <AttachmentUpload
                      attachments={formData?.attachments}
                      onAttachmentsChange={(attachments) => setFormData({ ...formData, attachments })}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPreview(true)}
                      disabled={!formData?.title || !formData?.content}
                      iconName="Eye"
                      iconPosition="left"
                      fullWidth
                    >
                      Preview Message
                    </Button>
                    <Button
                      type="submit"
                      variant={formData?.type === 'alert' ? 'destructive' : 'default'}
                      loading={isSubmitting}
                      iconName={formData?.type === 'alert' ? 'AlertTriangle' : 'Send'}
                      iconPosition="left"
                      fullWidth
                    >
                      {formData?.scheduleEnabled ? 'Schedule Message' : 'Post Message'}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20 space-y-4 md:space-y-6">
                  {autoSaveStatus && (
                    <div 
                      className="card bg-success/5 border-success/20"
                      style={{ animation: 'cardSlideUp 0.3s ease-out' }}
                    >
                      <div className="flex items-center gap-2 text-sm text-success">
                        <Icon name="CheckCircle" size={16} />
                        <span>{autoSaveStatus}</span>
                      </div>
                    </div>
                  )}

                  <div className="card bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="Users" size={20} color="var(--color-primary)" />
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-primary">
                        Message Statistics
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-muted-foreground">Total Students</span>
                        <span className="text-sm md:text-base font-semibold text-foreground data-text">438</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-muted-foreground">Selected Recipients</span>
                        <span className="text-sm md:text-base font-semibold text-primary data-text">
                          {formData?.targets?.reduce((sum, id) => {
                            const blocks = [
                              { id: 'block-a', students: 120 },
                              { id: 'block-b', students: 115 },
                              { id: 'block-c', students: 108 },
                              { id: 'block-d', students: 95 }
                            ];
                            const block = blocks.find(b => b.id === id);
                            return sum + (block?.students || 0);
                          }, 0)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm text-muted-foreground">Delivery Status</span>
                        <span className="text-sm md:text-base font-semibold text-foreground">
                          {formData?.scheduleEnabled ? 'Scheduled' : 'Immediate'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <MessagePreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          messageData={formData}
        />
        <SuccessConfirmation
          isOpen={showSuccess}
          onClose={handleSuccessClose}
          messageData={formData}
          onPostAnother={handlePostAnother}
        />
      </div>
    </>
  );
};

export default PostNoticeAlert;