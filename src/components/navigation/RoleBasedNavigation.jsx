import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthenticationNavigation from './AuthenticationNavigation';
import Icon from '../AppIcon';

const RoleBasedNavigation = ({
  userRole = null,
  isAuthenticated = false,
  notificationCount = 0
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ---------- AUTH ROUTE LOGIC (FROM FIRST CODE) ----------
  const authRoutes = ['/login', '/student-registration', '/warden-registration'];
  const isAuthRoute = authRoutes?.includes(location?.pathname);

   // ---------- MOBILE SCROLL LOCK ----------
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
  if (isAuthRoute || !isAuthenticated) {
    return <AuthenticationNavigation />;
  }

  // ---------- ROLE BASED NAV ITEMS (FROM SECOND CODE) ----------
  const studentNavItems = [
    {
      label: 'Attendance',
      path: '/attendance-marking',
      icon: 'CheckCircle',
      description: 'Mark daily attendance'
    },
    {
      label: 'Submit Grievance',
      path: '/submit-grievance',
      icon: 'AlertCircle',
      description: 'Report issues'
    },
    {
      label: 'My Grievances',
      path: '/my-grievances',
      icon: 'FileText',
      description: 'Track your submissions'
    },
    {
      label: 'Give Feedback',
      path: '/give-feedback',
      icon: 'MessageSquare',
      description: 'Share your thoughts'
    }
  ];

  const wardenNavItems = [
    {
      label: 'Grievance Management',
      path: '/grievance-management',
      icon: 'ClipboardList',
      description: 'Manage student grievances'
    },
    {
      label: 'Post Notice',
      path: '/post-notice-alert',
      icon: 'Bell',
      description: 'Send notices and alerts'
    }
    ,{ label: 'Feedback Management',
       path: '/feedback-dashboard',
        icon: 'BarChart3' },
  ];

  const navItems = userRole === 'warden' ? wardenNavItems : studentNavItems;

  // ---------- HELPERS ----------
  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 

  // ---------- UI ----------
  return (
    <>
      <header className="nav-header">
        <div className="nav-header-logo">
          <div className="nav-header-logo-icon">
            <Icon name="Home" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex flex-col">
            <span className="nav-header-logo-text">HostelApp</span>
            <span className={`role-badge ${userRole}`}>
              <Icon
                name={userRole === 'warden' ? 'Shield' : 'User'}
                size={12}
              />
              {userRole === 'warden' ? 'Warden' : 'Student'}
            </span>
          </div>
        </div>

        <nav className="nav-header-menu">
          {navItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-header-item ${
                isActivePath(item?.path) ? 'active' : ''
              }`}
              title={item?.description}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        <button
          onClick={toggleMobileMenu}
          className="nav-header-mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
      </header>

      {/* ---------- MOBILE MENU ---------- */}
      <div className={`nav-header-mobile-menu ${!isMobileMenuOpen ? 'closed' : ''}`}>
        <div className="mb-6 px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="nav-header-logo-icon">
              <Icon name="Home" size={24} color="var(--color-primary)" />
            </div>
            <span className="nav-header-logo-text">HostelApp</span>
          </div>
          <span className={`role-badge ${userRole}`}>
            <Icon
              name={userRole === 'warden' ? 'Shield' : 'User'}
              size={12}
            />
            {userRole === 'warden' ? 'Warden' : 'Student'}
          </span>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`nav-header-mobile-item ${
                isActivePath(item?.path) ? 'active' : ''
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <div className="flex-1 text-left">
                <div className="font-medium">{item?.label}</div>
                <div className="text-xs text-muted-foreground caption">
                  {item?.description}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default RoleBasedNavigation;
