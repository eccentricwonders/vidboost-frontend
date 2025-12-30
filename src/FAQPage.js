import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import './App.css';

function FAQPage() {
  const Logo = () => (
    <Link to="/" className="logo" style={{ cursor: 'pointer' }}>
      <img 
        src="/logo-header.png" 
        alt="JSMGAX" 
        className="logo-image"
      />
    </Link>
  );

  return (
    <div className="app">
      <Helmet>
        <title>FAQ - JSMGAX</title>
        <meta name="description" content="Frequently asked questions about JSMGAX AI video analysis tool." />
      </Helmet>

      <header className="header">
        <Logo />
        <nav className="header-nav">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </nav>
        <div className="auth-buttons">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="auth-btn sign-in-btn">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="auth-btn sign-up-btn">Sign Up Free</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </header>

      <div className="standalone-page">
        <div className="page-content">
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-subtitle">Got questions? We've got answers.</p>
          
          <div className="faq-list">
            <div className="faq-item">
              <h3>What is JSMGAX?</h3>
              <p>JSMGAX is an AI-powered video analysis tool that helps content creators improve their videos. We analyze your content for hooks, pacing, SEO, thumbnails, and more — giving you actionable feedback in under 60 seconds.</p>
            </div>
            
            <div className="faq-item">
              <h3>How does it work?</h3>
              <p>Upload a video file or paste a YouTube/TikTok URL. Our AI (powered by GPT-4) transcribes and analyzes your content across 10+ dimensions, then provides detailed feedback and suggestions.</p>
            </div>
            
            <div className="faq-item">
              <h3>What platforms do you support?</h3>
              <p>We analyze content for YouTube, TikTok, and Instagram Reels. You can upload video files directly or paste URLs from YouTube.</p>
            </div>
            
            <div className="faq-item">
              <h3>Is my video data safe?</h3>
              <p>Absolutely. Your videos are processed and immediately deleted — we never store your content. We also don't sell your data. See our Privacy Policy for full details.</p>
            </div>
            
            <div className="faq-item">
              <h3>How accurate is the analysis?</h3>
              <p>Our analysis is powered by OpenAI's GPT-4, one of the most advanced AI models available. While no AI is perfect, our insights are based on patterns from thousands of successful videos. We recommend using our feedback as guidance alongside your own creative judgment.</p>
            </div>
            
            <div className="faq-item">
              <h3>What's included in the free tier?</h3>
              <p>Free users get 3 full video analyses (lifetime). Each analysis includes video scoring, hook analysis, title suggestions, hashtags, pacing feedback, platform optimization, and more. You also get 1 AI-generated thumbnail.</p>
            </div>
            
            <div className="faq-item">
              <h3>What does Premium include?</h3>
              <p>Premium ($5.99/month) gives you 50 analyses per month, competitor video research, the niche trend detector, AI script writer, 3 AI thumbnails per month, and priority support.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>Yes! You can cancel your subscription at any time. You'll keep access until the end of your billing period.</p>
            </div>
            
            <div className="faq-item">
              <h3>Do you offer refunds?</h3>
              <p>Due to the nature of AI services (immediate value delivery), we don't offer refunds. We recommend trying the free tier first to make sure JSMGAX is right for you.</p>
            </div>
            
            <div className="faq-item">
              <h3>How do I contact support?</h3>
              <p>Email us at contact.jsmgax@gmail.com. We typically respond within 24-48 hours.</p>
            </div>
          </div>
          
          <div className="page-cta">
            <p>Still have questions?</p>
            <Link to="/contact" className="secondary-btn" style={{display: 'inline-block', textDecoration: 'none'}}>Contact Us</Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>JSMGAX © 2025</p>
          <p className="footer-tagline">Built with ❤️ by a family, for creators everywhere</p>
        </div>
      </footer>
    </div>
  );
}

export default FAQPage;
