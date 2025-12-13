// Google Analytics 4 Event Tracking Helper
// This file provides functions to track custom events in GA4

// Track when a user signs up
export const trackSignUp = () => {
  if (window.gtag) {
    window.gtag('event', 'sign_up', {
      method: 'Google'
    });
  }
};

// Track when a user starts a video analysis
export const trackAnalysisStart = (analysisType) => {
  if (window.gtag) {
    window.gtag('event', 'analysis_start', {
      analysis_type: analysisType // 'my_video' or 'competitor'
    });
  }
};

// Track when a video analysis completes successfully
export const trackAnalysisComplete = (analysisType) => {
  if (window.gtag) {
    window.gtag('event', 'analysis_complete', {
      analysis_type: analysisType
    });
  }
};

// Track when a user upgrades to premium
export const trackPremiumUpgrade = (plan) => {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: Date.now().toString(),
      value: plan === 'yearly' ? 55 : 5.99,
      currency: 'USD',
      items: [{
        item_id: plan === 'yearly' ? 'premium_yearly' : 'premium_monthly',
        item_name: plan === 'yearly' ? 'Premium Yearly' : 'Premium Monthly',
        price: plan === 'yearly' ? 55 : 5.99,
        quantity: 1
      }]
    });
  }
};

// Track when a user generates a thumbnail
export const trackThumbnailGeneration = (style) => {
  if (window.gtag) {
    window.gtag('event', 'generate_thumbnail', {
      thumbnail_style: style
    });
  }
};

// Track when a user generates a script
export const trackScriptGeneration = (length, style) => {
  if (window.gtag) {
    window.gtag('event', 'generate_script', {
      script_length: length,
      script_style: style
    });
  }
};

// Track when a user views trending videos
export const trackTrendingView = (category) => {
  if (window.gtag) {
    window.gtag('event', 'view_trending', {
      category: category
    });
  }
};

// Track when a user views niche trends
export const trackNicheTrendsView = (niche) => {
  if (window.gtag) {
    window.gtag('event', 'view_niche_trends', {
      niche: niche
    });
  }
};

// Track when a user clicks the pricing CTA
export const trackPricingCTA = (tier) => {
  if (window.gtag) {
    window.gtag('event', 'click_pricing_cta', {
      pricing_tier: tier
    });
  }
};

// Track when a user submits a hardship request
export const trackHardshipRequest = () => {
  if (window.gtag) {
    window.gtag('event', 'hardship_request');
  }
};

// Track when a user downloads captions
export const trackCaptionDownload = () => {
  if (window.gtag) {
    window.gtag('event', 'download_captions');
  }
};
