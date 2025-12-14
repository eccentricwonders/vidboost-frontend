import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TermsPage.css';

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="legal-page">
      <div className="legal-container">
        <Link to="/" className="back-home-btn">← Back to Home</Link>
        
        <h1>Contact Us</h1>
        <p className="last-updated">We're here to help!</p>

        <div className="legal-content">
          <h2>Get in Touch</h2>
          <p>Have questions, feedback, or need support? We'd love to hear from you! Our team typically responds within 24-48 hours.</p>

          <h2>What We Can Help With</h2>
          <ul>
            <li><strong>Technical Support</strong> — Issues with video analysis, features not working, or bugs</li>
            <li><strong>Billing Questions</strong> — Subscription management, payment issues, or refund requests</li>
            <li><strong>Feature Requests</strong> — Suggestions for new features or improvements</li>
            <li><strong>Account Issues</strong> — Login problems, account access, or data requests</li>
            <li><strong>Business Inquiries</strong> — Partnerships, collaborations, or enterprise solutions</li>
            <li><strong>Hardship Requests</strong> — Need additional free analyses due to technical issues</li>
            <li><strong>General Feedback</strong> — Share your experience or suggestions</li>
          </ul>

          <h2>Send Us a Message</h2>
          {!submitted ? (
            <form 
              action="https://formspree.io/f/manrdeov"
              method="POST"
              onSubmit={() => setSubmitted(true)}
              className="contact-form"
            >
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="issue_type">Topic *</label>
                <select id="issue_type" name="issue_type" className="form-input" required>
                  <option value="">Select a topic...</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="account">Account Issue</option>
                  <option value="business">Business Inquiry</option>
                  <option value="hardship">Hardship Request</option>
                  <option value="feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  placeholder="Please describe your question or issue in detail..."
                  rows="6"
                  required
                  className="form-input form-textarea"
                />
              </div>
              
              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          ) : (
            <div className="contact-success">
              <div className="success-icon-large">✓</div>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. We've received your message and will get back to you as soon as possible.</p>
              <p>You should receive a confirmation email shortly at the address you provided.</p>
              <button 
                className="secondary-btn" 
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '20px' }}
              >
                Send Another Message
              </button>
            </div>
          )}

          <h2>Response Time</h2>
          <p>We aim to respond to all inquiries within <strong>24-48 hours</strong> during business days (Monday-Friday). For urgent technical issues affecting your subscription, we prioritize those requests.</p>

          <h2>Before You Contact Us</h2>
          <p>For faster assistance, you might find answers in these resources:</p>
          <ul>
            <li><strong>FAQ Section</strong> — Check our homepage for frequently asked questions</li>
            <li><strong>Terms of Service</strong> — <Link to="/terms" className="inline-link">View our terms</Link></li>
            <li><strong>Privacy Policy</strong> — <Link to="/privacy" className="inline-link">Learn about data privacy</Link></li>
          </ul>

          <h2>Social Media</h2>
          <p>While we don't currently have active social media accounts, we're focused on providing the best possible product and support through direct communication.</p>

          <div className="contact-highlight">
            <p><strong>We Value Your Feedback!</strong> Your input helps us improve JSMGAX for everyone. Whether it's a bug report, feature suggestion, or just letting us know how we're doing — we appreciate you taking the time to reach out.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
