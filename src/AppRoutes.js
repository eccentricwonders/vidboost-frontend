import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import App from './App';
import TermsPage from './TermsPage';
import PrivacyPage from './PrivacyPage';
import ContactPage from './ContactPage';
import FeaturesPage from './FeaturesPage';
import AboutPage from './AboutPage';
import PricingPage from './PricingPage';
import FAQPage from './FAQPage';
import VidIQAlternativePage from './VidIQAlternativePage';
import TubeBuddyAlternativePage from './TubeBuddyAlternativePage';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/vidiq-alternative" element={<VidIQAlternativePage />} />
      <Route path="/tubebuddy-alternative" element={<TubeBuddyAlternativePage />} />
    </Routes>
  );
}

export default AppRoutes;
