import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import './App.css';

function PricingPage() {
  const { isSignedIn, user } = useUser();
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedTier, setSelectedTier] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const API_URL = 'https://vidboost-backend-production.up.railway.app';

  const handleCheckout = async (priceType, tier) => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service first');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceType, 
          userId: user?.id,
          tier: tier 
        })
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error starting checkout. Please try again.');
    }
  };

  const handlePremiumClick = () => {
    if (!isSignedIn) {
      alert('Please sign in first to upgrade to Premium!');
      return;
    }
    setShowPaywall(true);
    setAgreedToTerms(false);
  };

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
        <title>Pricing - JSMGAX</title>
        <meta name="description" content="JSMGAX pricing: Free tier with 3 analyses, Premium at $5.99/month. 3x cheaper than VidIQ and TubeBuddy." />
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
          <h1 className="page-title">Simple, Transparent Pricing</h1>
          <p className="page-subtitle">No hidden fees. Cancel anytime.</p>
          
          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Free</h3>
                <div className="pricing-price">$0</div>
                <p className="pricing-period">/trial</p>
              </div>
              <ul className="pricing-features">
                <li>✓ 3 video analyses (lifetime)</li>
                <li>✓ Full AI-powered insights</li>
                <li>✓ Video scoring & hook analysis</li>
                <li>✓ Title & hashtag generator</li>
                <li>✓ Platform feedback</li>
                <li>✓ 1 AI thumbnail</li>
              </ul>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="secondary-btn" style={{width: '100%'}}>Start Free</button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link to="/" className="secondary-btn" style={{display: 'block', textAlign: 'center', textDecoration: 'none'}}>Go to Dashboard</Link>
              </SignedIn>
            </div>
            
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Premium</h3>
                <div className="pricing-price">$5.99</div>
                <p className="pricing-period">/month</p>
                <p className="pricing-yearly">or $55/year (save $16.88)</p>
              </div>
              <ul className="pricing-features">
                <li>✓ 50 analyses per month</li>
                <li>✓ Competitor video research</li>
                <li>✓ AI captions & SRT downloads</li>
                <li>✓ Niche trend detector</li>
                <li>✓ AI script writer</li>
                <li>✓ 3 AI thumbnails per month</li>
                <li>✓ Priority support</li>
              </ul>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="primary-btn" style={{width: '100%'}}>Get Started</button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <button className="primary-btn" style={{width: '100%'}} onClick={handlePremiumClick}>Upgrade to Premium</button>
              </SignedIn>
            </div>
          </div>
          
          <div className="comparison-section">
            <h2 className="section-title" style={{textAlign: 'center', marginBottom: '8px'}}>How JSMGAX Compares</h2>
            <p style={{textAlign: 'center', color: 'var(--color-text-dark)', marginBottom: '30px', fontSize: '14px'}}>
              Competitor pricing and features verified as of December 2025
            </p>
            <div className="comparison-table-container">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="highlight-col">JSMGAX</th>
                    <th>VidIQ</th>
                    <th>TubeBuddy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monthly Price</td>
                    <td className="winner">$5.99</td>
                    <td>$16.58</td>
                    <td>$14.99</td>
                  </tr>
                  <tr>
                    <td>Platforms Supported</td>
                    <td className="winner">YouTube, TikTok, Instagram</td>
                    <td>YouTube only</td>
                    <td>YouTube only</td>
                  </tr>
                  <tr>
                    <td>AI Model</td>
                    <td className="winner">OpenAI</td>
                    <td>Proprietary</td>
                    <td>Proprietary</td>
                  </tr>
                  <tr>
                    <td>Free Analyses</td>
                    <td className="winner">3 full analyses</td>
                    <td>Limited features</td>
                    <td>Limited features</td>
                  </tr>
                  <tr>
                    <td>Viral Prediction</td>
                    <td className="winner">✓ 0-100 score</td>
                    <td>✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Thumbnail Generation</td>
                    <td className="winner">✓ DALL-E 3</td>
                    <td className="feature-no">✗</td>
                    <td className="feature-no">✗</td>
                  </tr>
                  <tr>
                    <td>AI Script Writer</td>
                    <td className="winner">✓ Included</td>
                    <td className="feature-no">✗</td>
                    <td className="feature-no">✗</td>
                  </tr>
                  <tr>
                    <td>Competitor Analysis</td>
                    <td className="winner">✓ 50/month</td>
                    <td className="feature-limited">✓ Limited</td>
                    <td className="feature-limited">✓ Limited</td>
                  </tr>
                  <tr>
                    <td>Analysis Speed</td>
                    <td className="winner">&lt;60 seconds</td>
                    <td>2-3 minutes</td>
                    <td>2-3 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="paywall-overlay" onClick={(e) => { if (e.target.className === 'paywall-overlay') setShowPaywall(false); }}>
          <div className="paywall-card paywall-two-tier">
            <h2>Choose Your Plan</h2>
            <p className="paywall-subtitle">Upgrade to unlock all features</p>
            
            <div className="pricing-tiers">
              <div className={`tier-card ${selectedTier === 'premium' ? 'selected' : ''}`} onClick={() => setSelectedTier('premium')}>
                <div className="tier-header">
                  <h3>Premium</h3>
                  <div className="tier-price">$5.99<span>/month</span></div>
                  <p className="tier-yearly">or $55/year (save $16.88)</p>
                </div>
                <ul className="tier-features">
                  <li>50 analyses per month</li>
                  <li>AI captions & SRT downloads</li>
                  <li>Video scoring & hook analysis</li>
                  <li>Thumbnail text suggestions</li>
                  <li>Pacing & CTA analysis</li>
                  <li>Platform-specific feedback</li>
                  <li>Title & description generator</li>
                  <li>30+ hashtags per video</li>
                  <li>3 AI thumbnails per month</li>
                </ul>
                {selectedTier === 'premium' && (
                  <div className="tier-actions">
                    <button 
                      className={`secondary-btn ${!agreedToTerms ? 'btn-disabled' : ''}`} 
                      onClick={() => handleCheckout('monthly', 'premium')} 
                      disabled={!agreedToTerms}
                    >
                      Get Premium Monthly
                    </button>
                    <button 
                      className={`secondary-btn ${!agreedToTerms ? 'btn-disabled' : ''}`} 
                      onClick={() => handleCheckout('yearly', 'premium')} 
                      disabled={!agreedToTerms}
                    >
                      Get Premium Yearly (Save $16.88)
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="terms-checkbox">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={agreedToTerms} 
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                />
                <span className="checkbox-text">I have read and agree to the <Link to="/terms" className="terms-link" target="_blank">Terms of Service</Link></span>
              </label>
            </div>
            <button className="secondary-btn" onClick={() => setShowPaywall(false)} style={{ marginTop: '10px' }}>← Maybe Later</button>
          </div>
        </div>
      )}

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

export default PricingPage;
