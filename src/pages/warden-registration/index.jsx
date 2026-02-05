import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthenticationNavigation from '../../components/navigation/AuthenticationNavigation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import api from '../../utils/api';

const WardenRegistration = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    staff_id: '',
    phone_number: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.staff_id || !formData.phone_number || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!/^STAFF\d{4}$/.test(formData.staff_id)) {
      setError('Staff ID must be in format: STAFF followed by 4 digits (e.g., STAFF1234)');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone_number)) {
      setError('Phone number must be 10 digits');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register/warden', {
        name: formData.name,
        staff_id: formData.staff_id,
        phone_number: formData.phone_number,
        password: formData.password
      });

      if (response.data.success) {
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please login with your credentials.',
            type: 'success'
          } 
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Warden Registration - HostelApp</title>
        <meta name="description" content="Register as a warden to manage hostel operations" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <AuthenticationNavigation />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Icon name="Shield" size={24} color="white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Warden Registration
              </h1>
              <p className="text-base text-muted-foreground">
                Create your administrative account to manage hostel operations
              </p>
            </div>
            
            {/* Form Card */}
            <div className="bg-card rounded-2xl shadow-elevation-lg border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                    <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
                    <p className="text-sm text-destructive flex-1">{error}</p>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your official name as per institution records
                  </p>
                </div>

                {/* Staff ID */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Staff ID <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    name="staff_id"
                    value={formData.staff_id}
                    onChange={handleChange}
                    placeholder="STAFF1234"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: STAFF followed by 4 digits
                  </p>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your active mobile number for notifications
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 8 characters with letters, numbers, and symbols
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                  iconName="UserPlus"
                  iconPosition="left"
                  className="mt-8"
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>

                {/* Back to Login */}
                <div className="text-center pt-4 border-t border-border">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <Icon name="ArrowLeft" size={16} />
                    <span>Back to Login</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WardenRegistration;