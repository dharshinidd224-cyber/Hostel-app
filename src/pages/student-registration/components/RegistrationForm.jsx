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
    collegeId: '',
    roomNumber: '',
    blockNumber: '',
    department: '',
    year: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const departmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electronics', label: 'Electronics Engineering' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'information-technology', label: 'Information Technology' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'chemical', label: 'Chemical Engineering' }
  ];

  const yearOptions = [
    { value: '1', label: 'First Year' },
    { value: '2', label: 'Second Year' },
    { value: '3', label: 'Third Year' },
    { value: '4', label: 'Fourth Year' }
  ];

  const blockOptions = [
    { value: 'A', label: 'Block A' },
    { value: 'B', label: 'Block B' },
    { value: 'C', label: 'Block C' },
    { value: 'D', label: 'Block D' }
  ];

  const validateCollegeId = (id) => {
    const collegeIdPattern = /^[A-Z]{2}\d{6}$/;
    return collegeIdPattern?.test(id);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern?.test(phone);
  };

  const validatePassword = (password) => {
    return password?.length >= 8;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (field === 'collegeId' && value && !validateCollegeId(value)) {
      setErrors(prev => ({ ...prev, collegeId: 'College ID must be in format: XX123456' }));
    }

    if (field === 'phoneNumber' && value && !validatePhoneNumber(value)) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Enter valid 10-digit mobile number' }));
    }

    if (field === 'password' && value && !validatePassword(value)) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
    }

    if (field === 'confirmPassword' && value && value !== formData?.password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.collegeId?.trim()) {
      newErrors.collegeId = 'College ID is required';
    } else if (!validateCollegeId(formData?.collegeId)) {
      newErrors.collegeId = 'College ID must be in format: XX123456';
    }

    if (!formData?.roomNumber?.trim()) {
      newErrors.roomNumber = 'Room number is required';
    }

    if (!formData?.blockNumber) {
      newErrors.blockNumber = 'Block number is required';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData?.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Enter valid 10-digit mobile number';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData?.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  setErrors({});

  try {
    await api.post("/auth/register", {
  collegeId: formData.collegeId,
  password: formData.password,
  role: "student",

  // 👇 SEND STUDENT DATA
  name: formData.name,
  roomNumber: formData.roomNumber,
  blockNumber: formData.blockNumber,
  department: formData.department,
  phoneNumber: formData.phoneNumber,
  year: formData.year
});


    navigate("/login");
  } catch (err) {
    if (err.response?.status === 409) {
      setErrors({
        submit: "College ID already registered. Please login."
      });
    } else {
      setErrors({
        submit: "Registration failed. Please try again."
      });
    }
  } finally {
    setLoading(false); // ✅ VERY IMPORTANT
  }
};

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) strength++;
    if (/\d/?.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/?.test(password)) strength++;

    const strengthMap = {
      1: { label: 'Weak', color: 'text-error' },
      2: { label: 'Fair', color: 'text-warning' },
      3: { label: 'Good', color: 'text-success' },
      4: { label: 'Strong', color: 'text-success' }
    };

    return { strength, ...(strengthMap?.[strength] || { label: '', color: '' }) };
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
        />

        <Input
          label="College ID"
          type="text"
          placeholder="XX123456"
          description="Format: Two letters followed by six digits"
          value={formData?.collegeId}
          onChange={(e) => handleInputChange('collegeId', e?.target?.value?.toUpperCase())}
          error={errors?.collegeId}
          required
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="Room Number"
          type="text"
          placeholder="Enter room number"
          value={formData?.roomNumber}
          onChange={(e) => handleInputChange('roomNumber', e?.target?.value)}
          error={errors?.roomNumber}
          required
        />

        <Select
          label="Block Number"
          placeholder="Select block"
          options={blockOptions}
          value={formData?.blockNumber}
          onChange={(value) => handleInputChange('blockNumber', value)}
          error={errors?.blockNumber}
          required
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Select
          label="Department"
          placeholder="Select department"
          options={departmentOptions}
          value={formData?.department}
          onChange={(value) => handleInputChange('department', value)}
          error={errors?.department}
          searchable
          required
        />

        <Select
          label="Year"
          placeholder="Select year"
          options={yearOptions}
          value={formData?.year}
          onChange={(value) => handleInputChange('year', value)}
          error={errors?.year}
          required
        />
      </div>
      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter 10-digit mobile number"
        description="Enter your active mobile number for notifications"
        value={formData?.phoneNumber}
        onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
        error={errors?.phoneNumber}
        maxLength={10}
        required
      />
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          description="Minimum 8 characters with letters, numbers, and symbols"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
        {formData?.password && passwordStrength?.label && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  passwordStrength?.strength === 1 ? 'bg-error w-1/4' :
                  passwordStrength?.strength === 2 ? 'bg-warning w-1/2' :
                  passwordStrength?.strength === 3 ? 'bg-success w-3/4': 'bg-success w-full'
                }`}
              />
            </div>
            <span className={`text-sm font-medium ${passwordStrength?.color}`}>
              {passwordStrength?.label}
            </span>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      {/* Submit error message */}
{errors?.submit && (
  <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
    {errors.submit}
  </div>
)}

      <div className="pt-4 md:pt-6">
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={loading}
          iconName="UserPlus"
          iconPosition="left"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </div>
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth inline-flex items-center gap-2"
        >
          <Icon name="ArrowLeft" size={16} />
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;