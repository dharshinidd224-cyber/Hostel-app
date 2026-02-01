import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import api from '../../../utils/api';


const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    staffId: '',
    phoneNumber: '',
    blockNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const blockOptions = [
    { value: 'A', label: 'Block A - Boys Hostel' },
    { value: 'B', label: 'Block B - Boys Hostel' },
    { value: 'C', label: 'Block C - Girls Hostel' },
    { value: 'D', label: 'Block D - Girls Hostel' },
    { value: 'E', label: 'Block E - PG Block' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData?.name?.trim()?.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData?.staffId?.trim()) {
      newErrors.staffId = 'Staff ID is required';
    } else if (!/^STAFF\d{4}$/?.test(formData?.staffId)) {
      newErrors.staffId = 'Staff ID must be in format STAFF1234';
    }

    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Enter valid 10-digit Indian mobile number';
    }

    if (!formData?.blockNumber) {
      newErrors.blockNumber = 'Block assignment is required';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  setErrors({});

  try {
    await api.post("/auth/register", {
      userId: formData.staffId,   // or collegeId equivalent
      password: formData.password,
      role: "warden"
    });

    navigate("/login");
  } catch (err) {
    if (err.response?.status === 409) {
      setErrors({
        submit: "Staff ID already registered. Please login."
      });
    } else {
      setErrors({
        submit: "Warden registration failed."
      });
    }
  } finally {
    setLoading(false);
  }
};


  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-xl shadow-elevation-lg p-6 md:p-8 lg:p-10">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="var(--color-primary)" className="md:w-10 md:h-10" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            Warden Registration
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Create your administrative account to manage hostel operations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            description="Your official name as per institution records"
            value={formData?.name}
            onChange={(e) => handleChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />

          <Input
            label="Staff ID"
            type="text"
            placeholder="STAFF1234"
            description="Format: STAFF followed by 4 digits (e.g., STAFF1001)"
            value={formData?.staffId}
            onChange={(e) => handleChange('staffId', e?.target?.value?.toUpperCase())}
            error={errors?.staffId}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="9876543210"
            description="10-digit Indian mobile number for official communication"
            value={formData?.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e?.target?.value?.replace(/\D/g, '')?.slice(0, 10))}
            error={errors?.phoneNumber}
            required
          />

          <Select
            label="Block Assignment"
            description="Select the hostel block you will be responsible for managing"
            placeholder="Choose your assigned block"
            options={blockOptions}
            value={formData?.blockNumber}
            onChange={(value) => handleChange('blockNumber', value)}
            error={errors?.blockNumber}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              description="Minimum 8 characters with uppercase, lowercase, number and special character"
              value={formData?.password}
              onChange={(e) => handleChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              description="Must match the password entered above"
              value={formData?.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Security Requirements:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Staff ID will be verified against institution database</li>
                  <li>Block assignment must match your official designation</li>
                  <li>Contact number will be used for emergency communications</li>
                  <li>Account activation may require admin approval</li>
                </ul>
              </div>
            </div>
          </div>
          {errors?.submit && (
  <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
    {errors.submit}
  </div>
)}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToLogin}
              iconName="ArrowLeft"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Back to Login
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={loading}
              iconName="UserPlus"
              iconPosition="right"
              className="w-full sm:flex-1"
            >
              {loading ? 'Creating Account...' : 'Register as Warden'}
            </Button>
          </div>
        </form>
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={handleBackToLogin}
              className="text-primary hover:underline font-medium"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;