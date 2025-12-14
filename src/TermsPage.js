import React from 'react';
import { Link } from 'react-router-dom';
import './TermsPage.css';

function TermsPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-home-btn">← Back to Home</Link>
        
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: December 12, 2025</p>

        <div className="legal-content">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using JSMGAX ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>

          <h2>2. Description of Service</h2>
          <p>JSMGAX is an AI-powered video analysis platform that provides insights, recommendations, and tools for content creators. The Service includes video analysis, thumbnail generation, script writing, and related features.</p>

          <h2>3. User Accounts</h2>
          <p>You must create an account to use certain features of the Service. You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>

          <h2>4. Subscription Plans</h2>
          <p>JSMGAX offers multiple subscription tiers:</p>
          <ul>
            <li><strong>Free Plan:</strong> 3 video analyses and 3 AI-generated thumbnails (lifetime)</li>
            <li><strong>Premium Plan:</strong> Unlimited analyses and features for $5.99/month or $55/year</li>
            <li><strong>Pro Plan:</strong> Coming soon with advanced features</li>
          </ul>
          <p>Subscription fees are billed in advance and are non-refundable except as required by law.</p>

          <h2>5. Payment Terms</h2>
          <p>By subscribing to a paid plan, you authorize us to charge your payment method. You agree to:</p>
          <ul>
            <li>Provide accurate and complete payment information</li>
            <li>Update your payment information as needed</li>
            <li>Pay all charges incurred under your account</li>
          </ul>

          <h2>6. Cancellation and Refunds</h2>
          <p>You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. We do not provide refunds for partial subscription periods, except as required by law.</p>

          <h2>7. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Upload content that violates copyright, trademark, or other intellectual property rights</li>
            <li>Attempt to gain unauthorized access to the Service or related systems</li>
            <li>Use the Service to harass, abuse, or harm others</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Use automated systems (bots, scrapers) without permission</li>
          </ul>

          <h2>8. Content Ownership</h2>
          <p>You retain all rights to the videos and content you upload. By using the Service, you grant us a limited license to process and analyze your content solely for providing the Service. We do not claim ownership of your content.</p>

          <h2>9. Data Retention</h2>
          <p>Uploaded videos are processed and immediately deleted from our servers. We do not store your video files. Analysis results are stored in your account until you delete them.</p>

          <h2>10. AI-Generated Content</h2>
          <p>The Service uses AI to generate thumbnails, scripts, and analysis. While we strive for accuracy:</p>
          <ul>
            <li>AI-generated content may contain errors or inaccuracies</li>
            <li>You are responsible for reviewing and editing AI-generated content before use</li>
            <li>We do not guarantee specific results or outcomes</li>
          </ul>

          <h2>11. Intellectual Property</h2>
          <p>The Service, including its design, features, and functionality, is owned by JSMGAX and protected by copyright, trademark, and other intellectual property laws.</p>

          <h2>12. Disclaimer of Warranties</h2>
          <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.</p>

          <h2>13. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, JSMGAX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.</p>

          <h2>14. Indemnification</h2>
          <p>You agree to indemnify and hold JSMGAX harmless from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.</p>

          <h2>15. Modifications to Service</h2>
          <p>We reserve the right to modify, suspend, or discontinue the Service at any time without notice. We are not liable for any modification, suspension, or discontinuation.</p>

          <h2>16. Modifications to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>

          <h2>17. Governing Law</h2>
          <p>These Terms are governed by the laws of the United States and the State of Oklahoma, without regard to conflict of law principles.</p>

          <h2>18. Entire Agreement</h2>
          <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and JSMGAX regarding your use of the Service.</p>

          <h2>19. Contact</h2>
          <p>Questions about these Terms? Contact us at: <strong>contact.jsmgax@gmail.com</strong></p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
