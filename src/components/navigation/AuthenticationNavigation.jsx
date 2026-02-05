import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="auth-navigation">
      <div className="auth-navigation-container">
        <div className="auth-navigation-content">
          <div className="auth-navigation-logo">
            <div className="auth-navigation-brand">
              <Icon name="Home" size={24} color="var(--color-primary)" />
            </div>
            <span className="auth-navigation-title">HostelApp</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthenticationNavigation;