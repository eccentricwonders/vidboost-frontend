import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import './App.css';
import * as analytics from './analytics';

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
  const [showPrivacy, setShowPrivacy] = useState(false);
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
  
  // Trending videos state
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [trendingCategory, setTrendingCategory] = useState('all');
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [showTrendingSection, setShowTrendingSection] = useState(false);
  
  // Niche Trend Detector state
  const [showNicheTrends, setShowNicheTrends] = useState(false);
  const [selectedNiche, setSelectedNiche] = useState('');
  const [customNiche, setCustomNiche] = useState('');
  const [nicheTrendData, setNicheTrendData] = useState(null);
  const [isNicheTrendsLoading, setIsNicheTrendsLoading] = useState(false);
  
  // Hardship request state
  const [showHardshipModal, setShowHardshipModal] = useState(false);
  const [hardshipReason, setHardshipReason] = useState('');
  const [hardshipAnalysesRequested, setHardshipAnalysesRequested] = useState('1');
  const [hardshipSubmitted, setHardshipSubmitted] = useState(false);

  const MAX_FILE_SIZE = 25 * 1024 * 1024;
  const FREE_USES = 3;
  const PREMIUM_MONTHLY_LIMIT = 50;
  
  // Premium monthly tracking state
  const [premiumMonthlyUses, setPremiumMonthlyUses] = useState(0);
  const [premiumResetDate, setPremiumResetDate] = useState(null);
  const [showPremiumLimitReached, setShowPremiumLimitReached] = useState(false);
  
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
      const jsmgaxUses = user.unsafeMetadata?.jsmgax_uses || 0;
      const jsmgaxPremium = user.unsafeMetadata?.jsmgax_premium || false;
      const jsmgaxThumbnails = user.unsafeMetadata?.jsmgax_thumbnails_used || 0;
      const jsmgaxThumbReset = user.unsafeMetadata?.jsmgax_thumbnails_reset || null;
      const jsmgaxNotified = user.unsafeMetadata?.jsmgax_notified || false;
      const jsmgaxPremiumUses = user.unsafeMetadata?.jsmgax_premium_monthly_uses || 0;
      const jsmgaxPremiumReset = user.unsafeMetadata?.jsmgax_premium_reset_date || null;
      
      // Check if admin
      const userEmail = user.primaryEmailAddress?.emailAddress?.toLowerCase();
      const userIsAdmin = ADMIN_EMAILS.includes(userEmail);
      
      // Notify on new signup (first time user)
      if (!jsmgaxNotified && !userIsAdmin) {
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
            jsmgax_notified: true
          }
        });
      }
      
      // Admin gets unlimited, others get normal count
      setUsesLeft(userIsAdmin ? 999 : FREE_USES - jsmgaxUses);
      setIsPremium(jsmgaxPremium);
      
      // Check if we need to reset monthly thumbnail count
      const now = new Date();
      const resetDate = jsmgaxThumbReset ? new Date(jsmgaxThumbReset) : null;
      if (resetDate && now > resetDate) {
        // Reset thumbnail count for new month
        setThumbnailsUsed(0);
        const nextReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        setThumbnailsResetDate(nextReset.toISOString());
        user.update({ 
          unsafeMetadata: { 
            ...user.unsafeMetadata, 
            jsmgax_thumbnails_used: 0,
            jsmgax_thumbnails_reset: nextReset.toISOString()
          } 
        });
      } else {
        setThumbnailsUsed(jsmgaxThumbnails);
        setThumbnailsResetDate(jsmgaxThumbReset);
      }
      
      // Check if we need to reset premium monthly analysis count
      const premiumResetDateObj = jsmgaxPremiumReset ? new Date(jsmgaxPremiumReset) : null;
      if (jsmgaxPremium && premiumResetDateObj && now > premiumResetDateObj) {
        // Reset premium analysis count for new month
        setPremiumMonthlyUses(0);
        const nextPremiumReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        setPremiumResetDate(nextPremiumReset.toISOString());
        user.update({ 
          unsafeMetadata: { 
            ...user.unsafeMetadata, 
            jsmgax_premium_monthly_uses: 0,
            jsmgax_premium_reset_date: nextPremiumReset.toISOString()
          } 
        });
      } else if (jsmgaxPremium) {
        setPremiumMonthlyUses(jsmgaxPremiumUses);
        setPremiumResetDate(jsmgaxPremiumReset);
        // Set reset date if not set (first premium user)
        if (!jsmgaxPremiumReset) {
          const nextPremiumReset = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          setPremiumResetDate(nextPremiumReset.toISOString());
          user.update({ 
            unsafeMetadata: { 
              ...user.unsafeMetadata, 
              jsmgax_premium_reset_date: nextPremiumReset.toISOString()
            } 
          });
        }
      }
      
      if (jsmgaxUses >= FREE_USES && !jsmgaxPremium) {
        setShowLimitReached(true);
      }
    }
    
    // Handle Stripe success redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true' && isSignedIn && user) {
      user.update({ unsafeMetadata: { ...user.unsafeMetadata, jsmgax_premium: true } });
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

  // Show founding member popup when user runs out of free analyses
  useEffect(() => {
    if (isSignedIn && !isPremium && !isAdmin && usesLeft === 0) {
      const hasSeenPopup = sessionStorage.getItem('jsmgax_founding_popup_seen');
      if (!hasSeenPopup) {
        // Delay popup by 1 second after they see 0 uses left
        const timer = setTimeout(() => {
          setShowFoundingPopup(true);
          sessionStorage.setItem('jsmgax_founding_popup_seen', 'true');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isSignedIn, isPremium, isAdmin, usesLeft]);

  // Fetch trending videos
  const fetchTrendingVideos = async (category = 'all') => {
    setIsTrendingLoading(true);
    try {
      const url = category === 'all' 
        ? `${API_URL}/api/trending`
        : `${API_URL}/api/trending?category=${category}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setTrendingVideos(data.videos);
      }
    } catch (error) {
      console.error('Failed to fetch trending videos:', error);
    }
    setIsTrendingLoading(false);
  };

  // Load trending videos when section is opened
  useEffect(() => {
    if (showTrendingSection && trendingVideos.length === 0) {
      fetchTrendingVideos();
    }
  }, [showTrendingSection]);

  // Handle hardship request submission
  const handleHardshipRequest = async () => {
    if (!hardshipReason.trim()) {
      alert('Please explain your situation so we can help you.');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/hardship-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user?.primaryEmailAddress?.emailAddress || 'unknown',
          userName: user?.fullName || 'Unknown User',
          usesLeft: usesLeft,
          reason: hardshipReason,
          analysesRequested: hardshipAnalysesRequested
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setHardshipSubmitted(true);
        setTimeout(() => {
          setShowHardshipModal(false);
          setHardshipSubmitted(false);
          setHardshipReason('');
          setHardshipAnalysesRequested('1');
        }, 3000);
      } else {
        alert('Failed to submit request. Please try again or email us directly.');
      }
    } catch (error) {
      console.error('Hardship request error:', error);
      alert('Failed to submit request. Please email us at contact.jsmgax@gmail.com');
    }
  };

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
                jsmgax_thumbnails_used: newCount,
                jsmgax_thumbnails_reset: resetDate
              }
            });
          }
        }
      } else {
        // Show specific message for content policy
        if (data.code === 'content_policy') {
          alert('This video\'s content triggered AI safety filters.\n\nTry:\n• A different thumbnail style\n• A different video');
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
    
    // Check premium monthly limit
    if (isPremium && !isAdmin && premiumMonthlyUses >= PREMIUM_MONTHLY_LIMIT) {
      setShowPremiumLimitReached(true);
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
    
    // Track analysis start
    analytics.trackAnalysisStart(analysisMode === 'competitor' ? 'competitor' : 'my_video');
    
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
          
          // Track successful analysis
          analytics.trackAnalysisComplete('competitor');
          
          // Update uses count for free users (competitor analysis counts as a use)
          if (!isPremium && !isAdmin && user) {
            const currentUses = user.unsafeMetadata?.jsmgax_uses || 0;
            const newUses = currentUses + 1;
            await user.update({ 
              unsafeMetadata: { 
                ...user.unsafeMetadata, 
                jsmgax_uses: newUses 
              } 
            });
            setUsesLeft(FREE_USES - newUses);
          }
          
          // Update monthly uses for premium users
          if (isPremium && !isAdmin && user) {
            const currentMonthlyUses = user.unsafeMetadata?.jsmgax_premium_monthly_uses || 0;
            const newMonthlyUses = currentMonthlyUses + 1;
            await user.update({ 
              unsafeMetadata: { 
                ...user.unsafeMetadata, 
                jsmgax_premium_monthly_uses: newMonthlyUses 
              } 
            });
            setPremiumMonthlyUses(newMonthlyUses);
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
        
        // Track successful analysis
        analytics.trackAnalysisComplete('my_video');
        
        // Update uses count for free users
        if (!isPremium && !isAdmin && user) {
          const currentUses = user.unsafeMetadata?.jsmgax_uses || 0;
          const newUses = currentUses + 1;
          await user.update({ 
            unsafeMetadata: { 
              ...user.unsafeMetadata, 
              jsmgax_uses: newUses 
            } 
          });
          setUsesLeft(FREE_USES - newUses);
        }
        
        // Update monthly uses for premium users
        if (isPremium && !isAdmin && user) {
          const currentMonthlyUses = user.unsafeMetadata?.jsmgax_premium_monthly_uses || 0;
          const newMonthlyUses = currentMonthlyUses + 1;
          await user.update({ 
            unsafeMetadata: { 
              ...user.unsafeMetadata, 
              jsmgax_premium_monthly_uses: newMonthlyUses 
            } 
          });
          setPremiumMonthlyUses(newMonthlyUses);
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
    <Link to="/" className="logo" style={{ cursor: 'pointer' }}>
      <img 
        src="/logo-header.png" 
        alt="JSMGAX" 
        className="logo-image"
      />
    </Link>
  );

  const TermsModal = () => (
    <div className="terms-overlay">
      <div className="terms-modal">
        <h2>Terms of Service</h2>
        <div className="terms-content">
          <p className="terms-updated">Last Updated: December 9, 2025</p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using JSMGAX ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.</p>
          
          <h3>2. Service Description</h3>
          <p>JSMGAX is an AI-powered video analysis tool designed for <strong>educational and analytical purposes</strong>. The Service helps content creators improve their videos through AI-generated feedback, suggestions, and insights.</p>
          
          <h3>3. Video Rights & Permitted Use</h3>
          <p><strong>You represent and warrant that:</strong></p>
          <ul>
            <li>You own or have the necessary rights, licenses, and permissions to submit any video you upload or link to</li>
            <li>When analyzing YouTube or other third-party videos, you are doing so for legitimate educational, research, or competitive analysis purposes</li>
            <li>You will not use the Service to infringe on any third party's intellectual property rights</li>
          </ul>
          <p>JSMGAX is intended for analyzing your own content or publicly available content for educational and analytical purposes only. <strong>Users are solely responsible for ensuring they have the right to analyze any video they submit.</strong></p>
          
          <h3>4. AI-Powered Service Disclaimer</h3>
          <p>JSMGAX uses artificial intelligence to analyze videos and generate content. AI technology, while advanced, is not perfect and may produce errors, inaccuracies, or unexpected results. <strong>All AI-generated content is provided for informational purposes only and should be reviewed before use.</strong> We make no guarantees about the accuracy, completeness, or usefulness of any AI-generated content.</p>
          
          <h3>5. Age Requirement</h3>
          <p>You must be at least 18 years old to use JSMGAX. By using this Service, you confirm that you meet this requirement. If you are under 18, you must have permission from a parent or legal guardian who agrees to be bound by these terms.</p>
          
          <h3>6. Prohibited Use</h3>
          <p>You agree NOT to use JSMGAX for:</p>
          <ul>
            <li>Any illegal, harmful, fraudulent, or offensive purposes</li>
            <li>Infringing on copyrights, trademarks, or other intellectual property rights</li>
            <li>Content that violates any person's privacy or publicity rights</li>
            <li>Spam, malware, phishing, or any malicious activities</li>
            <li>Any content involving minors in inappropriate contexts</li>
            <li>Circumventing any access controls or usage limits</li>
            <li>Reselling, redistributing, or commercially exploiting the Service without permission</li>
          </ul>
          <p>Violation of these terms may result in immediate account termination without refund.</p>
          
          <h3>7. Subscription, Payment & Refunds</h3>
          <p>Premium subscriptions are billed monthly or yearly through Stripe. You may cancel at any time, and you will retain access until the end of your billing period. <strong>All payments are final. No refunds will be issued</strong> for partial months, unused time, dissatisfaction with AI results, or any other reason. By subscribing, you acknowledge and accept this no-refund policy.</p>
          
          <h3>8. Payment Security</h3>
          <p>All payments are processed securely through Stripe, a PCI-compliant payment processor. <strong>JSMGAX does not store, access, or have visibility to your payment card information.</strong> Your payment details are handled entirely by Stripe.</p>
          
          <h3>9. Disclaimer of Warranties</h3>
          <p><strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</strong> We disclaim all warranties including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, secure, or free of viruses or other harmful components.</p>
          
          <h3>10. Limitation of Liability</h3>
          <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, JSMGAX AND ITS OWNERS, OPERATORS, EMPLOYEES, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</strong>, including but not limited to: loss of profits, revenue, data, or business opportunities; inaccurate AI-generated content; decisions made based on the Service; or any other damages arising from your use of or inability to use the Service. Our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim.</p>
          
          <h3>11. Indemnification</h3>
          <p><strong>You agree to indemnify, defend, and hold harmless JSMGAX and its owners, operators, employees, and affiliates</strong> from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorney's fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third party's rights, including intellectual property rights; (d) any content you submit to the Service; or (e) your violation of any applicable laws or regulations.</p>
          
          <h3>12. Content Responsibility</h3>
          <p>You are solely responsible for the videos you submit and how you use any AI-generated content. JSMGAX does not claim ownership of your content. Videos are processed temporarily and <strong>immediately deleted after analysis</strong> — we do not store your video content.</p>
          
          <h3>13. Service Availability & Modifications</h3>
          <p>We do not guarantee uptime or availability. The Service may experience downtime for maintenance, updates, or technical issues. We reserve the right to modify, suspend, or discontinue any features at any time without notice. We are not liable for any losses caused by service interruptions or changes.</p>
          
          <h3>14. Account Termination</h3>
          <p>We reserve the right to suspend or terminate your account at any time, for any reason, including violation of these terms, without notice and without refund.</p>
          
          <h3>15. Dispute Resolution & Arbitration</h3>
          <p>Any dispute arising from these Terms or your use of the Service shall be resolved through <strong>binding arbitration</strong> rather than in court, except for claims that qualify for small claims court. You agree to waive your right to a jury trial and to participate in a class action lawsuit. Arbitration shall be conducted in accordance with the rules of the American Arbitration Association.</p>
          
          <h3>16. Governing Law</h3>
          <p>These Terms shall be governed by and construed in accordance with the laws of the United States and the State of Oklahoma, without regard to conflict of law principles.</p>
          
          <h3>17. Severability</h3>
          <p>If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
          
          <h3>18. Entire Agreement</h3>
          <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and JSMGAX regarding your use of the Service.</p>
          
          <h3>19. Contact</h3>
          <p>Questions about these Terms? Contact us at: <strong>contact.jsmgax@gmail.com</strong></p>
        </div>
        <button className="primary-btn" onClick={() => setShowTerms(false)}>I Understand & Agree</button>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="terms-overlay">
      <div className="terms-modal privacy-modal">
        <h2>Privacy Policy</h2>
        <div className="terms-content">
          <p className="terms-updated">Last Updated: December 9, 2025</p>
          
          <div className="privacy-highlight">
            <p><strong>The Short Version:</strong> We collect minimal data, we don't store your videos, and we NEVER sell your information to anyone. Period.</p>
          </div>
          
          <h3>1. Information We Collect</h3>
          <p><strong>What we store:</strong></p>
          <ul>
            <li>Email address — to identify your account</li>
            <li>Name — for your profile</li>
            <li>Profile picture — only if you sign in with Google</li>
            <li>Analysis count — to track free tier usage</li>
            <li>Premium status — to know if you're subscribed</li>
            <li>Thumbnail usage — to track monthly limits</li>
          </ul>
          
          <p><strong>What we DO NOT store:</strong></p>
          <ul>
            <li>Your videos — deleted immediately after analysis</li>
            <li>Transcriptions — generated, shown to you, then discarded</li>
            <li>Analysis results — displayed but never saved</li>
            <li>Credit card info — Stripe handles all payments, we never see it</li>
            <li>Browsing history — we don't track you</li>
          </ul>
          
          <h3>2. We Do NOT Sell Your Information</h3>
          <p><strong>Let's be crystal clear:</strong> We do NOT sell, rent, trade, or share your personal information with third parties for marketing or advertising purposes. Ever. Your data is yours. This applies to all users worldwide.</p>
          
          <h3>3. How We Use Your Information</h3>
          <p>We use your information solely to:</p>
          <ul>
            <li>Provide and operate the JSMGAX service</li>
            <li>Process your payments through Stripe</li>
            <li>Track your usage limits and subscription status</li>
            <li>Respond to support requests</li>
            <li>Send important service-related communications (not marketing)</li>
          </ul>
          
          <h3>4. Third-Party Services</h3>
          <p>We use trusted, industry-standard services:</p>
          <ul>
            <li><strong>Clerk</strong> — Authentication (handles login/signup securely)</li>
            <li><strong>Stripe</strong> — Payment processing (PCI-compliant, we never see your card)</li>
            <li><strong>OpenAI</strong> — AI analysis (video content is processed but not stored per their API policy)</li>
            <li><strong>Railway/Vercel</strong> — Hosting infrastructure</li>
          </ul>
          <p>Each service has their own privacy policy. We only share the minimum data necessary for these services to function.</p>
          
          <h3>5. Video Content Processing</h3>
          <p>When you upload a video or paste a YouTube link:</p>
          <ol>
            <li>We receive the video temporarily on our secure servers</li>
            <li>We extract audio and process it through AI</li>
            <li>We generate and display your analysis results</li>
            <li><strong>We immediately and permanently delete the video file</strong></li>
          </ol>
          <p>Your video content is never stored, saved, shared, or used for any purpose other than providing you with analysis results.</p>
          
          <h3>6. Data Security</h3>
          <p>We implement appropriate security measures including:</p>
          <ul>
            <li>HTTPS/SSL encryption for all data transmission</li>
            <li>Secure authentication through Clerk</li>
            <li>PCI-compliant payment processing through Stripe</li>
            <li>Immediate deletion of video files after processing</li>
          </ul>
          
          <h3>7. Data Retention</h3>
          <ul>
            <li><strong>Account data:</strong> Retained while your account is active</li>
            <li><strong>Video content:</strong> Deleted immediately after analysis (not retained)</li>
            <li><strong>Payment records:</strong> Maintained by Stripe per their policies</li>
          </ul>
          <p>You may request deletion of your account and all associated data at any time.</p>
          
          <h3>8. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> — Request a copy of your personal data</li>
            <li><strong>Rectification</strong> — Correct inaccurate personal data</li>
            <li><strong>Erasure</strong> — Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Data Portability</strong> — Receive your data in a portable format</li>
            <li><strong>Object</strong> — Object to certain processing of your data</li>
            <li><strong>Withdraw Consent</strong> — Withdraw consent at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us at: contact.jsmgax@gmail.com</p>
          
          <h3>9. For European Union (EU) Users — GDPR</h3>
          <p>If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):</p>
          <ul>
            <li>All rights listed in Section 8 above</li>
            <li>Right to lodge a complaint with a supervisory authority</li>
            <li>Right to restrict processing</li>
          </ul>
          <p>Our legal basis for processing your data is: (a) your consent; (b) performance of our contract with you; and (c) our legitimate business interests.</p>
          
          <h3>10. For California Residents — CCPA</h3>
          <p>Under the California Consumer Privacy Act (CCPA), California residents have the right to:</p>
          <ul>
            <li>Know what personal information is collected</li>
            <li>Know whether personal information is sold or disclosed and to whom</li>
            <li>Say no to the sale of personal information (we don't sell your data)</li>
            <li>Access your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Equal service and price, even if you exercise your privacy rights</li>
          </ul>
          
          <h3>11. Children's Privacy</h3>
          <p>JSMGAX is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately and we will delete it.</p>
          
          <h3>12. Cookies</h3>
          <p>We use only essential cookies necessary for:</p>
          <ul>
            <li>Keeping you logged in (session management)</li>
            <li>Remembering your preferences</li>
          </ul>
          <p>We do NOT use advertising cookies, tracking cookies, or analytics cookies that follow you around the web.</p>
          
          <h3>13. International Data Transfers</h3>
          <p>JSMGAX is operated from the United States. If you are accessing from outside the US, your information may be transferred to, stored, and processed in the United States. By using JSMGAX, you consent to this transfer. We ensure appropriate safeguards are in place for international data transfers.</p>
          
          <h3>14. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email. Your continued use after changes constitutes acceptance of the updated policy.</p>
          
          <h3>15. Contact Us</h3>
          <p>For privacy-related questions or to exercise your rights:</p>
          <p><strong>Email:</strong> contact.jsmgax@gmail.com</p>
          
          <div className="privacy-highlight">
            <p><strong>Summary:</strong> Minimal data collection Videos deleted immediately We NEVER sell your info Full GDPR & CCPA compliance Delete your account anytime</p>
          </div>
        </div>
        <button className="primary-btn" onClick={() => setShowPrivacy(false)}>I Understand</button>
      </div>
    </div>
  );

  const PaywallContent = () => (
    <div className="paywall-card paywall-two-tier">
      <h2>Choose Your Plan</h2>
      <p className="paywall-subtitle">Start with Premium or go Pro for auto-editing features</p>
      
      <div className="pricing-tiers">
        {/* Premium Tier */}
        <div className={`tier-card ${selectedTier === 'premium' ? 'selected' : ''}`}>
          <div className="tier-header">
            <h3>Premium</h3>
            <div className="tier-price">$5.99<span>/month</span></div>
            <p className="tier-yearly">or $55/year (save $16.88)</p>
          </div>
          <ul className="tier-features">
            <li>50 analyses per month (your videos + competitors)</li>
            <li>AI captions & SRT downloads</li>
            <li>Video scoring & hook analysis</li>
            <li>Thumbnail text suggestions</li>
            <li>Pacing & CTA analysis</li>
            <li>Platform-specific feedback</li>
            <li>Competitor research</li>
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
                Get Premium Yearly (Save $22.88)
              </button>
            </div>
          )}
        </div>

        {/* Pro Tier */}
        <div className={`tier-card pro-tier ${selectedTier === 'pro' ? 'selected' : ''}`}>
          <div className="coming-soon-badge">Coming Soon</div>
          <div className="tier-header">
            <h3>Pro</h3>
            <div className="tier-price">$16.99<span>/month</span></div>
            <p className="tier-yearly">or $183/year (save $20.88)</p>
          </div>
          <ul className="tier-features">
            <li><strong>Unlimited video analyses</strong></li>
            <li>Everything in Premium</li>
            <li><strong>Auto-Edit Videos</strong></li>
            <li><strong>Add AI Captions to Video</strong></li>
            <li><strong>Add Hook Text Overlays</strong></li>
            <li><strong>Add CTA End Screens</strong></li>
            <li><strong>5 Auto-Edits per Month</strong></li>
            <li>Priority Support</li>
            <li>Early Access to New Features</li>
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
                    Join Waitlist 
                  </button>
                </div>
              ) : (
                <div className="waitlist-success">
                  <span></span>
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
          <span className="checkbox-text">I have read and agree to the <Link to="/terms" className="terms-link" target="_blank">Terms of Service</Link> <span className="checkbox-note">(must check box to select price plan)</span></span>
        </label>
      </div>
      <button className="secondary-btn" onClick={() => { setShowPaywall(false); setSelectedTier('premium'); setWaitlistJoined(false); setWaitlistEmail(''); }} style={{ marginTop: '10px' }}>← Maybe Later</button>
    </div>
  );

  const ThumbnailModal = () => {
    if (!showThumbnailModal) return null;
    
    const thumbnailStyles = [
      { id: 'youtube', name: 'YouTube Style', desc: 'Bold & eye-catching' },
      { id: 'minimal', name: 'Minimal', desc: 'Clean & modern' },
      { id: 'dramatic', name: 'Dramatic', desc: 'Cinematic & moody' },
      { id: 'colorful', name: 'Colorful', desc: 'Bright & fun' },
      { id: 'professional', name: 'Professional', desc: 'Corporate & trustworthy' }
    ];
    
    return (
      <div className="result-modal-overlay" onClick={() => setShowThumbnailModal(false)}>
        <div className="thumbnail-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={() => setShowThumbnailModal(false)}></button>
          
          <div className="thumbnail-modal-header">
            <span className="modal-icon"></span>
            <h2>AI Thumbnail Generator</h2>
            <p className="thumbnails-remaining">
              {isAdmin ? 'Unlimited (Admin)' : `${getThumbnailsRemaining()} ${isPremium ? 'this month' : 'remaining'}`}
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
                    ? 'Generate Thumbnail (Admin)'
                    : getThumbnailsRemaining() > 0 
                      ? `Generate Thumbnail (${getThumbnailsRemaining()} left)`
                      : 'No thumbnails remaining'
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
                    download="jsmgax-thumbnail.png" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="primary-btn"
                  >
                    Download Thumbnail
                  </a>
                  <button 
                    className="secondary-btn"
                    onClick={() => setGeneratedThumbnail(null)}
                    disabled={getThumbnailsRemaining() <= 0}
                  >
                    Generate Another
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
          <button className="modal-close-btn" onClick={onClose}></button>
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
                Copy to Clipboard
              </button>
            )}
            {showDownload && (
              <button className="primary-btn" onClick={handleDownloadCaptions}>
                Download Captions (.SRT)
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
      alert('Title copied!');
    };
    
    return (
      <div className="result-modal-overlay" onClick={onClose}>
        <div className="result-modal title-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}></button>
          <div className="modal-header">
            <span className="modal-icon"></span>
            <h2>A/B Title Options</h2>
            <p className="modal-subtitle">Pick the title that resonates most with your audience!</p>
          </div>
          
          <div className="title-options">
            {titles.map((title, index) => (
              <div key={index} className="title-option">
                <span className="title-number">{index + 1}</span>
                <span className="title-text">{title}</span>
                <button className="title-copy-btn" onClick={() => copyTitle(title)}></button>
              </div>
            ))}
          </div>
          
          {description && (
            <div className="description-section">
              <h3>Optimized Description</h3>
              <div className="description-content">
                {description.split('\n').map((line, i) => line && <p key={i}>{line}</p>)}
              </div>
              <button className="copy-btn" onClick={() => handleCopyText(description)}>
                Copy Description
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
              <span className="limit-icon"></span>
              <h2>You've Used All 3 Free Analyses!</h2>
              <p className="limit-subtitle">We hope you loved JSMGAX! Upgrade to Premium for 50 analyses per month.</p>
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
                <button className="premium-btn" onClick={() => setShowPaywall(true)}>Upgrade to Premium - $5.99/month</button>
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
        {showPrivacy && <PrivacyModal />}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Product</h4>
              <a href="#features" className="footer-link">Features</a>
              <a href="#pricing" className="footer-link">Pricing</a>
              <Link to="/" className="footer-link">Free Trial</Link>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/contact" className="footer-link">Contact Us</Link>
              <a href="#faq" className="footer-link">FAQ</a>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>JSMGAX © 2025</p>
            <p className="footer-tagline">Built with ❤️ by a mom for creators everywhere</p>
          </div>
        </footer>
      </div>
    );
  }

  // ============================================
  // PREMIUM LIMIT REACHED VIEW
  // ============================================

  if (showPremiumLimitReached && isPremium) {
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
              <span className="limit-icon">🚀</span>
              <h2>You're a Power User!</h2>
              <p className="limit-subtitle">You've used all 50 analyses this month. Your limit resets on the 1st.</p>
              <div className="limit-stats">
                <div className="stat-item">
                  <span className="stat-number">50</span>
                  <span className="stat-label">Analyses This Month</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">With Pro Tier</span>
                </div>
              </div>
              <div className="limit-options">
                <button className="premium-btn" onClick={() => window.location.href = 'mailto:contact.jsmgax@gmail.com?subject=Pro%20Tier%20Interest'}>Contact Us About Pro Tier</button>
                <p className="limit-note">Pro Tier: Unlimited analyses + advanced features at $16.99/month (Coming Soon)</p>
                <button className="secondary-btn" onClick={() => setShowPremiumLimitReached(false)} style={{marginTop: '20px'}}>Back to Dashboard</button>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Product</h4>
              <a href="#features" className="footer-link">Features</a>
              <a href="#pricing" className="footer-link">Pricing</a>
              <Link to="/" className="footer-link">Free Trial</Link>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <Link to="/contact" className="footer-link">Contact Us</Link>
              <a href="#faq" className="footer-link">FAQ</a>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>JSMGAX © 2025</p>
            <p className="footer-tagline">Built with ❤️ by a mom for creators everywhere</p>
          </div>
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
        <nav className="header-nav">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/about" className="nav-link">About</Link>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
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
      
      <main className="main-content">
        {/* UPLOAD VIEW */}
        {currentView === 'upload' && (
          <div className="upload-section">
            <h2>Enhance Your Video with AI</h2>
            <p className="subtitle">Analyze any video — YouTube, TikTok, Reels, or your own content!</p>
            
            <SignedOut>
              {/* LANDING PAGE */}
              <div className="landing-page">
                {/* HERO SECTION */}
                <section className="hero-section">
                  <div className="hero-content">
                    <h1 className="hero-title">Turn Any Video Into a Viral Hit with AI</h1>
                    <p className="hero-subtitle">
                      Stop guessing what works. Get AI-powered insights that analyze your videos for hooks, 
                      thumbnails, pacing, SEO, and viral potential — all in under 60 seconds.
                    </p>
                    <div className="hero-stats">
                      <span className="hero-stat">3 Free Analyses</span>
                      <span className="hero-divider">•</span>
                      <span className="hero-stat">No Credit Card Required</span>
                      <span className="hero-divider">•</span>
                      <span className="hero-stat">Instant Results</span>
                    </div>
                    <div className="hero-cta">
                      <SignUpButton mode="modal">
                        <button className="hero-primary-btn">Start Free Analysis</button>
                      </SignUpButton>
                      <SignInButton mode="modal">
                        <button className="hero-secondary-btn">Sign In</button>
                      </SignInButton>
                    </div>
                    <p className="hero-platforms">
                      Works with YouTube, TikTok, Instagram Reels, and direct uploads
                    </p>
                  </div>
                </section>

                {/* QUICK VALUE PROPS */}
                <section className="value-props-section">
                  <div className="value-props-container">
                    <div className="value-prop">
                      <span className="value-icon">⚡</span>
                      <div>
                        <h3>Analyze Videos in Under 60 Seconds</h3>
                        <p>Get instant AI-powered insights on hooks, thumbnails, pacing, and viral potential</p>
                      </div>
                    </div>
                    <div className="value-prop">
                      <span className="value-icon">🎯</span>
                      <div>
                        <h3>Get Viral Prediction Scores</h3>
                        <p>0-100 score with percentile ranking shows exactly how your video will perform</p>
                      </div>
                    </div>
                    <div className="value-prop">
                      <span className="value-icon">📱</span>
                      <div>
                        <h3>Works on YouTube, TikTok & Instagram</h3>
                        <p>Multi-platform support with platform-specific recommendations</p>
                      </div>
                    </div>
                  </div>
                  <div className="learn-more-link">
                    <Link to="/features" className="text-link">See all features →</Link>
                  </div>
                </section>

                {/* PRICING SECTION */}
                <section id="pricing" className="pricing-section">
                  <h2 className="section-title">Simple, Transparent Pricing</h2>
                  <p className="section-subtitle">
                    Start free, upgrade when you're ready. No hidden fees, cancel anytime.
                  </p>

                  <div className="pricing-grid">
                    {/* FREE TIER */}
                    <div className="pricing-card">
                      <div className="pricing-header">
                        <h3 className="pricing-tier">Free</h3>
                        <div className="pricing-price">
                          <span className="price-amount">$0</span>
                          <span className="price-period">/forever</span>
                        </div>
                      </div>
                      <div className="pricing-features">
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>3 analyses (your videos + competitors)</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>3 AI thumbnails</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Unlimited script generation</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Trending videos access</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Niche trend detector</span>
                        </div>
                        <div className="pricing-feature disabled">
                          <span className="feature-cross">✗</span>
                          <span>Unlimited analyses</span>
                        </div>
                        <div className="pricing-feature disabled">
                          <span className="feature-cross">✗</span>
                          <span>Competitor research</span>
                        </div>
                      </div>
                      <SignUpButton mode="modal">
                        <button className="pricing-btn pricing-btn-free">Get Started Free</button>
                      </SignUpButton>
                    </div>

                    {/* PREMIUM TIER */}
                    <div className="pricing-card pricing-card-featured">
                      <div className="pricing-badge">MOST POPULAR</div>
                      <div className="pricing-header">
                        <h3 className="pricing-tier">Premium</h3>
                        <div className="pricing-price">
                          <span className="price-amount">$5.99</span>
                          <span className="price-period">/month</span>
                        </div>
                        <p className="pricing-yearly">or $55/year (save $16.88)</p>
                      </div>
                      <div className="pricing-features">
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>50 analyses per month (your videos + competitors)</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Analyze your content and competitors</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>3 AI thumbnails per month</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Unlimited script generation</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>All features unlocked</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Priority support</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Founding member pricing</span>
                        </div>
                      </div>
                      <SignUpButton mode="modal">
                        <button className="pricing-btn pricing-btn-premium">Start Premium Trial</button>
                      </SignUpButton>
                    </div>

                    {/* PRO TIER */}
                    <div className="pricing-card pricing-card-disabled">
                      <div className="pricing-header">
                        <h3 className="pricing-tier">Pro</h3>
                        <div className="pricing-price">
                          <span className="price-amount">$16.99</span>
                          <span className="price-period">/month</span>
                        </div>
                        <p className="pricing-yearly">Coming Soon</p>
                      </div>
                      <div className="pricing-features">
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Unlimited video analyses</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Everything in Premium</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Advanced analytics</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Team collaboration</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>API access</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>White-label options</span>
                        </div>
                        <div className="pricing-feature">
                          <span className="feature-check">✓</span>
                          <span>Dedicated support</span>
                        </div>
                      </div>
                      <button className="pricing-btn pricing-btn-disabled" disabled>Join Waitlist</button>
                    </div>
                  </div>

                  <div className="pricing-footer">
                    <p>All plans include secure payments via Stripe • Cancel anytime • No hidden fees</p>
                  </div>
                </section>

                {/* FAQ SECTION */}
                <section id="faq" className="faq-section">
                  <h2 className="section-title">Frequently Asked Questions</h2>
                  <p className="section-subtitle">Everything you need to know about JSMGAX</p>
                  
                  <div className="faq-container">
                    <div className="faq-item">
                      <button className="faq-question" onClick={(e) => {
                        const answer = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.faq-icon');
                        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                        icon.textContent = answer.style.display === 'block' ? '−' : '+';
                      }}>
                        <span>How does the AI video analysis work?</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <p>JSMGAX uses advanced AI (powered by GPT-4) to analyze your video content across multiple dimensions. We examine your hook (first 5 seconds), thumbnail effectiveness, pacing, audio quality, SEO optimization, and overall viral potential. The AI compares your video against thousands of successful videos to provide actionable insights and recommendations tailored to your platform (YouTube, TikTok, or Instagram).</p>
                      </div>
                    </div>

                    <div className="faq-item">
                      <button className="faq-question" onClick={(e) => {
                        const answer = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.faq-icon');
                        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                        icon.textContent = answer.style.display === 'block' ? '−' : '+';
                      }}>
                        <span>What platforms do you support?</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <p>JSMGAX supports YouTube, TikTok, and Instagram Reels. You can either paste a YouTube URL for instant analysis or upload video files directly from any platform. Our AI provides platform-specific feedback and recommendations optimized for each platform's algorithm and audience behavior.</p>
                      </div>
                    </div>

                    <div className="faq-item">
                      <button className="faq-question" onClick={(e) => {
                        const answer = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.faq-icon');
                        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                        icon.textContent = answer.style.display === 'block' ? '−' : '+';
                      }}>
                        <span>Is my video data secure and private?</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <p>Absolutely. Your videos are processed securely and are never stored permanently on our servers. We only extract the necessary data for analysis (audio transcription, visual elements) and delete all temporary files immediately after processing. Your content remains completely private and is never shared with third parties or used for training purposes.</p>
                      </div>
                    </div>

                    <div className="faq-item">
                      <button className="faq-question" onClick={(e) => {
                        const answer = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.faq-icon');
                        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                        icon.textContent = answer.style.display === 'block' ? '−' : '+';
                      }}>
                        <span>What's the maximum file size for uploads?</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <p>The maximum file size is 25MB for direct uploads. For larger videos, we recommend using the YouTube URL option instead, which has no size limit. If you need to upload a larger file directly, consider compressing your video or trimming it to the most important sections (the first 60-90 seconds are usually most critical for analysis).</p>
                      </div>
                    </div>

                    <div className="faq-item">
                      <button className="faq-question" onClick={(e) => {
                        const answer = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.faq-icon');
                        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                        icon.textContent = answer.style.display === 'block' ? '−' : '+';
                      }}>
                        <span>How accurate is the viral prediction score?</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <p>Our viral prediction score (0-100) is based on analyzing thousands of successful videos and identifying patterns that correlate with high engagement. While no prediction can be 100% accurate (viral success depends on many factors including timing, audience, and trends), our AI provides a reliable indicator of your video's potential. We also show you your percentile ranking compared to all analyzed videos, giving you context for your score.</p>
                      </div>
                    </div>

                    <div className="faq-item">
                      <button className="faq-question" onClick={(e) => {
                        const answer = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.faq-icon');
                        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                        icon.textContent = answer.style.display === 'block' ? '−' : '+';
                      }}>
                        <span>Can I cancel my Premium subscription anytime?</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <p>Yes, you can cancel your Premium subscription at any time with no penalties or fees. Your subscription will remain active until the end of your current billing period (monthly or yearly), and you won't be charged again. You can manage your subscription directly through your account settings or contact us for assistance.</p>
                      </div>
                    </div>

                    <div className="faq-item">
                      <button className="faq-question" onClick={(e) => {
                        const answer = e.currentTarget.nextElementSibling;
                        const icon = e.currentTarget.querySelector('.faq-icon');
                        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                        icon.textContent = answer.style.display === 'block' ? '−' : '+';
                      }}>
                        <span>What's included in the free plan?</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <div className="faq-answer">
                        <p>The free plan includes 3 analyses (your videos + competitors), 1 AI-generated thumbnail, unlimited script generation, access to trending videos across 12 categories, and the niche trend detector. This gives you a comprehensive introduction to JSMGAX's capabilities. If you need more analyses, you can upgrade to Premium for 50 analyses per month or submit a hardship request if cost is a barrier.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FINAL CTA */}
                <section className="final-cta-section">
                  <h2 className="final-cta-title">Ready to Make Your Next Video Go Viral?</h2>
                  <p className="final-cta-subtitle">
                    Join thousands of creators using AI to optimize their content and grow their audience
                  </p>
                  <SignUpButton mode="modal">
                    <button className="hero-primary-btn">Start Free Analysis</button>
                  </SignUpButton>
                  <p className="final-cta-note">3 free analyses • No credit card required</p>
                </section>
              </div>
            </SignedOut>

            <SignedIn>
              {/* Mode Toggle */}
              <div className="mode-toggle">
                <button 
                  className={`mode-btn ${analysisMode === 'myVideo' && !showTrendingSection ? 'mode-btn-active' : ''}`}
                  onClick={() => { setAnalysisMode('myVideo'); setVideoFile(null); setYoutubeUrl(''); setShowTrendingSection(false); }}
                >
                  Analyze My Video
                </button>
                <button 
                  className={`mode-btn ${analysisMode === 'competitor' && !showTrendingSection ? 'mode-btn-active' : ''}`}
                  onClick={() => { setAnalysisMode('competitor'); setVideoFile(null); setYoutubeUrl(''); setShowTrendingSection(false); }}
                >
                  Competitor Research
                </button>
                <button 
                  className={`mode-btn ${showTrendingSection ? 'mode-btn-active' : ''}`}
                  onClick={() => { setShowTrendingSection(!showTrendingSection); setShowNicheTrends(false); }}
                >
                  Trending Now
                </button>
                <button 
                  className={`mode-btn ${showNicheTrends ? 'mode-btn-active' : ''}`}
                  onClick={() => { setShowNicheTrends(!showNicheTrends); setShowTrendingSection(false); }}
                >
                  Niche Trends
                </button>
              </div>

              {analysisMode === 'competitor' && !showTrendingSection && (
                <div className="competitor-info">
                  <p><strong>Competitor Research Mode</strong></p>
                  <p>Paste any YouTube video URL to discover what makes it successful and learn winning tactics you can apply!</p>
                </div>
              )}

              {/* Trending Videos Section */}
              {showTrendingSection && (
                <div className="trending-section">
                  <div className="trending-header">
                    <h3>Trending on YouTube</h3>
                    <p>See what's hot right now and get inspired for your next video</p>
                  </div>
                  
                  <div className="trending-categories">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'gaming', label: ' Gaming' },
                      { id: 'music', label: ' Music' },
                      { id: 'entertainment', label: 'Entertainment' },
                      { id: 'howto', label: 'How-To' },
                      { id: 'tech', label: ' Tech' },
                      { id: 'sports', label: 'Sports' },
                      { id: 'news', label: 'News' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        className={`trending-cat-btn ${trendingCategory === cat.id ? 'active' : ''}`}
                        onClick={() => {
                          setTrendingCategory(cat.id);
                          fetchTrendingVideos(cat.id);
                        }}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                  
                  {isTrendingLoading ? (
                    <div className="trending-loading">
                      <div className="loader"></div>
                      <p>Loading trending videos...</p>
                    </div>
                  ) : (
                    <div className="trending-grid">
                      {trendingVideos.map(video => (
                        <div key={video.id} className="trending-card">
                          <div className="trending-thumbnail">
                            <img src={video.thumbnail} alt={video.title} />
                            <span className="trending-views">{video.views} views</span>
                          </div>
                          <div className="trending-info">
                            <h4 className="trending-title">{video.title}</h4>
                            <p className="trending-channel">{video.channel}</p>
                          </div>
                          <div className="trending-actions">
                            <a href={video.url} target="_blank" rel="noopener noreferrer" className="trending-watch-btn">
                               Watch
                            </a>
                            <button 
                              className="trending-analyze-btn"
                              onClick={() => {
                                setYoutubeUrl(video.url);
                                setAnalysisMode('competitor');
                                setShowTrendingSection(false);
                              }}
                            >
                              Analyze
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="results-actions" style={{ marginTop: '30px' }}>
                    <button className="secondary-btn" onClick={() => { setShowTrendingSection(false); setCurrentView('upload'); }}>
                      Return to Home Page
                    </button>
                  </div>
                </div>
              )}

              {/* Niche Trend Detector Section */}
              {showNicheTrends && (
                <div className="niche-trends-section">
                  <div className="niche-trends-header">
                    <h3>Your Personalized Niche Trend Detector</h3>
                    <p>Get trending topics, video ideas, and keyword opportunities tailored to YOUR niche</p>
                  </div>
                  
                  {!nicheTrendData ? (
                    <div className="niche-selector">
                      <h4>Select Your Niche:</h4>
                      <div className="niche-grid">
                        {[
                          { id: 'fitness', label: 'Fitness & Health', icon: '' },
                          { id: 'gaming', label: ' Gaming', icon: '' },
                          { id: 'tech', label: ' Tech & Gadgets', icon: '' },
                          { id: 'cooking', label: 'Cooking & Food', icon: '' },
                          { id: 'beauty', label: 'Beauty & Fashion', icon: '' },
                          { id: 'finance', label: 'Finance & Investing', icon: '' },
                          { id: 'education', label: 'Education & Learning', icon: '' },
                          { id: 'travel', label: ' Travel & Lifestyle', icon: '' },
                          { id: 'music', label: ' Music & Entertainment', icon: '' },
                          { id: 'business', label: 'Business & Marketing', icon: '' },
                          { id: 'diy', label: 'DIY & Crafts', icon: '' },
                          { id: 'sports', label: 'Sports & Athletics', icon: '' }
                        ].map(niche => (
                          <button
                            key={niche.id}
                            className={`niche-btn ${selectedNiche === niche.id ? 'selected' : ''}`}
                            onClick={() => setSelectedNiche(niche.id)}
                          >
                            <span className="niche-icon">{niche.icon}</span>
                            <span className="niche-label">{niche.label.replace(niche.icon + ' ', '')}</span>
                          </button>
                        ))}
                      </div>
                      
                      <div className="custom-niche">
                        <label>Or enter your custom niche:</label>
                        <input 
                          type="text" 
                          placeholder="e.g., Vegan cooking for beginners"
                          value={customNiche}
                          onChange={(e) => {
                            setCustomNiche(e.target.value);
                            setSelectedNiche('');
                          }}
                          className="custom-niche-input"
                        />
                      </div>
                      
                      <button 
                        className="primary-btn analyze-niche-btn"
                        onClick={async () => {
                          const niche = customNiche || selectedNiche;
                          if (!niche) {
                            alert('Please select or enter a niche!');
                            return;
                          }
                          setIsNicheTrendsLoading(true);
                          try {
                            const response = await fetch(`${API_URL}/api/niche-trends`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ niche })
                            });
                            const data = await response.json();
                            if (data.success) {
                              setNicheTrendData(data);
                            }
                          } catch (error) {
                            console.error('Failed to fetch niche trends:', error);
                            alert('Failed to analyze niche trends. Please try again.');
                          }
                          setIsNicheTrendsLoading(false);
                        }}
                        disabled={isNicheTrendsLoading || (!selectedNiche && !customNiche)}
                      >
                        {isNicheTrendsLoading ? 'Analyzing...' : 'Analyze My Niche'}
                      </button>
                    </div>
                  ) : (
                    <div className="niche-results">
                      <button 
                        className="secondary-btn"
                        onClick={() => {
                          setNicheTrendData(null);
                          setSelectedNiche('');
                          setCustomNiche('');
                        }}
                        style={{ marginBottom: '20px' }}
                      >
                        ← Choose Different Niche
                      </button>
                      
                      <div className="niche-results-grid">
                        <div className="niche-result-card">
                          <h4>Trending Topics in {nicheTrendData.niche}</h4>
                          <div className="niche-content">{nicheTrendData.trendingTopics}</div>
                        </div>
                        
                        <div className="niche-result-card">
                          <h4>Video Ideas</h4>
                          <div className="niche-content">{nicheTrendData.videoIdeas}</div>
                        </div>
                        
                        <div className="niche-result-card">
                          <h4>Keyword Opportunities</h4>
                          <div className="niche-content">{nicheTrendData.keywords}</div>
                        </div>
                        
                        <div className="niche-result-card">
                          <h4>Competitor Insights</h4>
                          <div className="niche-content">{nicheTrendData.competitorInsights}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="results-actions" style={{ marginTop: '30px' }}>
                    <button className="secondary-btn" onClick={() => { setShowNicheTrends(false); setNicheTrendData(null); setSelectedNiche(''); setCustomNiche(''); setCurrentView('upload'); }}>
                      Return to Home Page
                    </button>
                  </div>
                </div>
              )}

              {!showTrendingSection && !showNicheTrends && (
                <>
                  <div className="uses-counter">
                <span className="uses-icon"></span>
                <span className="uses-text">{isAdmin ? 'Admin - Unlimited' : isPremium ? `Premium - ${PREMIUM_MONTHLY_LIMIT - premiumMonthlyUses} of ${PREMIUM_MONTHLY_LIMIT} analyses left this month` : `${usesLeft} free analyses left`}</span>
              </div>
              {!isPremium && (
                <button className="go-premium-btn" onClick={handlePremiumClick}>View Plans - Starting at $5.99/month</button>
              )}
              {!isPremium && !isAdmin && usesLeft <= 1 && (
                <button className="hardship-btn" onClick={() => setShowHardshipModal(true)}>Request Additional Free Analyses</button>
              )}
              {error && <div className="error-box">{error}</div>}
              
              <div className="input-group">
                <label>Paste YouTube Link {analysisMode === 'competitor' && '(Competitor Video)'}</label>
                <input type="text" placeholder={analysisMode === 'competitor' ? "https://www.youtube.com/watch?v=COMPETITOR_VIDEO" : "https://www.youtube.com/watch?v=..."} value={youtubeUrl} onChange={handleYoutubeChange} className={youtubeUrl ? 'input-success' : ''} />
                {youtubeUrl && <span className="success-text">YouTube link ready!</span>}
              </div>
              
              {analysisMode === 'myVideo' && (
                <>
                  <div className="divider"><span>OR</span></div>
                  <div className={`upload-box ${videoFile ? 'upload-success' : ''}`}>
                    <input type="file" accept="video/*,audio/*" onChange={handleFileChange} id="video-upload" hidden />
                    <label htmlFor="video-upload" className="upload-label">
                      <span className="upload-icon"></span>
                      <span className="upload-text">{videoFile ? '' + videoFile.name : 'Click to upload any video'}</span>
                      <span className="upload-hint">MP4, MOV, AVI, MP3, WAV (Max 25MB)</span>
                      <span className="platform-support">Works with: TikTok • Instagram Reels • Shorts • Any video!</span>
                    </label>
                  </div>
                </>
              )}
              
              <button className="primary-btn" onClick={handleAnalyze} disabled={analysisMode === 'competitor' ? !youtubeUrl : (!videoFile && !youtubeUrl)}>
                {analysisMode === 'competitor' ? 'Analyze Competitor' : 'Analyze with AI'} {!isPremium && `(${usesLeft} left)`}
              </button>
              
              {/* Quick Tools */}
              <div className="quick-tools">
                <p className="quick-tools-label">Quick Tools:</p>
                <button className="tool-btn" onClick={() => setShowScriptModal(true)}>
                   Script Writer
                </button>
              </div>
                </>
              )}
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
                <h2>Competitor Analysis Complete!</h2>
                <p className="results-subtitle">Here's what makes this video successful</p>
                
                {competitorSummary && (
                  <div className="competitor-summary-banner">
                    <span className="summary-icon"></span>
                    <span className="summary-text">{competitorSummary}</span>
                  </div>
                )}

                <div className="results-grid competitor-grid">
                  <GridCard icon="" title="Success Factors" subtitle="Why it works" onClick={() => setActiveModal('success')} highlight={true} />
                  <GridCard icon="" title="Video Structure" subtitle="Content flow" onClick={() => setActiveModal('structure')} />
                  <GridCard icon="" title="Winning Tactics" subtitle="What to apply" onClick={() => setActiveModal('tactics')} highlight={true} />
                  <GridCard icon="" title="SEO Analysis" subtitle="Keywords & tags" onClick={() => setActiveModal('competitorSeo')} />
                  <GridCard icon="" title="Full Transcript" subtitle="What they said" onClick={() => setActiveModal('transcript')} />
                </div>

                <div className="results-actions">
                  <button className="secondary-btn" onClick={handleStartOver}>
                    Analyze Another Video {!isPremium && `(${usesLeft} left)`}
                  </button>
                  <button className="secondary-btn" onClick={() => { handleStartOver(); setCurrentView('upload'); }} style={{ marginLeft: '10px' }}>
                    Back to Home
                  </button>
                  <button className="secondary-btn" onClick={() => setShowThumbnailModal(true)} style={{ marginLeft: '10px' }}>
                    Generate AI Thumbnail ({getThumbnailsRemaining()} left)
                  </button>
                </div>

                {/* Competitor Result Modals */}
                <ResultModal isOpen={activeModal === 'success'} onClose={() => setActiveModal(null)} title="Success Factors" icon="" content={successAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'structure'} onClose={() => setActiveModal(null)} title="Video Structure Breakdown" icon="" content={structureAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'tactics'} onClose={() => setActiveModal(null)} title="Winning Tactics" icon="" content={tacticsAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'competitorSeo'} onClose={() => setActiveModal(null)} title="SEO & Discoverability Analysis" icon="" content={seoAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'transcript'} onClose={() => setActiveModal(null)} title="Full Transcript" icon="" content={transcription?.text || ''} showCopy={true} />
              </>
            ) : (
              <>
                <h2>Your AI Analysis is Ready!</h2>
                <p className="results-subtitle">Click any card below to view details</p>
                
                {percentile !== null && (
                  <div className="benchmark-banner">
                    <span className="benchmark-icon"></span>
                    <span className="benchmark-text">
                      Your video scored better than <strong>{percentile}%</strong> of analyzed videos!
                    </span>
                    <span className="benchmark-count">({totalVideosAnalyzed} videos analyzed)</span>
                  </div>
                )}

                <div className="results-grid">
                  <GridCard icon="" title="Video Score" subtitle={`${getScoreNumber()}/100`} onClick={() => setActiveModal('score')} highlight={true} />
                  <GridCard icon="" title="Captions" subtitle="Download SRT" onClick={() => setActiveModal('captions')} />
                  <GridCard icon="" title="AI Tips" subtitle="5 improvements" onClick={() => setActiveModal('tips')} />
                  <GridCard icon="" title="Hook Analysis" subtitle="First 3 seconds" onClick={() => setActiveModal('hook')} />
                  <GridCard icon="" title="Thumbnail Text" subtitle="Click-worthy words" onClick={() => setActiveModal('thumbnail')} />
                  <GridCard icon="⏱" title="Pacing" subtitle="Flow & retention" onClick={() => setActiveModal('pacing')} />
                  <GridCard icon="" title="CTA Scripts" subtitle="Call-to-actions" onClick={() => setActiveModal('cta')} />
                  <GridCard icon="" title="Platform Tips" subtitle="Multi-platform" onClick={() => setActiveModal('platform')} />
                  <GridCard icon="" title="Audio Notes" subtitle="Speech analysis" onClick={() => setActiveModal('audio')} />
                  <GridCard icon="" title="A/B Titles" subtitle="5 title options" onClick={() => setActiveModal('titles')} />
                  <GridCard icon="#⃣" title="Hashtags" subtitle="30+ tags" onClick={() => setActiveModal('hashtags')} />
                  <GridCard icon="" title="Trending Ideas" subtitle="Video concepts" onClick={() => setActiveModal('trending')} />
                </div>

                <div className="results-actions">
                  <button className="secondary-btn" onClick={handleStartOver}>
                    Analyze Another Video {!isPremium && `(${usesLeft} left)`}
                  </button>
                  <button className="secondary-btn" onClick={() => { handleStartOver(); setCurrentView('upload'); }} style={{ marginLeft: '10px' }}>
                    Back to Home
                  </button>
                  <button className="secondary-btn" onClick={() => setShowThumbnailModal(true)} style={{ marginLeft: '10px' }}>
                    Generate AI Thumbnail ({getThumbnailsRemaining()} left)
                  </button>
                </div>
                
                {!isPremium && (
                  <div className="upgrade-prompt">
                    <p>Enjoying JSMGAX? <span className="upgrade-link" onClick={handlePremiumClick}>Upgrade to Premium</span> for 50 analyses per month!</p>
                  </div>
                )}
                
                {!isPremium && !isAdmin && usesLeft === 0 && (
                  <button className="hardship-btn" onClick={() => setShowHardshipModal(true)} style={{ marginTop: '15px' }}>
                    Request Additional Free Analyses
                  </button>
                )}

                {/* Result Modals */}
                <ResultModal isOpen={activeModal === 'score'} onClose={() => setActiveModal(null)} title="Video Score" icon="" content={videoScore} showCopy={true} />
                <ResultModal isOpen={activeModal === 'captions'} onClose={() => setActiveModal(null)} title="AI-Generated Captions" icon="" content={transcription?.text || ''} showCopy={true} showDownload={true} />
                <ResultModal isOpen={activeModal === 'tips'} onClose={() => setActiveModal(null)} title="AI Tips to Improve Your Video" icon="" content={tips} showCopy={true} />
                <ResultModal isOpen={activeModal === 'hook'} onClose={() => setActiveModal(null)} title="Hook Analysis" icon="" content={hookAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'thumbnail'} onClose={() => setActiveModal(null)} title="Thumbnail Text Suggestions" icon="" content={thumbnailText} showCopy={true} />
                <ResultModal isOpen={activeModal === 'pacing'} onClose={() => setActiveModal(null)} title="Pacing Analysis" icon="⏱" content={pacingAnalysis} showCopy={true} />
                <ResultModal isOpen={activeModal === 'cta'} onClose={() => setActiveModal(null)} title="Call-to-Action Recommendations" icon="" content={ctaRecommendations} showCopy={true} />
                <ResultModal isOpen={activeModal === 'platform'} onClose={() => setActiveModal(null)} title="Platform-Specific Feedback" icon="" content={platformFeedback} showCopy={true} />
                <ResultModal isOpen={activeModal === 'audio'} onClose={() => setActiveModal(null)} title="Audio & Speech Notes" icon="" content={audioNotes} showCopy={true} />
                <TitleModal isOpen={activeModal === 'titles'} onClose={() => setActiveModal(null)} content={titleAndDescription} />
                <ResultModal isOpen={activeModal === 'hashtags'} onClose={() => setActiveModal(null)} title="Hashtag Generator" icon="#⃣" content={hashtags} showCopy={true} />
                <ResultModal isOpen={activeModal === 'trending'} onClose={() => setActiveModal(null)} title="Trending Topics & Video Ideas" icon="" content={trendingAndIdeas} showCopy={true} />
              </>
            )}
          </div>
        )}

        {showPaywall && (
          <div className="paywall-overlay" onClick={() => setShowPaywall(false)}>
            <div className="paywall-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowPaywall(false)}></button>
              <PaywallContent />
            </div>
          </div>
        )}
        {showTerms && <TermsModal />}
        {showPrivacy && <PrivacyModal />}
        <ThumbnailModal />
        {showScriptModal && (
          <div className="result-modal-overlay" onClick={() => setShowScriptModal(false)}>
            <div className="result-modal script-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setShowScriptModal(false)}></button>
              
              <div className="modal-header">
                <span className="modal-icon"></span>
                <h2>AI Script Writer</h2>
                <p className="modal-subtitle">Generate a complete video script in seconds!</p>
              </div>
              
              {!generatedScript && !isGeneratingScript && (
                <div className="script-form">
                  <div className="script-input-group">
                    <label>Video Topic *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., How to start a YouTube channel in 2025"
                      value={scriptTopic}
                      onChange={(e) => setScriptTopic(e.target.value)}
                      className="script-topic-input"
                    />
                  </div>
                  
                  <div className="script-input-group">
                    <label>Video Length</label>
                    <div className="script-options">
                      {[
                        { id: 'short', label: 'Short', desc: '1-2 min' },
                        { id: 'medium', label: ' Medium', desc: '5-7 min' },
                        { id: 'long', label: 'Long', desc: '10-15 min' }
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
                    <label>Content Style</label>
                    <div className="script-options style-options-grid">
                      {[
                        { id: 'educational', label: 'Educational', desc: 'Teach & inform' },
                        { id: 'entertaining', label: 'Entertaining', desc: 'Fun & engaging' },
                        { id: 'storytelling', label: 'Storytelling', desc: 'Narrative-driven' },
                        { id: 'tutorial', label: ' Tutorial', desc: 'Step-by-step' },
                        { id: 'motivational', label: 'Motivational', desc: 'Inspire action' }
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
                    <label>Target Audience (optional)</label>
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
                    Generate Script
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
                      Copy Script
                    </button>
                    <button className="secondary-btn" onClick={() => {
                      setGeneratedScript('');
                      setScriptTopic('');
                    }}>
                       Write Another
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
            <button className="modal-close-btn" onClick={() => { setShowSupportModal(false); setSupportSubmitted(false); }}></button>
            
            <div className="modal-header">
              <span className="modal-icon"></span>
              <h2>JSMGAX Support</h2>
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
                  <label>Your Email</label>
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
                  <label>Issue Type</label>
                  <select name="issue_type" className="script-topic-input" required>
                    <option value="">Select an issue type...</option>
                    <option value="bug">Bug / Something's not working</option>
                    <option value="feature">Feature request</option>
                    <option value="billing">Billing question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="script-input-group">
                  <label>Describe Your Issue</label>
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
                  Send Message
                </button>
              </form>
            ) : (
              <div className="support-success">
                <div className="success-icon"></div>
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
            <button className="modal-close-btn" onClick={() => setShowFoundingPopup(false)}></button>
            
            <div className="modal-header">
              <span className="modal-icon"></span>
              <h2>Thank You for Being Early</h2>
            </div>
            
            <div className="founding-content">
              <div className="founding-price">
                <span className="price-amount">$5.99</span>
                <span className="price-period">/month</span>
              </div>
              
              <p className="founding-message">
                You're joining JSMGAX at the ground floor. Lock in $5.99/month now, and you'll never see a price increase—even when rates go up for new members in mid-2026. Your early belief in us deserves lifetime savings.
              </p>
              
              <button 
                className="primary-btn founding-cta"
                onClick={() => {
                  setShowFoundingPopup(false);
                  setShowPaywall(true);
                }}
              >
                Secure My Founding Price
              </button>
              
              <p className="founding-thanks">Thank you for being an early supporter!</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Hardship Request Modal */}
      {showHardshipModal && (
        <div className="result-modal-overlay" onClick={() => setShowHardshipModal(false)}>
          <div className="result-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close-btn" onClick={() => setShowHardshipModal(false)}></button>
            
            {!hardshipSubmitted ? (
              <>
                <div className="modal-header">
                  <span className="modal-icon"></span>
                  <h2>Request Additional Free Analyses</h2>
                  <p className="modal-subtitle">We understand that technical issues and unexpected circumstances can disrupt your analysis experience. We genuinely care about you having the opportunity to fully test our product and see its value.</p>
                </div>
                
                <div className="hardship-form">
                  <div className="hardship-info">
                    <p><strong>Your Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
                    <p><strong>Current Analyses Left:</strong> {usesLeft}</p>
                  </div>
                  
                  <div className="form-group">
                    <label>Tell us what happened *</label>
                    <textarea
                      className="hardship-textarea"
                      placeholder="Please describe what happened in detail. Example: My browser crashed during the analysis process and it counted as a use, but I never received the results. I would like to properly evaluate the platform before deciding on a subscription."
                      value={hardshipReason}
                      onChange={(e) => setHardshipReason(e.target.value)}
                      rows="6"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>How many analyses do you need?</label>
                    <select 
                      className="hardship-select"
                      value={hardshipAnalysesRequested}
                      onChange={(e) => setHardshipAnalysesRequested(e.target.value)}
                    >
                      <option value="1">1 analysis</option>
                      <option value="2">2 analyses</option>
                      <option value="3">3 analyses</option>
                      <option value="5">5 analyses</option>
                    </select>
                  </div>
                  
                  <div className="hardship-note">
                    <p><strong>Important:</strong> All requests are subject to administrative review and approval. We carefully evaluate each situation on a case-by-case basis and reserve the right to approve or deny requests at our discretion. You will receive an email response within 24-48 hours with our decision.</p>
                  </div>
                  
                  <button 
                    className="primary-btn"
                    onClick={handleHardshipRequest}
                    disabled={!hardshipReason.trim()}
                  >
                    Submit Request
                  </button>
                </div>
              </>
            ) : (
              <div className="hardship-success">
                <span className="success-icon"></span>
                <h3>Request Submitted Successfully!</h3>
                <p>Thank you for reaching out. Your request has been received and will be carefully reviewed by our administrative team within 24-48 hours.</p>
                <p>You will receive an email at <strong>{user?.primaryEmailAddress?.emailAddress}</strong> with our decision regarding your request.</p>
                <p className="success-note">We appreciate your interest in JSMGAX and look forward to helping you experience our platform.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Product</h4>
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
             <Link to="/" className="footer-link">Free Trial</Link>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <a href="#faq" className="footer-link">FAQ</a>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>JSMGAX © 2025</p>
          <p className="footer-tagline">Built with ❤️ by a mom for creators everywhere</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
