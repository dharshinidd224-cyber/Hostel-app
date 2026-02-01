import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MarkAttendance from './pages/mark-attendance';
import Login from './pages/login';
import WardenRegistration from './pages/warden-registration';
import WardenDashboard from './pages/warden-dashboard';
import StudentDashboard from './pages/student-dashboard';
import StudentRegistration from './pages/student-registration';
import GiveFeedback from './pages/give-feedback';
import PostNoticeAlert from './pages/post-notice-alert';
import SubmitGrievance from './pages/submit-grievance';
import MyGrievances from './pages/my-grievances';
import AttendanceMarking from './pages/attendance-marking';
import GrievanceManagement from './pages/grievance-management';
import NoticesandAlerts from './pages/notices-and-alerts';
import AttendanceMonitoring from './pages/attendance-monitoring';
import ForgotPassword from './pages/forgot-password';
import FeedbackDashboard from './pages/feedback-dashboard';
import ProtectedRoute from "components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/warden-registration" element={<WardenRegistration />} />
        <Route
  path="/student-dashboard"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/warden-dashboard"
  element={
    <ProtectedRoute allowedRole="warden">
      <WardenDashboard />
    </ProtectedRoute>
  }
/>

        <Route path="/student-registration" element={<StudentRegistration />} />
         <Route path="/" element={<AttendanceMarking />} />
        <Route path="/give-feedback" element={<GiveFeedback />} />
        <Route path="/feedback" element={<GiveFeedback />} />
        <Route path="/post-notice-alert" element={<PostNoticeAlert />} />
        <Route path="/post-notice" element={<PostNoticeAlert />} />
        <Route path="/send-alert" element={<PostNoticeAlert />} />
        <Route path="/notices" element={<NoticesandAlerts />} />
        <Route path="/alerts" element={<NoticesandAlerts />} />
        <Route path="/submit-grievance" element={<SubmitGrievance />} />
        <Route path="/my-grievances" element={<MyGrievances />} />
        <Route path="/attendance-marking" element={<AttendanceMarking />} />
        <Route path="/grievance-management" element={<GrievanceManagement />} />
        <Route path="/attendance-monitoring" element={<AttendanceMonitoring />} />
        <Route path="/" element={<ForgotPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/feedback-dashboard" element={<FeedbackDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;