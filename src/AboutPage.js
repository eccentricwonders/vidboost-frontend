import React from 'react';
import { Link } from 'react-router-dom';
import './TermsPage.css';

function AboutPage() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>About JSMGAX</h1>
        
        <div className="terms-section">
          <h2>Built by a Mom, for Creators Like Her Son</h2>
          <p>
            JSMGAX was created with my son in mind.
          </p>
          <p>
            He recently started a YouTube channel and, like so many young creators, he has big dreams of going viral. I watch him every day record video after video, trying to decide which one to post. When the views stayed low, I could see how discouraging that process became.
          </p>
          <p>
            As a parent, I wanted to do more than just say "keep going." I wanted to actually help.
          </p>
          <p>
            That's when JSMGAX was born.
          </p>
          <p>
            Using AI, I built a tool designed to take the guesswork out of content creation. JSMGAX analyzes videos before you post and gives real, actionable feedback. It looks at things like hooks, pacing, titles, thumbnails, captions, audio quality, calls-to-action, and even predicts viral potential. It also studies successful videos in your niche, tracks trends, suggests video ideas, generates scripts, captions, thumbnails, and helps creators optimize for platforms like YouTube, TikTok, and Instagram Reels.
          </p>
          <p>
            The goal is simple: help creators feel more confident, make smarter decisions, and stay motivated instead of getting discouraged.
          </p>
          <p>
            JSMGAX isn't just an app. It's something built from experience, empathy, and a genuine desire to help creators grow without burning out.
          </p>
          <p style={{fontStyle: 'italic', marginTop: '30px', color: '#00ffff'}}>
            - Samantha M., Founder of JSMGAX
          </p>
          <p style={{fontSize: '14px', color: '#888', fontStyle: 'italic'}}>
            Last updated: December 2025
          </p>
        </div>

        <div className="terms-section">
          <h2>Why Choose JSMGAX?</h2>
          
          <div className="trust-badges-about">
            <div className="trust-badge-about">
              <span className="badge-icon-about">🤖</span>
              <div>
                <strong>Advanced AI Technology</strong>
                <p>Powered by OpenAI's cutting-edge models for accurate, actionable insights</p>
              </div>
            </div>
            <div className="trust-badge-about">
              <span className="badge-icon-about">🔒</span>
              <div>
                <strong>Stripe Payments</strong>
                <p>Bank-level security for all transactions. Your payment info is never stored on our servers</p>
              </div>
            </div>
            <div className="trust-badge-about">
              <span className="badge-icon-about">🛡️</span>
              <div>
                <strong>GDPR Compliant</strong>
                <p>Your data is protected and private. We never sell or share your information</p>
              </div>
            </div>
            <div className="trust-badge-about">
              <span className="badge-icon-about">⚡</span>
              <div>
                <strong>Enterprise Infrastructure</strong>
                <p>99.9% uptime with Vercel & Railway. Fast, reliable, always available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="terms-section">
          <h2>Try Before You Buy</h2>
          <div className="guarantee-box-about">
            <div className="guarantee-icon-about">🎁</div>
            <div>
              <h3>3 Free Full Analyses - No Credit Card Required</h3>
              <p>
                Get 3 complete video analyses absolutely free. Not a limited trial - you get access to ALL features including viral prediction, hook analysis, thumbnail scoring, and competitor research. See the value for yourself before spending a penny.
              </p>
            </div>
          </div>
        </div>

        <div className="terms-section">
          <h2>How JSMGAX Compares</h2>
          <p style={{textAlign: 'center', color: '#888', fontSize: '14px', fontStyle: 'italic', marginBottom: '20px'}}>
            Competitor pricing and features verified as of December 2025
          </p>
          
          <div className="comparison-table-about">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>JSMGAX</th>
                  <th>VidIQ</th>
                  <th>TubeBuddy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Monthly Price</strong></td>
                  <td className="highlight">$5.99</td>
                  <td>$16.58</td>
                  <td>$14.99</td>
                </tr>
                <tr>
                  <td><strong>Platforms Supported</strong></td>
                  <td className="highlight">YouTube, TikTok, Instagram</td>
                  <td>YouTube only</td>
                  <td>YouTube only</td>
                </tr>
                <tr>
                  <td><strong>AI Model</strong></td>
                  <td className="highlight">OpenAI</td>
                  <td>Proprietary</td>
                  <td>Proprietary</td>
                </tr>
                <tr>
                  <td><strong>Free Analyses</strong></td>
                  <td className="highlight">3 full analyses</td>
                  <td>Limited features</td>
                  <td>Limited features</td>
                </tr>
                <tr>
                  <td><strong>Viral Prediction</strong></td>
                  <td className="check">✓ 0-100 score</td>
                  <td className="check">✓</td>
                  <td className="check">✓</td>
                </tr>
                <tr>
                  <td><strong>Thumbnail Generation</strong></td>
                  <td className="check">✓ DALL-E 3</td>
                  <td className="cross">✗</td>
                  <td className="cross">✗</td>
                </tr>
                <tr>
                  <td><strong>AI Script Writer</strong></td>
                  <td className="check">✓ Included</td>
                  <td className="cross">✗</td>
                  <td className="cross">✗</td>
                </tr>
                <tr>
                  <td><strong>Competitor Analysis</strong></td>
                  <td className="check">✓ 50/month</td>
                  <td className="check">✓ Limited</td>
                  <td className="check">✓ Limited</td>
                </tr>
                <tr>
                  <td><strong>Analysis Speed</strong></td>
                  <td className="highlight">&lt;60 seconds</td>
                  <td>2-3 minutes</td>
                  <td>2-3 minutes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="terms-section">
          <h2>Our Mission</h2>
          <p>
            We believe every creator deserves access to professional-grade video analysis tools, not just those who can afford expensive subscriptions. JSMGAX democratizes video optimization by making powerful AI insights affordable and accessible to everyone.
          </p>
          <p>
            Whether you're just starting out or growing an established channel, we're here to help you create content that resonates, engages, and goes viral.
          </p>
        </div>

        <div className="terms-section">
          <h2>Get Started Today</h2>
          <p>
            Join creators who are using AI to optimize their content and grow their audience. Start with 3 free analyses and see the difference for yourself.
          </p>
          <div style={{textAlign: 'center', marginTop: '30px'}}>
            <Link to="/" className="back-button">Start Free Analysis</Link>
          </div>
        </div>

        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
