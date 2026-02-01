import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    userType: 'student'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mockCredentials = {
    student: ['STU2024001', 'STU2024002', 'STU2024003'],
    warden: ['WAR2024001', 'WAR2024002']
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.userId?.trim()) {
      newErrors.userId = 'User ID is required';
    } else if (formData?.userId?.length < 3) {
      newErrors.userId = 'User ID must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const validIds = mockCredentials?.[formData?.userType];
      if (!validIds?.includes(formData?.userId)) {
        setErrors({
          submit: `Invalid ${formData?.userType === 'student' ? 'College' : 'Staff'} ID. Please verify your credentials and try again.`
        });
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 5000);

    } catch (error) {
      setErrors({
        submit: 'Failed to process password reset request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <div className="w-full max-w-md">
          <div className="card text-center">
            <div className="mb-4 md:mb-6 flex justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} color="var(--color-success)" className="md:w-8 md:h-8" />
              </div>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading text-foreground mb-3 md:mb-4">
              Check Your Email
            </h2>

            <div className="space-y-3 md:space-y-4 text-left mb-6 md:mb-8">
              <div className="bg-muted rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground mb-2">
                  Password reset instructions have been sent to the email address associated with:
                </p>
                <p className="data-text text-sm md:text-base font-medium text-foreground break-all">
                  {formData?.userId}
                </p>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Icon name="Clock" size={16} className="mt-0.5 flex-shrink-0" />
                  <p>The reset link will expire in 1 hour</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Shield" size={16} className="mt-0.5 flex-shrink-0" />
                  <p>For security, this link can only be used once</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Mail" size={16} className="mt-0.5 flex-shrink-0" />
                  <p>Check your spam folder if you don't see the email</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs md:text-sm text-muted-foreground">
                Redirecting to login in 5 seconds...
              </p>
              <Button
                variant="outline"
                fullWidth
                onClick={handleBackToLogin}
                iconName="ArrowLeft"
                iconPosition="left"
                size="default"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl mb-3 md:mb-4">
            <Icon name="Building2" size={24} color="var(--color-primary)" className="md:w-8 md:h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading text-foreground mb-2">
            HostelApp
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Institutional Hostel Management System
          </p>
        </div>

        <div className="card">
          <div className="mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-heading text-foreground mb-2">
              Reset Password
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Enter your user ID and we'll send password reset instructions to your registered email address.
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
            <div className="flex items-start gap-2 md:gap-3">
              <Icon name="ShieldCheck" size={20} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs md:text-sm font-medium text-accent-foreground">
                  Secure Recovery Process
                </p>
                <p className="text-xs text-muted-foreground">
                  A time-limited reset link will be sent to your institutional email. This link expires in 1 hour and can only be used once for security.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-sm md:text-base font-medium text-foreground mb-2 md:mb-3">
                User Type <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('userType', 'student')}
                  className={`p-3 md:p-4 rounded-lg border-2 transition-all ${
                    formData?.userType === 'student' ?'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1 md:gap-2">
                    <Icon 
                      name="GraduationCap" 
                      size={20} 
                      color={formData?.userType === 'student' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                      className="md:w-6 md:h-6"
                    />
                    <span className={`text-xs md:text-sm font-medium ${
                      formData?.userType === 'student' ? 'text-primary' : 'text-foreground'
                    }`}>
                      Student
                    </span>
                    <span className="text-xs text-muted-foreground">Hostel resident</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange('userType', 'warden')}
                  className={`p-3 md:p-4 rounded-lg border-2 transition-all ${
                    formData?.userType === 'warden' ?'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1 md:gap-2">
                    <Icon 
                      name="ShieldCheck" 
                      size={20} 
                      color={formData?.userType === 'warden' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                      className="md:w-6 md:h-6"
                    />
                    <span className={`text-xs md:text-sm font-medium ${
                      formData?.userType === 'warden' ? 'text-primary' : 'text-foreground'
                    }`}>
                      Warden
                    </span>
                    <span className="text-xs text-muted-foreground">Admin staff</span>
                  </div>
                </button>
              </div>
            </div>

            <Input
              label={formData?.userType === 'student' ? 'College ID' : 'Staff ID'}
              type="text"
              placeholder={`Enter your ${formData?.userType === 'student' ? 'college' : 'staff'} ID`}
              description={`Your ${formData?.userType === 'student' ? 'student' : 'employee'} identification number`}
              required
              value={formData?.userId}
              onChange={(e) => handleInputChange('userId', e?.target?.value)}
              error={errors?.userId}
            />

            {errors?.submit && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3 md:p-4">
                <div className="flex items-start gap-2 md:gap-3">
                  <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-error-foreground">{errors?.submit}</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
              size="default"
            >
              {isSubmitting ? 'Sending Instructions...' : 'Send Reset Instructions'}
            </Button>
          </form>

          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <Icon name="HelpCircle" size={16} className="mt-0.5 flex-shrink-0" />
                <p>
                  If you don't receive the email within 5 minutes, check your spam folder or contact your hostel administration.
                </p>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Icon name="Phone" size={16} className="mt-0.5 flex-shrink-0" />
                <p>
                  For immediate assistance, contact the hostel office during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-6 text-center">
          <Button
            variant="ghost"
            onClick={handleBackToLogin}
            iconName="ArrowLeft"
            iconPosition="left"
            size="default"
          >
            Back to Login
          </Button>
        </div>

        <div className="mt-6 md:mt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date()?.getFullYear()} HostelApp. Secure institutional hostel management.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;