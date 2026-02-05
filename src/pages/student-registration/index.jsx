import React from 'react';
import AuthenticationNavigation from '../../components/navigation/AuthenticationNavigation';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';

const StudentRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <AuthenticationNavigation />
      
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <RegistrationHeader />
          
          <div className="bg-card rounded-xl shadow-elevation-md p-4 md:p-6 lg:p-8">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;