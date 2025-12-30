import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import './App.css';

function VidIQAlternativePage() {
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
        <title>Best VidIQ Alternative 2025 - JSMGAX | 3X Cheaper, More Features</title>
        <meta name="description" content="Looking for a VidIQ alternative? JSMGAX offers AI video analysis at $5.99/mo vs VidIQ's $16.58. Plus TikTok & Instagram support, AI thumbnails, and faster results." />
        <meta name="keywords" content="VidIQ alternative, VidIQ competitor, cheaper than VidIQ, VidIQ vs JSMGAX, best YouTube tool 2025" />
        <meta property="og:title" content="Best VidIQ Alternative 2025 - JSMGAX" />
        <meta property="og:description" content="Why pay $16.58/mo for VidIQ? JSMGAX offers more features at $5.99/mo. AI thumbnails, multi-platform support, and 60-second analysis." />
        <link rel="canonical" href="https://jsmgax.com/vidiq-alternative" />
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

      <div className="standalone-page comparison-landing">
        <div className="page-content">
          
          {/* Hero Section */}
          <div className="comparison-hero">
            <span className="comparison-badge">VidIQ Alternative</span>
            <h1 className="page-title">Looking for a Better VidIQ Alternative?</h1>
            <p className="page-subtitle">
              JSMGAX delivers everything VidIQ does — plus AI thumbnails, TikTok/Instagram support, 
              and faster analysis — at <strong>64% less cost</strong>.
            </p>
            <div className="comparison-hero-cta">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="primary-btn large-btn">Try Free - No Credit Card</button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link to="/" className="primary-btn large-btn" style={{textDecoration: 'none'}}>Go to Dashboard</Link>
              </SignedIn>
            </div>
          </div>

          {/* Price Comparison Highlight */}
          <div className="price-comparison-box">
            <div className="price-compare-item competitor">
              <span className="compare-label">VidIQ Boost</span>
              <span className="compare-price">$16.58<small>/mo</small></span>
            </div>
            <div className="price-compare-vs">VS</div>
            <div className="price-compare-item winner">
              <span className="compare-label">JSMGAX</span>
              <span className="compare-price">$5.99<small>/mo</small></span>
              <span className="savings-badge">Save $127/year</span>
            </div>
          </div>

          {/* Why Switch Section */}
          <div className="why-switch-section">
            <h2>Why Creators Are Switching from VidIQ</h2>
            
            <div className="switch-reasons">
              <div className="switch-reason">
                <span className="reason-icon">💰</span>
                <h3>64% Lower Price</h3>
                <p>VidIQ charges $16.58/month for their Boost plan. JSMGAX gives you comparable features for just $5.99/month. That's $127 saved every year.</p>
              </div>
              
              <div className="switch-reason">
                <span className="reason-icon">📱</span>
                <h3>Multi-Platform Support</h3>
                <p>VidIQ only works with YouTube. JSMGAX analyzes YouTube, TikTok, AND Instagram Reels — all from one dashboard.</p>
              </div>
              
              <div className="switch-reason">
                <span className="reason-icon">🎨</span>
                <h3>AI Thumbnail Generation</h3>
                <p>VidIQ doesn't generate thumbnails. JSMGAX uses DALL-E 3 to create eye-catching thumbnails based on your video content.</p>
              </div>
              
              <div className="switch-reason">
                <span className="reason-icon">⚡</span>
                <h3>60-Second Analysis</h3>
                <p>Get complete video insights in under a minute. No waiting around for reports to generate.</p>
              </div>
              
              <div className="switch-reason">
                <span className="reason-icon">🧠</span>
                <h3>Powered by GPT-4</h3>
                <p>While VidIQ uses proprietary algorithms, JSMGAX leverages OpenAI's most advanced model for deeper, more nuanced insights.</p>
              </div>
              
              <div className="switch-reason">
                <span className="reason-icon">✍️</span>
                <h3>AI Script Writer</h3>
                <p>Generate video scripts based on trending topics in your niche. VidIQ doesn't offer this feature.</p>
              </div>
            </div>
          </div>

          {/* Feature Comparison Table */}
          <div className="comparison-section">
            <h2 className="section-title" style={{textAlign: 'center', marginBottom: '30px'}}>Feature-by-Feature Comparison</h2>
            <div className="comparison-table-container">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="highlight-col">JSMGAX</th>
                    <th>VidIQ Boost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monthly Price</td>
                    <td className="winner">$5.99</td>
                    <td>$16.58</td>
                  </tr>
                  <tr>
                    <td>Annual Price</td>
                    <td className="winner">$55/year</td>
                    <td>$199/year</td>
                  </tr>
                  <tr>
                    <td>YouTube Analysis</td>
                    <td className="winner">✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>TikTok Analysis</td>
                    <td className="winner">✓</td>
                    <td className="feature-no">✗</td>
                  </tr>
                  <tr>
                    <td>Instagram Analysis</td>
                    <td className="winner">✓</td>
                    <td className="feature-no">✗</td>
                  </tr>
                  <tr>
                    <td>AI Model</td>
                    <td className="winner">OpenAI GPT-4</td>
                    <td>Proprietary</td>
                  </tr>
                  <tr>
                    <td>AI Thumbnail Generation</td>
                    <td className="winner">✓ DALL-E 3</td>
                    <td className="feature-no">✗</td>
                  </tr>
                  <tr>
                    <td>AI Script Writer</td>
                    <td className="winner">✓</td>
                    <td className="feature-no">✗</td>
                  </tr>
                  <tr>
                    <td>Hook Analysis</td>
                    <td className="winner">✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>SEO Recommendations</td>
                    <td className="winner">✓</td>
                    <td>✓</td>
                  </tr>
                  <tr>
                    <td>Keyword Research</td>
                    <td>Basic</td>
                    <td className="winner">Advanced</td>
                  </tr>
                  <tr>
                    <td>Browser Extension</td>
                    <td className="feature-no">✗</td>
                    <td className="winner">✓</td>
                  </tr>
                  <tr>
                    <td>Analysis Speed</td>
                    <td className="winner">&lt;60 seconds</td>
                    <td>2-3 minutes</td>
                  </tr>
                  <tr>
                    <td>Free Trial</td>
                    <td className="winner">3 full analyses</td>
                    <td>Limited features</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{textAlign: 'center', color: 'var(--color-text-dark)', marginTop: '15px', fontSize: '13px'}}>
              Pricing verified December 2025. VidIQ Boost plan compared.
            </p>
          </div>

          {/* What VidIQ Does Better - Honesty Section */}
          <div className="honest-comparison">
            <h2>To Be Fair: What VidIQ Does Better</h2>
            <p className="honest-intro">We believe in honest comparisons. Here's where VidIQ has an edge:</p>
            <div className="honest-list">
              <div className="honest-item">
                <span className="honest-icon">🔌</span>
                <div>
                  <strong>Browser Extension</strong>
                  <p>VidIQ's Chrome extension shows stats directly on YouTube pages. We're web-app only (for now).</p>
                </div>
              </div>
              <div className="honest-item">
                <span className="honest-icon">🔍</span>
                <div>
                  <strong>Keyword Research</strong>
                  <p>VidIQ has more robust keyword research tools built over 10+ years.</p>
                </div>
              </div>
              <div className="honest-item">
                <span className="honest-icon">📊</span>
                <div>
                  <strong>Channel Analytics</strong>
                  <p>Deep channel-level analytics and long-term competitor tracking.</p>
                </div>
              </div>
              <div className="honest-item">
                <span className="honest-icon">🏢</span>
                <div>
                  <strong>Established Brand</strong>
                  <p>VidIQ has been around since 2012 with millions of users.</p>
                </div>
              </div>
            </div>
            <div className="honest-conclusion">
              <p>
                <strong>But here's the thing:</strong> If you're a creator who wants fast, affordable video analysis 
                with AI-powered insights and multi-platform support, JSMGAX delivers more value per dollar. 
                We're built for creators who want results without the enterprise price tag.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="comparison-cta-section">
            <h2>Ready to Save $127/Year?</h2>
            <p>Try JSMGAX free — no credit card required. Get 3 full video analyses to see the difference.</p>
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="primary-btn large-btn">Start Free Analysis</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link to="/" className="primary-btn large-btn" style={{textDecoration: 'none', display: 'inline-block'}}>Go to Dashboard</Link>
            </SignedIn>
            <p className="cta-subtext">No credit card required • 3 free analyses • Cancel anytime</p>
          </div>

        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Compare</h4>
            <Link to="/vidiq-alternative" className="footer-link">VidIQ Alternative</Link>
            <Link to="/tubebuddy-alternative" className="footer-link">TubeBuddy Alternative</Link>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-trust-badges">
          <span className="trust-badge">🔒 Secured by Stripe</span>
          <span className="trust-badge">🧠 Powered by OpenAI</span>
          <span className="trust-badge">🗑️ Videos Never Stored</span>
        </div>
        <div className="footer-bottom">
          <p>JSMGAX © 2025</p>
          <p className="footer-tagline">Built with ❤️ by a family, for creators everywhere</p>
        </div>
      </footer>
    </div>
  );
}

export default VidIQAlternativePage;
