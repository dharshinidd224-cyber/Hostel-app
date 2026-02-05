import React from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationNavigation from '../../components/navigation/AuthenticationNavigation';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import QuickLinks from './components/QuickLinks';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - HostelApp | Secure Hostel Management System</title>
        <meta name="description" content="Sign in to HostelApp with your College ID or Staff ID to access hostel management features including attendance marking, grievance submission, and facility feedback." />
      </Helmet>
      <AuthenticationNavigation />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px]">
          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 border border-slate-200/50 overflow-hidden backdrop-blur-sm">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-8 py-10 text-center">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
              </div>
              
              {/* Logo */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 mb-4 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                  <span className="text-blue-600 font-bold text-2xl">H</span>
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-blue-100 text-sm font-medium">
                Sign in to access your hostel account
              </p>
            </div>

            {/* Form Section */}
            <div className="px-8 py-8">
              <LoginForm />

              {/* Quick Links */}
              <div className="mt-8">
                <QuickLinks />
              </div>

              {/* Security Badges */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <SecurityBadges />
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Secure • Reliable • Easy to Use
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;