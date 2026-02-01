import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import api from '../../../utils/api';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.userId?.trim()) {
      newErrors.userId = `${formData?.role === 'student' ? 'College ID' : 'Staff ID'} is required`;
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    const res = await api.post("/auth/login", {
      userId: formData.userId,
      password: formData.password
    });

    const token = res.data.token;
    localStorage.setItem("token", token);

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role === "student") {
      navigate("/student-dashboard");
    } else if (payload.role === "warden") {
      navigate("/warden-dashboard");
    }
  } catch (err) {
    setErrors({
      submit: "Invalid College ID or password."
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-smooth ${
              formData?.role === 'student' ?'bg-primary text-primary-foreground shadow-elevation-sm' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name="GraduationCap" size={20} className="inline-block mr-2" />
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('warden')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-smooth ${
              formData?.role === 'warden' ?'bg-primary text-primary-foreground shadow-elevation-sm' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name="Shield" size={20} className="inline-block mr-2" />
            Warden
          </button>
        </div>

        <Input
          label={formData?.role === 'student' ? 'College ID' : 'Staff ID'}
          type="text"
          name="userId"
          placeholder={formData?.role === 'student' ? 'Enter your College ID' : 'Enter your Staff ID'}
          value={formData?.userId}
          onChange={handleInputChange}
          error={errors?.userId}
          required
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
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
        </div>

        {errors?.submit && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
            <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{errors?.submit}</p>
          </div>
        )}
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        iconName="LogIn"
        iconPosition="right"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;