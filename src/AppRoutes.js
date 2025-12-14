import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}

export default AppRoutes;
