import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import ContactPage from './ContactPage';
import FeaturesPage from './FeaturesPage';
import AboutPage from './AboutPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

export default AppRoutes;
