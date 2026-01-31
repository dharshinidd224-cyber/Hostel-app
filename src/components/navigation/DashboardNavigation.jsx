import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const DashboardNavigation = ({ userRole = 'student', notificationCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const studentNavItems = [
    { path: '/student-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/mark-attendance', label: 'Mark Attendance', icon: 'CheckSquare' },
  ];

  const wardenNavItems = [
    { path: '/warden-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/attendance-monitoring', label: 'Attendance Monitoring', icon: 'Users' },
  ];

  const navItems = userRole === 'student' ? studentNavItems : wardenNavItems;

  return (
    <>
      <nav className="dashboard-navigation">
        <div className="dashboard-navigation-container">
          <div className="dashboard-navigation-content">
            <div className="dashboard-navigation-logo">
              <div className="dashboard-navigation-brand">
                <Icon name="Home" size={24} color="var(--color-primary)" />
              </div>
              <span className="dashboard-navigation-title">HostelApp</span>
            </div>

            <div className="dashboard-navigation-menu">
              {navItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`dashboard-navigation-item ${isActive(item?.path) ? 'active' : ''}`}
                >
                  <Icon name={item?.icon} size={18} className="inline-block mr-2" />
                  {item?.label}
                </button>
              ))}
            </div>

            <div className="dashboard-navigation-actions">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Bell"
                  iconSize={20}
                  onClick={() => {}}
                />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                iconName="LogOut"
                iconSize={20}
                onClick={handleLogout}
              />

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="dashboard-navigation-mobile-toggle"
              >
                <Icon name="Menu" size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="dashboard-navigation-mobile-menu">
          <div className="dashboard-navigation-mobile-header">
            <div className="dashboard-navigation-logo">
              <div className="dashboard-navigation-brand">
                <Icon name="Home" size={24} color="var(--color-primary)" />
              </div>
              <span className="dashboard-navigation-title">HostelApp</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          <div className="dashboard-navigation-mobile-items">
            {navItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`dashboard-navigation-mobile-item ${isActive(item?.path) ? 'active' : ''}`}
              >
                <Icon name={item?.icon} size={20} className="inline-block mr-3" />
                {item?.label}
              </button>
            ))}

            <div className="border-t border-border my-4"></div>

            <button
              onClick={handleLogout}
              className="dashboard-navigation-mobile-item text-destructive"
            >
              <Icon name="LogOut" size={20} className="inline-block mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardNavigation;