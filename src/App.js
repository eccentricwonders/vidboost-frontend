import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import './App.css';

function App() {
  // API URL - change to http://localhost:3001 for local development
  const API_URL = 'https://vidboost-backend-production.up.railway.app';
  
  const { isSignedIn, user } = useUser();
  // Navigation state
  const [currentView, setCurrentView] = useState('upload'); // 'upload', 'analyzing', 'results'
  const [videoFile, setVideoFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  // Analysis results
  const [transcription, setTranscription] = useState(null);
  const [tips, setTips] = useState('');
  const [trendingAndIdeas, setTrendingAndIdeas] = useState('');
  const [titleAndDescription, setTitleAndDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [videoScore, setVideoScore] = useState('');
  const [hookAnalysis, setHookAnalysis] = useState('');
  const [thumbnailText, setThumbnailText] = useState('');
  const [pacingAnalysis, setPacingAnalysis] = useState('');
  const [ctaRecommendations, setCtaRecommendations] = useState('');
  const [platformFeedback, setPlatformFeedback] = useState('');
  const [audioNotes, setAudioNotes] = useState('');
  const [percentile, setPercentile] = useState(null);
  const [totalVideosAnalyzed, setTotalVideosAnalyzed] = useState(0);
  // Competitor analysis state
  const [analysisMode, setAnalysisMode] = useState('myVideo'); // 'myVideo' or 'competitor'
  const [isCompetitorAnalysis, setIsCompetitorAnalysis] = useState(false);
  const [successAnalysis, setSuccessAnalysis] = useState('');
  const [structureAnalysis, setStructureAnalysis] = useState('');
  const [tacticsAnalysis, setTacticsAnalysis] = useState('');
  const [seoAnalysis, setSeoAnalysis] = useState('');
  const [competitorSummary, setCompetitorSummary] = useState('');
  // Modal state
  const [activeModal, setActiveModal] = useState(null);
  // UI state
  const [error, setError] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [usesLeft, setUsesLeft] = useState(3);
  const [showLimitReached, setShowLimitReached] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  // Pro tier state
  const [proEnabled, setProEnabled] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [selectedTier, setSelectedTier] = useState('premium'); // 'premium' or 'pro'
  // Thumbnail generator state
  const [thumbnailsUsed, setThumbnailsUsed] = useState(0);
  const [thumbnailsResetDate, setThumbnailsResetDate] = useState(null);
  const [generatedThumbnail, setGeneratedThumbnail] = useState(null);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [selectedThumbnailStyle, setSelectedThumbnailStyle] = useState('youtube');
  const [showThumbnailModal, setShowThumbnailModal] = useState(false);
  
  // Script Writer state
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [scriptTopic, setScriptTopic] = useState('');
  const [scriptLength, setScriptLength] = useState('medium');
  const [scriptStyle, setScriptStyle] = useState('educational');
  const [scriptAudience, setScriptAudience] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  // Support modal state
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  
  // Founding member popup state
  const [showFoundingPopup, setShowFoundingPopup] = useState(false);

  const MAX_FILE_SIZE = 25 * 1024 * 1024;
  const FREE_USES = 3;
  
  // Admin emails - these accounts bypass all limits
  const ADMIN_EMAILS = [
    'eccentricwonders@gmail.com',
    'smarlowvr@gmail.com',
  ];
  
  const isAdmin = user?.primaryEmailAddress?.emailAddress && 
    ADMIN_EMAILS.includes(user.primaryEmailAddress.emailAddress.toLowerCase());

  // Load user data on sign in
  useEffect(() => {
    if (isSignedIn && user) {
      const vidboostUses = user.unsafeMetadata?.vidboost_uses || 0;
      const vidboostPremium = user.unsafeMetadata?.vidboost_premium || false;
      const vidboostThumbnails = user.unsafeMetadata?.vidboost_thumbnails_used || 0;
      const vidboostThumbReset = user.unsafeMetadata?.vidboost_thumbnails_reset || null;
      const vidboostNotified = user.unsafeMetadata?.vidboost_notified || false;
      
      // Check if admin
      const userEmail = user.primaryEmailAddress?.emailAddress?.toLowerCase();
      const userIsAdmin = ADMIN_EMAILS.includes(userEmail);
      
      // Notify on new signup (first time user)
      if (!vidboostNotified && !userIsAdmin) {
        fetch(API_URL + '/api/notify-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress || 'Unknown',
            name: user.fullName || user.firstName || 'Unknown'
          })
        }).catch(err => console.log('Notification failed:', err));
        
        // Mark as notified
        user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            vidboost_notified: true
          }
        });
      }
      
      // Admin gets unlimited, others get normal count
      setUsesLeft(userIsAdmin ? 999 : FREE_USES - vidboostUses);
      setIsPremium(vidboostPremium);
      
      // Check if we need to reset monthly thumbnail count
      const now = new Date();
      const resetDate = vidboostThumbReset ? new Date(vidboostThumbReset) : null;
      if (resetDate && now > resetDate) {
        // Reset thumbnail count for new month
        setThumbnailsUsed(0);
        const nextReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        setThumbnailsResetDate(nextReset.toISOString());
        user.update({ 
          unsafeMetadata: { 
            ...user.unsafeMetadata, 
            vidboost_thumbnails_used: 0,
            vidboost_thumbnails_reset: nextReset.toISOString()
          } 
        });
      } else {
        setThumbnailsUsed(vidboostThumbnails);
        setThumbnailsResetDate(vidboostThumbReset);
      }
      
      if (vidboostUses >= FREE_USES && !vidboostPremium) {
        setShowLimitReached(true);
      }
    }
    
    // Handle Stripe success redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' && isSignedIn && user) {
      user.update({ unsafeMetadata: { ...user.unsafeMetadata, vidboost_premium: true } });
      setIsPremium(true);
      setShowLimitReached(false);
      
      // Notify about new premium subscription
      fetch(API_URL + '/api/notify-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress || 'Unknown',
          plan: 'Premium'
        })
      }).catch(err => console.log('Premium notification failed:', err));
      
      window.history.replaceState({}, document.title, '/');
    }
  }, [isSignedIn, user]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Show founding member popup for logged-in free users (once per session)
  useEffect(() => {
    if (isSignedIn && !isPremium && !isAdmin) {
      const hasSeenPopup = sessionStorage.getItem('vidboost_founding_popup_seen');
      if (!hasSeenPopup) {
        // Delay popup by 2 seconds so user can see the page first
        const timer = setTimeout(() => {
          setShowFoundingPopup(true);
          sessionStorage.setItem('vidboost_founding_popup_seen', 'true');
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [isSignedIn, isPremium, isAdmin]);

  const handleCheckout = async (priceType, tier = 'premium') => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms of Service before continuing.');
      return;
    }
    try {
      const response = await fetch(API_URL + '/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceType, userId: user?.id, tier }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
      } else {
        alert('Error creating checkout session');
      }
    } catch (err) {
      alert('Could not connect to payment server');
    }
  };

  const handleJoinWaitlist = async () => {
    if (!waitlistEmail) {
      alert('Please enter your email address');
      return;
    }
    try {
      const response = await fetch(API_URL + '/api/join-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail, userId: user?.id }),
      });
      const data = await response.json();
      if (data.success) {
        setWaitlistJoined(true);
      } else {
        alert(data.error || 'Error joining waitlist');
      }
    } catch (err) {
      alert('Could not connect to server');
    }
  };

  // Thumbnail limits per tier
  const getThumbnailLimit = () => {
    if (isAdmin) return 999; // Admin: unlimited
    if (!isPremium) return 1; // Free: 1 total
    // For now, Premium = 3/month, Pro = 20/month (Pro not implemented yet)
    return 3; // Premium
  };

  const getThumbnailsRemaining = () => {
    if (isAdmin) return 999; // Admin: unlimited
    const limit = getThumbnailLimit();
    if (!isPremium) {
      // Free users: 1 total lifetime
      return Math.max(0, limit - thumbnailsUsed);
    }
    // Premium/Pro: monthly limit
    return Math.max(0, limit - thumbnailsUsed);
  };

  const handleGenerateThumbnail = async () => {
    if (getThumbnailsRemaining() <= 0 && !isAdmin) {
      if (!isPremium) {
        setShowPaywall(true);
      } else {
        alert('You\'ve used all your thumbnails for this month. They reset on the 1st!');
      }
      return;
    }

    setIsGeneratingThumbnail(true);
    setGeneratedThumbnail(null);

    try {
      // Get video context from transcription or title
      const videoTitle = titleAndDescription ? titleAndDescription.split('\n')[0] : 'Video content';
      const transcriptSummary = transcription?.text ? transcription.text.substring(0, 500) : '';

      const response = await fetch(API_URL + '/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoTitle,
          videoTopic: videoTitle,
          transcriptSummary,
          style: selectedThumbnailStyle
        }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setGeneratedThumbnail(data.imageUrl);
        
        // Don't count usage for admin accounts
        if (!isAdmin) {
          // Update usage count
          const newCount = thumbnailsUsed + 1;
          setThumbnailsUsed(newCount);
          
          // Set reset date if not set (first of next month)
          let resetDate = thumbnailsResetDate;
          if (!resetDate && isPremium) {
            const now = new Date();
            resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();
            setThumbnailsResetDate(resetDate);
          }
          
          // Save to user metadata
          if (user) {
            await user.update({
              unsafeMetadata: {
                ...user.unsafeMetadata,
                vidboost_thumbnails_used: newCount,
                vidboost_thumbnails_reset: resetDate
              }
            });
          }
        }
      } else {
        // Show specific message for content policy
        if (data.code === 'content_policy') {
          alert('⚠️ This video\'s content triggered AI safety filters.\n\nTry:\n• A different thumbnail style\n• A different video');
        } else {
          alert(data.error || 'Failed to generate thumbnail');
        }
      }
    } catch (err) {
      console.error('Thumbnail error:', err);
      alert('Could not generate thumbnail. Please try again.');
    } finally {
      setIsGeneratingThumbnail(false);
    }
  };

  // Script Writer handler
  const handleGenerateScript = async () => {
    if (!scriptTopic.trim()) {
      alert('Please enter a video topic!');
      return;
    }
    
    setIsGeneratingScript(true);
    setGeneratedScript('');
    
    try {
      const response = await fetch(API_URL + '/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: scriptTopic,
          length: scriptLength,
          style: scriptStyle,
          targetAudience: scriptAudience
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.script) {
        setGeneratedScript(data.script);
      } else {
        alert(data.error || 'Failed to generate script');
      }
    } catch (err) {
      console.error('Script error:', err);
      alert('Could not generate script. Please try again.');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleAnalyze = async () => {
    if (!isSignedIn) {
      alert('Please sign in to analyze videos!');
      return;
    }
    if (usesLeft <= 0 && !isPremium && !isAdmin) {
      setShowLimitReached(true);
      return;
    }
    
    // For competitor analysis, only YouTube URLs are supported
    if (analysisMode === 'competitor') {
      if (!youtubeUrl) {
        alert('Please paste a YouTube URL to analyze a competitor video');
        return;
      }
    } else {
      if (!videoFile && !youtubeUrl) {
        alert('Please upload a video file OR paste a YouTube link');
        return;
      }
    }
    
    if (videoFile && videoFile.size > MAX_FILE_SIZE) {
      setError('File is too large! Maximum size is 25MB. Please use a shorter video or compress it.');
      return;
    }
    setCurrentView('analyzing');
    setError(null);
    try {
      let response;
      
      // Competitor analysis mode
      if (analysisMode === 'competitor') {
        response = await fetch(API_URL + '/api/analyze-competitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: youtubeUrl }),
        });
        
        const data = await response.json();
        if (data.success) {
          setIsCompetitorAnalysis(true);
          setTranscription({ text: data.text });
          setSuccessAnalysis(data.successAnalysis);
          setStructureAnalysis(data.structureAnalysis);
          setTacticsAnalysis(data.tacticsAnalysis);
          setSeoAnalysis(data.seoAnalysis);
          setCompetitorSummary(data.competitorSummary);
          setCurrentView('results');
          
          // Update uses count for free users (competitor analysis counts as a use)
          if (!isPremium && !isAdmin && user) {
            const currentUses = user.unsafeMetadata?.vidboost_uses || 0;
            const newUses = currentUses + 1;
            await user.update({ 
              unsafeMetadata: { 
                ...user.unsafeMetadata, 
                vidboost_uses: newUses 
              } 
            });
            setUsesLeft(FREE_USES - newUses);
          }
        } else {
          setError(data.error || 'Something went wrong');
          setCurrentView('upload');
        }
        return;
      }
      
      // Regular analysis mode (existing code)
      if (videoFile) {
        const formData = new FormData();
        formData.append('video', videoFile);
        response = await fetch(API_URL + '/api/transcribe', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch(API_URL + '/api/transcribe-youtube', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: youtubeUrl }),
        });
      }
      const data = await response.json();
      if (data.success) {
        setIsCompetitorAnalysis(false);
        setTranscription(data);
        setTips(data.tips);
        setTrendingAndIdeas(data.trendingAndIdeas);
        setTitleAndDescription(data.titleAndDescription);
        setHashtags(data.hashtags);
        setVideoScore(data.videoScore);
        setHookAnalysis(data.hookAnalysis);
        setThumbnailText(data.thumbnailText || '');
        setPacingAnalysis(data.pacingAnalysis || '');
        setCtaRecommendations(data.ctaRecommendations || '');
        setPlatformFeedback(data.platformFeedback || '');
        setAudioNotes(data.audioNotes || '');
        setPercentile(data.percentile);
        setTotalVideosAnalyzed(data.totalVideosAnalyzed || 0);
        
        setCurrentView('results');
        
        // Update uses count for free users
        if (!isPremium && !isAdmin && user) {
          const currentUses = user.unsafeMetadata?.vidboost_uses || 0;
          const newUses = currentUses + 1;
          await user.update({ 
            unsafeMetadata: { 
              ...user.unsafeMetadata, 
              vidboost_uses: newUses 
            } 
          });
          setUsesLeft(FREE_USES - newUses);
        }
      } else {
        setError(data.error || 'Something went wrong');
        setCurrentView('upload');
      }
    } catch (err) {
      setError('Could not connect to server. Make sure backend is running!');
      setCurrentView('upload');
    }
  };

  const handleStartOver = () => {
    if (usesLeft <= 0 && !isPremium && !isAdmin) {
      setShowLimitReached(true);
      return;
    }
    setCurrentView('upload');
    setVideoFile(null);
    setYoutubeUrl('');
    setTranscription(null);
    setTips('');
    setTrendingAndIdeas('');
    setTitleAndDescription('');
    setHashtags('');
    setVideoScore('');
    setHookAnalysis('');
    setThumbnailText('');
    setPacingAnalysis('');
    setCtaRecommendations('');
    setPlatformFeedback('');
    setAudioNotes('');
    setPercentile(null);
    setTotalVideosAnalyzed(0);
    // Reset competitor analysis state
    setIsCompetitorAnalysis(false);
    setSuccessAnalysis('');
    setStructureAnalysis('');
    setTacticsAnalysis('');
    setSeoAnalysis('');
    setCompetitorSummary('');
    setAnalysisMode('myVideo');
    // Reset UI state
    setActiveModal(null);
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

  const getScoreNumber = () => {
    const match = videoScore.match(/OVERALL SCORE:\s*(\d+)/i);
    return match ? match[1] : '—';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  // ============================================
  // COMPONENTS
  // ============================================

  const Logo = () => (
    <div className="logo" style={{ cursor: 'default' }}>
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
    <div className="paywall-card paywall-two-tier">
      <h2>⭐ Choose Your Plan</h2>
      <p className="paywall-subtitle">Start with Premium or go Pro for auto-editing features</p>
      
      <div className="tier-toggle">
        <button 
          className={`tier-toggle-btn ${selectedTier === 'premium' ? 'active' : ''}`}
          onClick={() => setSelectedTier('premium')}
        >
          Premium
        </button>
        <button 
          className={`tier-toggle-btn ${selectedTier === 'pro' ? 'active' : ''}`}
          onClick={() => setSelectedTier('pro')}
        >
          Pro 🔥
        </button>
      </div>

      <div className="pricing-tiers">
        {/* Premium Tier */}
        <div className={`tier-card ${selectedTier === 'premium' ? 'selected' : ''}`}>
          <div className="tier-header">
            <h3>Premium</h3>
            <div className="tier-price">$5.99<span>/month</span></div>
            <p className="tier-yearly">or $49/year (save $22.88)</p>
          </div>
          <ul className="tier-features">
            <li>✅ Unlimited video analyses</li>
            <li>✅ AI captions & SRT downloads</li>
            <li>✅ Video scoring & hook analysis</li>
            <li>✅ Thumbnail text suggestions</li>
            <li>✅ Pacing & CTA analysis</li>
            <li>✅ Platform-specific feedback</li>
            <li>✅ Competitor research</li>
            <li>✅ Title & description generator</li>
            <li>✅ 30+ hashtags per video</li>
            <li>✅ 3 AI thumbnails per month</li>
          </ul>
          {selectedTier === 'premium' && (
            <div className="tier-actions">
              <button 
                className={`primary-btn ${!agreedToTerms ? 'btn-disabled' : ''}`} 
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
                Get Premium Yearly (Save $22.88)
              </button>
            </div>
          )}
        </div>

        {/* Pro Tier */}
        <div className={`tier-card pro-tier ${selectedTier === 'pro' ? 'selected' : ''}`}>
          <div className="coming-soon-badge">🚀 Coming Soon</div>
          <div className="tier-header">
            <h3>Pro</h3>
            <div className="tier-price">$14.99<span>/month</span></div>
            <p className="tier-yearly">or $119/year (save $60.88)</p>
          </div>
          <ul className="tier-features">
            <li>✅ Everything in Premium</li>
            <li>⭐ <strong>Auto-Edit Videos</strong></li>
            <li>⭐ <strong>Add AI Captions to Video</strong></li>
            <li>⭐ <strong>Add Hook Text Overlays</strong></li>
            <li>⭐ <strong>Add CTA End Screens</strong></li>
            <li>⭐ <strong>5 Auto-Edits per Month</strong></li>
            <li>🎯 Priority Support</li>
            <li>🎯 Early Access to New Features</li>
          </ul>
          {selectedTier === 'pro' && (
            <div className="tier-actions">
              {!waitlistJoined ? (
                <div className="waitlist-form">
                  <p className="waitlist-text">Be the first to know when Pro launches!</p>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="waitlist-input"
                  />
                  <button className="primary-btn waitlist-btn" onClick={handleJoinWaitlist}>
                    Join Waitlist 🔔
                  </button>
                </div>
              ) : (
                <div className="waitlist-success">
                  <span>🎉</span>
                  <p>You're on the list! We'll email you when Pro launches.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="terms-agreement">
        <label className="checkbox-container">
          <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
          <span className="checkmark"></span>
          <span className="checkbox-text">I have read and agree to the <span className="terms-link" onClick={() => setShowTerms(true)}>Terms of Service</span></span>
        </label>
      </div>
      <button className="secondary-btn" onClick={() => { setShowPaywall(false); setSelectedTier('premium'); setWaitlistJoined(false); setWaitlistEmail(''); }} style={{ marginTop: '10px' }}>← Maybe Later</button>
    </div>
  );

  const ThumbnailModal = () => {
    if (!showThumbnailModal) return null;
    
    const thumbnailStyles = [
      { id: 'youtube', name: '🎬 YouTube Style', desc: 'Bold & eye-catching' },
      { id: 'minimal', name: '✨ Minimal', desc: 'Clean & modern' },
      { id: 'dramatic', name: '🎭 Dramatic', desc: 'Cinematic & moody' },
      { id: 'colorful', name: '🌈 Colorful', desc: 'Bright & fun' },
      { id: 'professional', name: '💼 Professional', desc: 'Corporate & trustworthy' }
    ];
    
    return (
      <div className="result-modal-overlay" onClick={() => setShowThumbnailModal(false)}>
        <div className="thumbnail-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={() => setShowThumbnailModal(false)}>✕</button>
          
          <div className="thumbnail-modal-header">
            <span className="modal-icon">🖼️</span>
            <h2>AI Thumbnail Generator</h2>
            <p className="thumbnails-remaining">
              {isAdmin ? '🔧 Unlimited (Admin)' : `${getThumbnailsRemaining()} ${isPremium ? 'this month' : 'remaining'}`}
            </p>
          </div>
          
          <div className="thumbnail-modal-content">
            {!generatedThumbnail && !isGeneratingThumbnail && (
              <>
                <div className="style-selector">
                  <label>Choose a style:</label>
                  <div className="style-options">
                    {thumbnailStyles.map(style => (
                      <button 
                        key={style.id}
                        className={`style-option ${selectedThumbnailStyle === style.id ? 'selected' : ''}`}
                        onClick={() => setSelectedThumbnailStyle(style.id)}
                      >
                        <span className="style-name">{style.name}</span>
                        <span className="style-desc">{style.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="primary-btn generate-thumb-btn"
                  onClick={handleGenerateThumbnail}
                  disabled={getThumbnailsRemaining() <= 0 && !isAdmin}
                >
                  {isAdmin 
                    ? '🎨 Generate Thumbnail (Admin)'
                    : getThumbnailsRemaining() > 0 
                      ? `🎨 Generate Thumbnail (${getThumbnailsRemaining()} left)`
                      : '🔒 No thumbnails remaining'
                  }
                </button>
                
                {getThumbnailsRemaining() <= 0 && !isPremium && !isAdmin && (
                  <p className="upgrade-hint">Upgrade to Premium for 3 thumbnails/month!</p>
                )}
              </>
            )}
            
            {isGeneratingThumbnail && (
              <div className="generating-thumbnail">
                <div className="loader"></div>
                <h3>Creating your thumbnail...</h3>
                <p>This takes about 15-20 seconds</p>
              </div>
            )}
            
            {generatedThumbnail && !isGeneratingThumbnail && (
              <div className="thumbnail-result">
                <img src={generatedThumbnail} alt="Generated thumbnail" className="generated-thumb-img" />
                <div className="thumbnail-actions">
                  <a 
                    href={generatedThumbnail} 
                    download="vidboost-thumbnail.png" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="primary-btn"
                  >
                    ⬇️ Download Thumbnail
                  </a>
                  <button 
                    className="secondary-btn"
                    onClick={() => setGeneratedThumbnail(null)}
                    disabled={getThumbnailsRemaining() <= 0}
                  >
                    🔄 Generate Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ResultModal = ({ isOpen, onClose, title, icon, content, showCopy, showDownload, copyText }) => {
    if (!isOpen) return null;
    return (
      <div className="result-modal-overlay" onClick={onClose}>
        <div className="result-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
          <div className="modal-header">
            <span className="modal-icon">{icon}</span>
            <h2>{title}</h2>
          </div>
          <div className="modal-content">
            {content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="modal-actions">
            {showCopy && (
              <button className="copy-btn" onClick={() => handleCopyText(copyText || content)}>
                📋 Copy to Clipboard
              </button>
            )}
            {showDownload && (
              <button className="primary-btn" onClick={handleDownloadCaptions}>
                ⬇️ Download Captions (.SRT)
              </button>
            )}
            <button className="secondary-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  // A/B Title Generator Modal
  const TitleModal = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;
    
    // Parse titles and description from content
    const lines = content.split('\n').filter(line => line.trim());
    const titles = [];
    let description = '';
    let inDescription = false;
    
    lines.forEach(line => {
      if (line.startsWith('TITLE 1:') || line.startsWith('TITLE 2:') || line.startsWith('TITLE 3:') || 
          line.startsWith('TITLE 4:') || line.startsWith('TITLE 5:')) {
        titles.push(line.replace(/^TITLE \d:\s*/, '').trim());
      } else if (line.startsWith('DESCRIPTION:')) {
        inDescription = true;
      } else if (inDescription) {
        description += line + '\n';
      }
    });
    
    const copyTitle = (title) => {
      navigator.clipboard.writeText(title);
      alert('✅ Title copied!');
    };
    
    return (
      <div className="result-modal-overlay" onClick={onClose}>
        <div className="result-modal title-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
          <div className="modal-header">
            <span className="modal-icon">🎯</span>
            <h2>A/B Title Options</h2>
            <p className="modal-subtitle">Pick the title that resonates most with your audience!</p>
          </div>
          
          <div className="title-options">
            {titles.map((title, index) => (
              <div key={index} className="title-option">
                <span className="title-number">{index + 1}</span>
                <span className="title-text">{title}</span>
                <button className="title-copy-btn" onClick={() => copyTitle(title)}>📋</button>
              </div>
            ))}
          </div>
          
          {description && (
            <div className="description-section">
              <h3>📝 Optimized Description</h3>
              <div className="description-content">
                {description.split('\n').map((line, i) => line && <p key={i}>{line}</p>)}
              </div>
              <button className="copy-btn" onClick={() => handleCopyText(description)}>
                📋 Copy Description
              </button>
            </div>
          )}
          
          <div className="modal-actions">
            <button className="secondary-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  // Script Writer Modal
  const GridCard = ({ icon, title, subtitle, onClick, highlight }) => (
    <div className={`grid-card ${highlight ? 'grid-card-highlight' : ''}`} onClick={onClick}>
      <span className="grid-card-icon">{icon}</span>
      <h3 className="grid-card-title">{title}</h3>
      {subtitle && <p className="grid-card-subtitle">{subtitle}</p>}
    </div>
  );

  // ============================================
  // LIMIT REACHED VIEW
  // ============================================

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
              <h2>You've Used All 3 Free Analyses!</h2>
              <p className="limit-subtitle">We hope you loved VidBoost! Upgrade to Premium for unlimited analyses.</p>
              <div className="limit-stats">
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Videos Analyzed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">With Premium</span>
                </div>
              </div>
              <div className="limit-options">
                <button className="premium-btn" onClick={() => setShowPaywall(true)}>⭐ Upgrade to Premium - $5.99/month</button>
                <p className="limit-note">One price. All features. No confusing tiers.</p>
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

  // ============================================
  // MAIN RENDER
  // ============================================

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
        {/* UPLOAD VIEW */}
        {currentView === 'upload' && (
          <div className="upload-section">
            <h2>Enhance Your Video with AI</h2>
            <p className="subtitle">Analyze any video — YouTube, TikTok, Reels, or your own content!</p>
            
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
              {/* Mode Toggle */}
              <div className="mode-toggle">
                <button 
                  className={`mode-btn ${analysisMode === 'myVideo' ? 'mode-btn-active' : ''}`}
                  onClick={() => { setAnalysisMode('myVideo'); setVideoFile(null); setYoutubeUrl(''); }}
                >
                  🎬 Analyze My Video
                </button>
                <button 
                  className={`mode-btn ${analysisMode === 'competitor' ? 'mode-btn-active' : ''}`}
                  onClick={() => { setAnalysisMode('competitor'); setVideoFile(null); setYoutubeUrl(''); }}
                >
                  🔍 Competitor Research
                </button>
              </div>

              {analysisMode === 'competitor' && (
                <div className="competitor-info">
                  <p>🔍 <strong>Competitor Research Mode</strong></p>
                  <p>Paste any YouTube video URL to discover what makes it successful and learn winning tactics you can apply!</p>
                </div>
              )}

              <div className="uses-counter">
                <span className="uses-icon">🎁</span>
                <span className="uses-text">{isAdmin ? '🔧 Admin - Unlimited' : isPremium ? '✨ Premium - Unlimited' : `${usesLeft} free analyses left`}</span>
              </div>
              {!isPremium && (
                <button className="go-premium-btn" onClick={handlePremiumClick}>⭐ View Plans - Starting at $5.99/month</button>
              )}
              {error && <div className="error-box">⚠️ {error}</div>}
              
              <div className="input-group">
                <label>🔗 Paste YouTube Link {analysisMode === 'competitor' && '(Competitor Video)'}</label>
                <input type="text" placeholder={analysisMode === 'competitor' ? "https://www.youtube.com/watch?v=COMPETITOR_VIDEO" : "https://www.youtube.com/watch?v=..."} value={youtubeUrl} onChange={handleYoutubeChange} className={youtubeUrl ? 'input-success' : ''} />
                {youtubeUrl && <span className="success-text">✅ YouTube link ready!</span>}
              </div>
              
              {analysisMode === 'myVideo' && (
                <>
                  <div className="divider"><span>OR</span></div>
                  <div className={`upload-box ${videoFile ? 'upload-success' : ''}`}>
                    <input type="file" accept="video/*,audio/*" onChange={handleFileChange} id="video-upload" hidden />
                    <label htmlFor="video-upload" className="upload-label">
                      <span className="upload-icon">📁</span>
                      <span className="upload-text">{videoFile ? '✅ ' + videoFile.name : 'Click to upload any video'}</span>
                      <span className="upload-hint">MP4, MOV, AVI, MP3, WAV (Max 25MB)</span>
                      <span className="platform-support">Works with: TikTok • Instagram Reels • Shorts • Any video!</span>
                    </label>
                  </div>
                </>
              )}
              
              <button className="primary-btn" onClick={handleAnalyze} disabled={analysisMode === 'competitor' ? !youtubeUrl : (!videoFile && !youtubeUrl)}>
                {analysisMode === 'competitor' ? '🔍 Analyze Competitor' : '✨ Analyze with AI'} {!isPremium && `(${usesLeft} left)`}
              </button>
              
              {/* Quick Tools */}
              <div className="quick-tools">
                <p className="quick-tools-label">Quick Tools:</p>
                <button className="tool-btn" onClick={() => setShowScriptModal(true)}>
                  ✍️ Script Writer
                </button>
              </div>
            </SignedIn>
          </div>
        )}

        {/* ANALYZING VIEW */}
        {currentView === 'analyzing' && (
          <div className="analyzing-section">
            <div className="loader"></div>
            <h2>Analyzing Your Video...</h2>
            <p>{youtubeUrl ? 'Downloading from YouTube...' : 'Processing your video...'}</p>
            <p className="analyzing-note">This may take 1-2 minutes</p>
          </div>
        )}

        {/* RESULTS VIEW */}
        {currentView === 'results' && !showPaywall && (
          <div className="results-section">
            {isCompetitorAnalysis ? (
              <>
                <h2>🔍 Competitor Analysis Complete!</h2>
                <p className="results-subtitle">Here's what makes this video successful</p>
                
                {competitorSummary && (
                  <div className="competitor-summary-banner">
                    <span className="summary-icon">📺</span>
                    <span className="summary-text">{competitorSummary}</span>
                  </div>
                )}

                <div className="results-grid competitor-grid">
                  <GridCard icon="🏆" title="Success Factors" subtitle="Why it works" onClick={() => setActiveModal('success')} highlight={true} />
                  <GridCard icon="📋" title="Video Structure" subtitle="Content flow" onClick={() => setActiveModal('structure')} />
                  <GridCard icon="🎯" title="Winning Tactics" subtitle="What to apply" onClick={() => setActiveModal('tactics')} highlight={true} />
                  <GridCard icon="🔎" title="SEO Analysis" subtitle="Keywords & tags" onClick={() => setActiveModal('competitorSeo')} />
                  <GridCard icon="💬" title="Full Transcript" subtitle="What they said" onClick={() => setActiveModal('transcript')} />
                </div>

                <div className="results-actions">
                  <button className="secondary-btn" onClick={handleStartOver}>
                    🔄 Analyze Another Video {!isPremium && `(${usesLeft} left)`}
                  </button>
                  <button className="secondary-btn" onClick={() => { handleStartOver(); setCurrentView('upload'); }} style={{ marginLeft: '10px' }}>
                    🏠 Back to Home
                  </button>
                </div>
                
                <div className="thumbnail-cta">
                  <button className="thumbnail-btn" onClick={() => setShowThumbnailModal(true)}>
                    🖼️ Generate AI Thumbnail ({getThumbnailsRemaining()} left)
                  </button>
                </div>

                {/* Competitor Result Modals */}
                <ResultModal isOpen={activeModal === 'success'} onClose={() => setActiveModal(null)} title="Success Factors" icon="🏆" content={successAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'structure'} onClose={() => setActiveModal(null)} title="Video Structure Breakdown" icon="📋" content={structureAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'tactics'} onClose={() => setActiveModal(null)} title="Winning Tactics" icon="🎯" content={tacticsAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'competitorSeo'} onClose={() => setActiveModal(null)} title="SEO & Discoverability Analysis" icon="🔎" content={seoAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'transcript'} onClose={() => setActiveModal(null)} title="Full Transcript" icon="💬" content={transcription?.text || ''} showCopy={true} />
              </>
            ) : (
              <>
                <h2>🎉 Your AI Analysis is Ready!</h2>
                <p className="results-subtitle">Click any card below to view details</p>
                
                {percentile !== null && (
                  <div className="benchmark-banner">
                    <span className="benchmark-icon">📈</span>
                    <span className="benchmark-text">
                      Your video scored better than <strong>{percentile}%</strong> of analyzed videos!
                    </span>
                    <span className="benchmark-count">({totalVideosAnalyzed} videos analyzed)</span>
                  </div>
                )}

                <div className="results-grid">
                  <GridCard icon="📊" title="Video Score" subtitle={`${getScoreNumber()}/100`} onClick={() => setActiveModal('score')} highlight={true} />
                  <GridCard icon="💬" title="Captions" subtitle="Download SRT" onClick={() => setActiveModal('captions')} />
                  <GridCard icon="💡" title="AI Tips" subtitle="5 improvements" onClick={() => setActiveModal('tips')} />
                  <GridCard icon="🎣" title="Hook Analysis" subtitle="First 3 seconds" onClick={() => setActiveModal('hook')} />
                  <GridCard icon="🖼️" title="Thumbnail Text" subtitle="Click-worthy words" onClick={() => setActiveModal('thumbnail')} />
                  <GridCard icon="⏱️" title="Pacing" subtitle="Flow & retention" onClick={() => setActiveModal('pacing')} />
                  <GridCard icon="📣" title="CTA Scripts" subtitle="Call-to-actions" onClick={() => setActiveModal('cta')} />
                  <GridCard icon="📱" title="Platform Tips" subtitle="Multi-platform" onClick={() => setActiveModal('platform')} />
                  <GridCard icon="🎙️" title="Audio Notes" subtitle="Speech analysis" onClick={() => setActiveModal('audio')} />
                  <GridCard icon="🎯" title="A/B Titles" subtitle="5 title options" onClick={() => setActiveModal('titles')} />
                  <GridCard icon="#️⃣" title="Hashtags" subtitle="30+ tags" onClick={() => setActiveModal('hashtags')} />
                  <GridCard icon="🔥" title="Trending Ideas" subtitle="Video concepts" onClick={() => setActiveModal('trending')} />
                </div>

                <div className="results-actions">
                  <button className="secondary-btn" onClick={handleStartOver}>
                    🔄 Analyze Another Video {!isPremium && `(${usesLeft} left)`}
                  </button>
                  <button className="secondary-btn" onClick={() => { handleStartOver(); setCurrentView('upload'); }} style={{ marginLeft: '10px' }}>
                    🏠 Back to Home
                  </button>
                </div>
                
                <div className="thumbnail-cta">
                  <button className="thumbnail-btn" onClick={() => setShowThumbnailModal(true)}>
                    🖼️ Generate AI Thumbnail ({getThumbnailsRemaining()} left)
                  </button>
                </div>
                
                {!isPremium && (
                  <div className="upgrade-prompt">
                    <p>💡 Enjoying VidBoost? <span className="upgrade-link" onClick={handlePremiumClick}>Upgrade to Premium</span> for unlimited analyses!</p>
                  </div>
                )}

                {/* Result Modals */}
                <ResultModal isOpen={activeModal === 'score'} onClose={() => setActiveModal(null)} title="Video Score" icon="📊" content={videoScore} showCopy={true} />
                <ResultModal isOpen={activeModal === 'captions'} onClose={() => setActiveModal(null)} title="AI-Generated Captions" icon="💬" content={transcription?.text || ''} showCopy={true} showDownload={true} />
                <ResultModal isOpen={activeModal === 'tips'} onClose={() => setActiveModal(null)} title="AI Tips to Improve Your Video" icon="💡" content={tips} showCopy={true} />
                <ResultModal isOpen={activeModal === 'hook'} onClose={() => setActiveModal(null)} title="Hook Analysis" icon="🎣" content={hookAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'thumbnail'} onClose={() => setActiveModal(null)} title="Thumbnail Text Suggestions" icon="🖼️" content={thumbnailText} showCopy={true} />
                <ResultModal isOpen={activeModal === 'pacing'} onClose={() => setActiveModal(null)} title="Pacing Analysis" icon="⏱️" content={pacingAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'cta'} onClose={() => setActiveModal(null)} title="Call-to-Action Recommendations" icon="📣" content={ctaRecommendations} showCopy={true} />
                <ResultModal isOpen={activeModal === 'platform'} onClose={() => setActiveModal(null)} title="Platform-Specific Feedback" icon="📱" content={platformFeedback} showCopy={true} />
                <ResultModal isOpen={activeModal === 'audio'} onClose={() => setActiveModal(null)} title="Audio & Speech Notes" icon="🎙️" content={audioNotes} showCopy={true} />
                <TitleModal isOpen={activeModal === 'titles'} onClose={() => setActiveModal(null)} content={titleAndDescription} />
                <ResultModal isOpen={activeModal === 'hashtags'} onClose={() => setActiveModal(null)} title="Hashtag Generator" icon="#️⃣" content={hashtags} showCopy={true} />
                <ResultModal isOpen={activeModal === 'trending'} onClose={() => setActiveModal(null)} title="Trending Topics & Video Ideas" icon="🔥" content={trendingAndIdeas} showCopy={true} />
              </>
            )}
          </div>
        )}

        {showPaywall && (
          <div className="paywall-section">
            <PaywallContent />
          </div>
        )}
        {showTerms && <TermsModal />}
        <ThumbnailModal />
        {showScriptModal && (
          <div className="result-modal-overlay" onClick={() => setShowScriptModal(false)}>
            <div className="result-modal script-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setShowScriptModal(false)}>✕</button>
              
              <div className="modal-header">
                <span className="modal-icon">✍️</span>
                <h2>AI Script Writer</h2>
                <p className="modal-subtitle">Generate a complete video script in seconds!</p>
              </div>
              
              {!generatedScript && !isGeneratingScript && (
                <div className="script-form">
                  <div className="script-input-group">
                    <label>📝 Video Topic *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., How to start a YouTube channel in 2025"
                      value={scriptTopic}
                      onChange={(e) => setScriptTopic(e.target.value)}
                      className="script-topic-input"
                    />
                  </div>
                  
                  <div className="script-input-group">
                    <label>⏱️ Video Length</label>
                    <div className="script-options">
                      {[
                        { id: 'short', label: '⚡ Short', desc: '1-2 min' },
                        { id: 'medium', label: '📹 Medium', desc: '5-7 min' },
                        { id: 'long', label: '🎬 Long', desc: '10-15 min' }
                      ].map(opt => (
                        <button 
                          key={opt.id}
                          className={`script-option ${scriptLength === opt.id ? 'selected' : ''}`}
                          onClick={() => setScriptLength(opt.id)}
                        >
                          <span className="opt-label">{opt.label}</span>
                          <span className="opt-desc">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="script-input-group">
                    <label>🎨 Content Style</label>
                    <div className="script-options style-options-grid">
                      {[
                        { id: 'educational', label: '📚 Educational', desc: 'Teach & inform' },
                        { id: 'entertaining', label: '🎉 Entertaining', desc: 'Fun & engaging' },
                        { id: 'storytelling', label: '📖 Storytelling', desc: 'Narrative-driven' },
                        { id: 'tutorial', label: '🛠️ Tutorial', desc: 'Step-by-step' },
                        { id: 'motivational', label: '🔥 Motivational', desc: 'Inspire action' }
                      ].map(opt => (
                        <button 
                          key={opt.id}
                          className={`script-option ${scriptStyle === opt.id ? 'selected' : ''}`}
                          onClick={() => setScriptStyle(opt.id)}
                        >
                          <span className="opt-label">{opt.label}</span>
                          <span className="opt-desc">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="script-input-group">
                    <label>👥 Target Audience (optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Beginners, small business owners, teens"
                      value={scriptAudience}
                      onChange={(e) => setScriptAudience(e.target.value)}
                      className="script-topic-input"
                    />
                  </div>
                  
                  <button 
                    className="primary-btn generate-script-btn"
                    onClick={handleGenerateScript}
                    disabled={!scriptTopic.trim()}
                  >
                    ✨ Generate Script
                  </button>
                </div>
              )}
              
              {isGeneratingScript && (
                <div className="script-loading">
                  <div className="loader"></div>
                  <p>Writing your script...</p>
                  <p className="loading-hint">This takes about 15-30 seconds</p>
                </div>
              )}
              
              {generatedScript && !isGeneratingScript && (
                <div className="script-result">
                  <div className="script-content">
                    {generatedScript.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <div className="script-actions">
                    <button className="copy-btn" onClick={() => handleCopyText(generatedScript)}>
                      📋 Copy Script
                    </button>
                    <button className="secondary-btn" onClick={() => {
                      setGeneratedScript('');
                      setScriptTopic('');
                    }}>
                      ✍️ Write Another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      {/* Support Modal */}
      {showSupportModal && (
        <div className="result-modal-overlay" onClick={() => { setShowSupportModal(false); setSupportSubmitted(false); }}>
          <div className="result-modal support-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => { setShowSupportModal(false); setSupportSubmitted(false); }}>✕</button>
            
            <div className="modal-header">
              <span className="modal-icon">💬</span>
              <h2>VidBoost Support</h2>
              <p className="modal-subtitle">We're here to help!</p>
            </div>
            
            {!supportSubmitted ? (
              <form 
                action="https://formspree.io/f/manrdeov"
                method="POST"
                onSubmit={() => setSupportSubmitted(true)}
                className="support-form"
              >
                <div className="script-input-group">
                  <label>📧 Your Email</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="your@email.com"
                    defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
                    required
                    className="script-topic-input"
                  />
                </div>
                
                <div className="script-input-group">
                  <label>📋 Issue Type</label>
                  <select name="issue_type" className="script-topic-input" required>
                    <option value="">Select an issue type...</option>
                    <option value="bug">Bug / Something's not working</option>
                    <option value="feature">Feature request</option>
                    <option value="billing">Billing question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="script-input-group">
                  <label>📝 Describe Your Issue</label>
                  <textarea 
                    name="message"
                    placeholder="Please describe what happened or what you need help with..."
                    rows="5"
                    required
                    className="script-topic-input"
                    style={{ resize: 'vertical', minHeight: '100px' }}
                  />
                </div>
                
                <button type="submit" className="primary-btn generate-script-btn">
                  📤 Send Message
                </button>
              </form>
            ) : (
              <div className="support-success">
                <div className="success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you as soon as possible.</p>
                <button 
                  className="secondary-btn" 
                  onClick={() => { setShowSupportModal(false); setSupportSubmitted(false); }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Founding Member Popup */}
      {showFoundingPopup && (
        <div className="result-modal-overlay" onClick={() => setShowFoundingPopup(false)}>
          <div className="result-modal founding-popup" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowFoundingPopup(false)}>✕</button>
            
            <div className="modal-header">
              <span className="modal-icon">🚀</span>
              <h2>Limited Time: Founding Member Pricing</h2>
            </div>
            
            <div className="founding-content">
              <div className="founding-price">
                <span className="price-amount">$5.99</span>
                <span className="price-period">/month</span>
              </div>
              
              <p className="founding-message">
                Your rate stays locked in. Price increase coming in 2026 for new members. Secure your discount now.
              </p>
              
              <button 
                className="primary-btn founding-cta"
                onClick={() => {
                  setShowFoundingPopup(false);
                  setShowPaywall(true);
                }}
              >
                🔒 Lock In My Price
              </button>
              
              <p className="founding-thanks">Thank you for being an early supporter!</p>
            </div>
          </div>
        </div>
      )}
      
      <footer className="footer">
        <p>VidBoost © 2024 | <span className="terms-link" onClick={() => setShowTerms(true)}>Terms of Service</span> | <span className="terms-link" onClick={() => setShowSupportModal(true)}>Contact Us</span></p>
      </footer>
    </div>
  );
}

export default App;
