import React from 'react';
import { Link } from 'react-router-dom';
import './TermsPage.css';

function PrivacyPage() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-home-btn">← Back to Home</Link>
        
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: December 12, 2025</p>

        <div className="legal-content">
          <h2>1. Introduction</h2>
          <p>JSMGAX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.</p>

          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul>
            <li>Email address</li>
            <li>Name (if provided)</li>
            <li>Password (encrypted)</li>
            <li>Subscription status and payment information (processed by Stripe)</li>
          </ul>

          <h3>2.2 Usage Data</h3>
          <p>We automatically collect certain information when you use the Service:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and features used</li>
            <li>Time and date of visits</li>
            <li>Analysis history and results</li>
          </ul>

          <h3>2.3 Video Content</h3>
          <p>When you upload videos for analysis:</p>
          <ul>
            <li>Videos are processed in real-time</li>
            <li>Videos are immediately deleted after analysis</li>
            <li>We do not store your video files</li>
            <li>Analysis results are stored in your account</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain the Service</li>
            <li>Process your video analyses</li>
            <li>Manage your account and subscription</li>
            <li>Send service-related notifications</li>
            <li>Improve and optimize the Service</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Data Sharing and Disclosure</h2>
          
          <h3>4.1 We DO NOT Sell Your Data</h3>
          <p>We will never sell, rent, or trade your personal information to third parties for marketing purposes.</p>

          <h3>4.2 Service Providers</h3>
          <p>We share data with trusted third-party service providers:</p>
          <ul>
            <li><strong>Clerk:</strong> Authentication and user management</li>
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>OpenAI:</strong> AI analysis (videos not stored)</li>
            <li><strong>Vercel:</strong> Hosting and infrastructure</li>
            <li><strong>Railway:</strong> Backend services</li>
          </ul>

          <h3>4.3 Legal Requirements</h3>
          <p>We may disclose your information if required by law or in response to valid legal requests.</p>

          <h2>5. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data:</p>
          <ul>
            <li>Encrypted data transmission (HTTPS/SSL)</li>
            <li>Secure password hashing</li>
            <li>Regular security audits</li>
            <li>Limited employee access to personal data</li>
            <li>Immediate deletion of uploaded videos</li>
          </ul>

          <h2>6. Data Retention</h2>
          <p>We retain your data as follows:</p>
          <ul>
            <li><strong>Account data:</strong> Until you delete your account</li>
            <li><strong>Analysis results:</strong> Until you delete them or close your account</li>
            <li><strong>Uploaded videos:</strong> Immediately deleted after processing</li>
            <li><strong>Payment records:</strong> Retained for tax and legal compliance (typically 7 years)</li>
          </ul>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> — Request a copy of your personal data</li>
            <li><strong>Correction</strong> — Update or correct inaccurate data</li>
            <li><strong>Deletion</strong> — Request deletion of your data</li>
            <li><strong>Data Portability</strong> — Receive your data in a portable format</li>
            <li><strong>Object</strong> — Object to certain processing of your data</li>
            <li><strong>Withdraw Consent</strong> — Withdraw consent at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us at: contact.jsmgax@gmail.com</p>

          <h2>8. For European Union (EU) Users — GDPR</h2>
          <p>If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):</p>
          <ul>
            <li>Right to be informed about data collection</li>
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Rights related to automated decision-making</li>
          </ul>

          <h2>9. For California Residents — CCPA</h2>
          <p>If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to say no to the sale of personal information</li>
            <li>Right to access your personal information</li>
            <li>Right to equal service and price</li>
          </ul>
          <p>We do not sell personal information.</p>

          <h2>10. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Maintain your login session</li>
            <li>Remember your preferences</li>
            <li>Analyze usage patterns (via Google Analytics)</li>
            <li>Improve user experience</li>
          </ul>
          <p>You can control cookies through your browser settings.</p>

          <h2>11. Third-Party Links</h2>
          <p>The Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.</p>

          <h2>12. Children's Privacy</h2>
          <p>The Service is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.</p>

          <h2>13. International Data Transfers</h2>
          <p>Your data may be transferred to and processed in the United States or other countries where our service providers operate. We ensure appropriate safeguards are in place.</p>

          <h2>14. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use after changes constitutes acceptance of the updated policy.</p>

          <h2>15. Contact Us</h2>
          <p>For privacy-related questions or to exercise your rights:</p>
          <p><strong>Email:</strong> contact.jsmgax@gmail.com</p>

          <div className="privacy-highlight">
            <p><strong>Summary:</strong> Minimal data collection • Videos deleted immediately • We NEVER sell your info • Full GDPR & CCPA compliance • Delete your account anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;
