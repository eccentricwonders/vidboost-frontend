import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import './App.css';

function App() {
  const { isSignedIn, user } = useUser();
  const [step, setStep] = useState('upload');
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [transcription, setTranscription] = useState(null);
  const [tips, setTips] = useState('');
  const [trendingAndIdeas, setTrendingAndIdeas] = useState('');
  const [titleAndDescription, setTitleAndDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [videoScore, setVideoScore] = useState('');
  const [hookAnalysis, setHookAnalysis] = useState('');
  const [error, setError] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [usesLeft, setUsesLeft] = useState(5);
  const [showLimitReached, setShowLimitReached] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const MAX_FILE_SIZE = 25 * 1024 * 1024;
  const FREE_USES = 5;

  useEffect(() => {
    if (isSignedIn && user) {
      const vidboostUses = user.unsafeMetadata?.vidboost_uses || 0;
      const vidboostPremium = user.unsafeMetadata?.vidboost_premium || false;
      setUsesLeft(FREE_USES - vidboostUses);
      setIsPremium(vidboostPremium);
      if (vidboostUses >= FREE_USES && !vidboostPremium) {
        setShowLimitReached(true);
      }
    }
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' && isSignedIn && user) {
      user.update({ unsafeMetadata: { ...user.unsafeMetadata, vidboost_premium: true } });
      setIsPremium(true);
      window.history.replaceState({}, document.title, '/');
    }
  }, [isSignedIn, user]);

  const handleCheckout = async (priceType) => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service before continuing.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceType, userId: user?.id }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout session');
      }
    } catch (err) {
      alert('Could not connect to payment server');
    }
  };

  const handleAnalyze = async () => {
    if (!isSignedIn) {
      alert('Please sign in to analyze videos!');
      return;
    }
    if (usesLeft <= 0 && !isPremium) {
      setShowLimitReached(true);
      return;
    }
    if (!videoFile && !youtubeUrl) {
      alert('Please upload a video file OR paste a YouTube link');
      return;
    }
    if (videoFile && videoFile.size > MAX_FILE_SIZE) {
      setError('File is too large! Maximum size is 25MB. Please use a shorter video or compress it.');
      return;
    }
    setStep('analyzing');
    setError(null);
    try {
      let response;
      if (videoFile) {
        const formData = new FormData();
        formData.append('video', videoFile);
        response = await fetch('http://localhost:3001/api/transcribe', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:3001/api/transcribe-youtube', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: youtubeUrl }),
        });
      }
      const data = await response.json();
      if (data.success) {
        setTranscription(data);
        setTips(data.tips);
        setTrendingAndIdeas(data.trendingAndIdeas);
        setTitleAndDescription(data.titleAndDescription);
        setHashtags(data.hashtags);
        setVideoScore(data.videoScore);
        setHookAnalysis(data.hookAnalysis);
        setStep('results');
        if (!isPremium && user) {
          const currentUses = user.unsafeMetadata?.vidboost_uses || 0;
          const newUses = currentUses + 1;
          await user.update({ unsafeMetadata: { ...user.unsafeMetadata, vidboost_uses: newUses } });
          setUsesLeft(FREE_USES - newUses);
        }
      } else {
        setError(data.error || 'Something went wrong');
        setStep('upload');
      }
    } catch (err) {
      setError('Could not connect to server. Make sure backend is running!');
      setStep('upload');
    }
  };

  const handleStartOver = () => {
    if (usesLeft <= 0 && !isPremium) {
      setShowLimitReached(true);
      return;
    }
    setStep('upload');
    setVideoFile(null);
    setYoutubeUrl('');
    setTranscription(null);
    setTips('');
    setTrendingAndIdeas('');
    setTitleAndDescription('');
    setHashtags('');
    setVideoScore('');
    setHookAnalysis('');
    setError(null);
    setShowPaywall(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError('File is too large! Maximum size is 25MB. Please use a shorter video or compress it.');
        return;
      }
      if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
        setVideoFile(file);
        setYoutubeUrl('');
        setError(null);
      } else {
        alert('Please upload a valid video or audio file');
      }
    }
  };

  const handleYoutubeChange = (e) => {
    setYoutubeUrl(e.target.value);
    if (e.target.value) {
      setVideoFile(null);
    }
    setError(null);
  };

  const handleDownloadCaptions = () => {
    if (!transcription) return;
    let srtContent = '';
    if (transcription.segments) {
      transcription.segments.forEach((segment, index) => {
        const startTime = formatSRTTime(segment.start);
        const endTime = formatSRTTime(segment.end);
        srtContent += `${index + 1}\n${startTime} --> ${endTime}\n${segment.text.trim()}\n\n`;
      });
    } else {
      srtContent = `1\n00:00:00,000 --> 00:05:00,000\n${transcription.text}\n`;
    }
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatSRTTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
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
    <div className="logo">
      <svg className="logo-icon-svg" width="50" height="50" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7"/>
            <stop offset="100%" stopColor="#ec4899"/>
          </linearGradient>
          <linearGradient id="boltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a"/>
            <stop offset="100%" stopColor="#f59e0b"/>
          </linearGradient>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <polygon points="90,70 155,70 200,250 245,70 310,70 200,310" fill="url(#vGrad)"/>
        <polygon points="215,50 175,150 200,150 160,260 230,140 200,140 240,50" fill="url(#boltGrad)" filter="url(#glow2)"/>
      </svg>
      <span className="logo-text">VidBoost</span>
    </div>
  );

  const TermsModal = () => (
    <div className="terms-overlay">
      <div className="terms-modal">
        <h2>📜 Terms of Service</h2>
        <div className="terms-content">
          <h3>AI-Powered Service</h3>
          <p>VidBoost uses artificial intelligence to analyze videos, generate captions, provide tips, and suggest content ideas. AI technology, while advanced, is not perfect and may occasionally produce errors, inaccuracies, or unexpected results. By using VidBoost, you acknowledge and accept that all AI-generated content should be reviewed before use.</p>
          
          <h3>Age Requirement</h3>
          <p>You must be at least 18 years old to use VidBoost or have permission from a parent or guardian. By using this service, you confirm that you meet this requirement.</p>
          
          <h3>Limitation of Liability</h3>
          <p>VidBoost and its creators are not liable for any damages, losses, or issues arising from the use of this service, including but not limited to: inaccurate transcriptions, inappropriate suggestions, lost revenue, or any decisions made based on AI-generated content. Use this service at your own discretion and risk.</p>
          
          <h3>Subscription & Cancellation</h3>
          <p>You may cancel your premium subscription at any time. Upon cancellation, you will retain access to premium features until the end of your current billing period. <strong>All payments are final and no refunds will be issued</strong> for partial months, unused time, or any other reason.</p>
          
          <h3>Payment Security & Privacy</h3>
          <p>All payments are processed securely through Stripe, a PCI-compliant payment processor. <strong>VidBoost does not store, access, or share your payment information.</strong> Your credit card details are handled entirely by Stripe and are never visible to us. We do not sell, share, or distribute any of your personal information to third parties.</p>
          
          <h3>Prohibited Use</h3>
          <p>You agree NOT to upload or use VidBoost for: illegal, harmful, or offensive content; copyrighted material you don't own or have rights to; content that violates others' privacy; spam, malware, or any malicious purposes; any content involving minors in inappropriate contexts. Violation of these terms may result in immediate account termination.</p>
          
          <h3>Service Availability</h3>
          <p>VidBoost is provided "as is" without guarantees of availability or uptime. We may experience downtime for maintenance, updates, or technical issues. We are not liable for any losses caused by service interruptions.</p>
          
          <h3>Account Termination</h3>
          <p>We reserve the right to suspend or terminate your account at any time if you violate these terms, without notice and without refund.</p>
          
          <h3>Changes to Service</h3>
          <p>We reserve the right to modify, update, or discontinue any features of VidBoost at any time. Pricing may change with reasonable notice to subscribers.</p>
          
          <h3>Content Responsibility</h3>
          <p>You are solely responsible for the videos you upload and how you use the AI-generated content. VidBoost does not claim ownership of your content and does not store your videos after processing.</p>
          
          <h3>Acceptance of Terms</h3>
          <p>By using VidBoost, you agree to these terms of service. We reserve the right to modify these terms at any time.</p>
        </div>
        <button className="primary-btn" onClick={() => setShowTerms(false)}>I Understand</button>
      </div>
    </div>
  );

  const PaywallContent = () => (
    <div className="paywall-card">
      <h2>⭐ Upgrade to VidBoost Premium</h2>
      <p className="paywall-subtitle">Get trending topics, video ideas, and AI-powered editing!</p>
      <div className="pricing-options">
        <div className="pricing-card">
          <h3>Monthly</h3>
          <div className="price">$4.99<span>/month</span></div>
          <ul>
            <li>✅ Unlimited video analyses</li>
            <li>✅ Trending topics & video ideas</li>
            <li>✅ Title & description generator</li>
            <li>✅ Hashtag generator</li>
            <li>✅ Video scoring & hook analysis</li>
          </ul>
          <button className={`primary-btn ${!agreedToTerms ? 'btn-disabled' : ''}`} onClick={() => handleCheckout('monthly')} disabled={!agreedToTerms}>Choose Monthly</button>
        </div>
        <div className="pricing-card popular">
          <div className="popular-badge">BEST VALUE</div>
          <h3>Yearly</h3>
          <div className="price">$39<span>/year</span></div>
          <p className="savings">Save $20!</p>
          <ul>
            <li>✅ Unlimited video analyses</li>
            <li>✅ All premium features</li>
            <li>✅ Priority support</li>
          </ul>
          <button className={`primary-btn ${!agreedToTerms ? 'btn-disabled' : ''}`} onClick={() => handleCheckout('yearly')} disabled={!agreedToTerms}>Choose Yearly</button>
        </div>
      </div>
      <div className="terms-agreement">
        <label className="checkbox-container">
          <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
          <span className="checkmark"></span>
          <span className="checkbox-text">I have read and agree to the <span className="terms-link" onClick={() => setShowTerms(true)}>Terms of Service</span></span>
        </label>
      </div>
      <button className="secondary-btn" onClick={() => setShowPaywall(false)} style={{ marginTop: '10px' }}>← Maybe Later</button>
    </div>
  );

  if (showLimitReached && !isPremium) {
    return (
      <div className="app">
        <header className="header">
          <Logo />
          <p className="tagline">AI-Powered Video Enhancement</p>
          <div className="auth-buttons">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </header>
        <main className="main-content">
          <div className="limit-reached-section">
            <div className="limit-card">
              <span className="limit-icon">🎉</span>
              <h2>You've Used All 5 Free Analyses!</h2>
              <p className="limit-subtitle">We hope you loved VidBoost! Upgrade to Premium for unlimited analyses.</p>
              <div className="limit-stats">
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Videos Analyzed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">With Premium</span>
                </div>
              </div>
              <div className="limit-options">
                <button className="premium-btn" onClick={() => setShowPaywall(true)}>⭐ Upgrade to Premium - $4.99/month</button>
                <p className="limit-note">Get unlimited analyses, trending topics, video ideas, and AI editing tools!</p>
              </div>
            </div>
          </div>
        </main>
        {showPaywall && (
          <div className="paywall-overlay">
            <div className="paywall-section">
              <PaywallContent />
            </div>
          </div>
        )}
        {showTerms && <TermsModal />}
        <footer className="footer">
          <p>VidBoost © 2024 | <span className="terms-link" onClick={() => setShowTerms(true)}>Terms of Service</span></p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <Logo />
        <p className="tagline">AI-Powered Video Enhancement</p>
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
      <main className="main-content">
        {step === 'upload' && (
          <div className="upload-section">
            <h2>Enhance Your Video with AI</h2>
            <p className="subtitle">Get FREE AI captions and personalized tips to make your videos go viral!</p>
            
            <SignedOut>
              <div className="sign-in-prompt">
                <p>🔐 Sign in to start analyzing videos!</p>
                <SignUpButton mode="modal">
                  <button className="primary-btn">✨ Create Free Account</button>
                </SignUpButton>
                <p className="sign-in-note">Already have an account? <SignInButton mode="modal"><span className="sign-in-link">Sign in</span></SignInButton></p>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="uses-counter">
                <span className="uses-icon">🎁</span>
                <span className="uses-text">{isPremium ? '✨ Premium - Unlimited' : `${usesLeft} free analyses left`}</span>
              </div>
              {!isPremium && (
                <button className="go-premium-btn" onClick={handlePremiumClick}>⭐ Go Premium - Unlimited Access</button>
              )}
              <p className="pricing-note">Then just <strong>$4.99/mo</strong> or <strong>$39/yr</strong> • Cancel anytime</p>
              {error && <div className="error-box">⚠️ {error}</div>}
              <div className="input-group">
                <label>🔗 Paste YouTube Link</label>
                <input type="text" placeholder="https://www.youtube.com/watch?v=..." value={youtubeUrl} onChange={handleYoutubeChange} className={youtubeUrl ? 'input-success' : ''} />
                {youtubeUrl && <span className="success-text">✅ YouTube link ready!</span>}
              </div>
              <div className="divider"><span>OR</span></div>
              <div className={`upload-box ${videoFile ? 'upload-success' : ''}`}>
                <input type="file" accept="video/*,audio/*" onChange={handleFileChange} id="video-upload" hidden />
                <label htmlFor="video-upload" className="upload-label">
                  <span className="upload-icon">📁</span>
                  <span className="upload-text">{videoFile ? '✅ ' + videoFile.name : 'Click to upload video file'}</span>
                  <span className="upload-hint">MP4, MOV, AVI, MP3, WAV (Max 25MB)</span>
                </label>
              </div>
              <button className="primary-btn" onClick={handleAnalyze} disabled={!videoFile && !youtubeUrl}>✨ Analyze with AI {!isPremium && `(${usesLeft} left)`}</button>
            </SignedIn>
          </div>
        )}
        {step === 'analyzing' && (
          <div className="analyzing-section">
            <div className="loader"></div>
            <h2>Analyzing Your Video...</h2>
            <p>{youtubeUrl ? 'Downloading from YouTube...' : 'Processing your video...'}</p>
            <p className="analyzing-note">This may take 1-2 minutes</p>
          </div>
        )}
        {step === 'results' && !showPaywall && (
          <div className="results-section">
            <h2>🎉 Your AI Analysis is Ready!</h2>
            
            {/* Video Score - FREE */}
            <div className="result-card free score-card">
              <div className="card-header"><h3>📊 Video Score</h3><span className="free-badge">FREE</span></div>
              <div className="score-box">{videoScore.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
            </div>

            {/* Captions - FREE */}
            <div className="result-card free">
              <div className="card-header"><h3>💬 AI-Generated Captions</h3><span className="free-badge">FREE</span></div>
              <div className="transcription-box"><p>{transcription?.text}</p></div>
              <button className="primary-btn" onClick={handleDownloadCaptions}>⬇️ Download Captions (.SRT)</button>
            </div>

            {/* Tips - FREE */}
            <div className="result-card free">
              <div className="card-header"><h3>💡 AI Tips to Make Your Video Pop!</h3><span className="free-badge">FREE</span></div>
              <div className="tips-box">{tips.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
            </div>

            {/* Hook Analysis - FREE */}
            <div className="result-card free">
              <div className="card-header"><h3>🎣 Hook Analysis</h3><span className="free-badge">FREE</span></div>
              <div className="tips-box">{hookAnalysis.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
            </div>

            {/* Title & Description - PREMIUM */}
            <div className="result-card premium">
              <div className="card-header"><h3>📝 Title & Description</h3><span className="premium-badge">PREMIUM</span></div>
              {isPremium ? (
                <div className="premium-content-box">
                  <div className="tips-box">{titleAndDescription.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
                  <button className="copy-btn" onClick={() => handleCopyText(titleAndDescription)}>📋 Copy to Clipboard</button>
                </div>
              ) : (
                <div className="locked-content">
                  <div className="blurred-preview"><p>TITLE 1: ████████████████</p><p>TITLE 2: ████████████████</p><p>DESCRIPTION: ████████████████</p></div>
                  <div className="lock-overlay">
                    <span className="lock-icon">🔒</span>
                    <p>Unlock SEO-optimized titles & descriptions!</p>
                    <button className="unlock-btn" onClick={handlePremiumClick}>⭐ Unlock Premium</button>
                  </div>
                </div>
              )}
            </div>

            {/* Hashtags - PREMIUM */}
            <div className="result-card premium">
              <div className="card-header"><h3>#️⃣ Hashtag Generator</h3><span className="premium-badge">PREMIUM</span></div>
              {isPremium ? (
                <div className="premium-content-box">
                  <div className="tips-box">{hashtags.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
                  <button className="copy-btn" onClick={() => handleCopyText(hashtags)}>📋 Copy to Clipboard</button>
                </div>
              ) : (
                <div className="locked-content">
                  <div className="blurred-preview"><p>#viral #████ #████████</p><p>#trending #████ #████████</p></div>
                  <div className="lock-overlay">
                    <span className="lock-icon">🔒</span>
                    <p>Unlock trending hashtags for maximum reach!</p>
                    <button className="unlock-btn" onClick={handlePremiumClick}>⭐ Unlock Premium</button>
                  </div>
                </div>
              )}
            </div>

            {/* Trending & Ideas - PREMIUM */}
            <div className="result-card premium">
              <div className="card-header"><h3>🔥 Trending Topics & Video Ideas</h3><span className="premium-badge">PREMIUM</span></div>
              {isPremium ? (
                <div className="trending-box">{trendingAndIdeas.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
              ) : (
                <div className="locked-content">
                  <div className="blurred-preview"><p>🔥 TRENDING RIGHT NOW:</p><p>1. ████████████████</p><p>2. ████████████████</p><p>💡 VIDEO IDEAS FOR YOU:</p><p>1. ████████████████</p></div>
                  <div className="lock-overlay">
                    <span className="lock-icon">🔒</span>
                    <p>Unlock trending topics & personalized video ideas!</p>
                    <button className="unlock-btn" onClick={handlePremiumClick}>⭐ Unlock Premium</button>
                  </div>
                </div>
              )}
            </div>

            <button className="secondary-btn" onClick={handleStartOver}>🔄 Analyze Another Video</button>
          </div>
        )}
        {showPaywall && (
          <div className="paywall-section">
            <PaywallContent />
          </div>
        )}
        {showTerms && <TermsModal />}
      </main>
      <footer className="footer">
        <p>VidBoost © 2024 | <span className="terms-link" onClick={() => setShowTerms(true)}>Terms of Service</span></p>
      </footer>
    </div>
  );
}

export default App;