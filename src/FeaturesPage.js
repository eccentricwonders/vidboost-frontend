import React from 'react';
import { Link } from 'react-router-dom';
import './TermsPage.css';

function FeaturesPage() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>All Features</h1>
        <p className="terms-intro">
          Everything you need to create viral content across YouTube, TikTok, and Instagram
        </p>

        <div className="features-detail-grid">
          <div className="feature-detail-card">
            <div className="feature-detail-icon">📊</div>
            <h2>Hook Analysis</h2>
            <p>
              Your first 5 seconds determine whether viewers stay or leave. Our AI analyzes your opening hook for:
            </p>
            <ul>
              <li>Attention-grabbing strength</li>
              <li>Curiosity generation</li>
              <li>Pattern interrupts</li>
              <li>Emotional engagement</li>
              <li>Clear value proposition</li>
            </ul>
            <p>
              Get specific recommendations on how to improve your hook and increase viewer retention from the very first second.
            </p>
          </div>

          <div className="feature-detail-card">
            <div className="feature-detail-icon">🎯</div>
            <h2>Viral Prediction Score</h2>
            <p>
              Our AI analyzes thousands of viral videos to predict your content's potential with a 0-100 score:
            </p>
            <ul>
              <li><strong>0-40:</strong> Needs significant improvement</li>
              <li><strong>41-60:</strong> Good foundation, minor tweaks needed</li>
              <li><strong>61-80:</strong> Strong viral potential</li>
              <li><strong>81-100:</strong> Exceptional, ready to explode</li>
            </ul>
            <p>
              Plus get percentile ranking showing how your video compares to others in your niche. Know exactly where you stand before you publish.
            </p>
          </div>

          <div className="feature-detail-card">
            <div className="feature-detail-icon">🖼️</div>
            <h2>Thumbnail Scoring</h2>
            <p>
              Thumbnails drive 90% of click decisions. Our AI evaluates your thumbnail for:
            </p>
            <ul>
              <li>Visual clarity and contrast</li>
              <li>Text readability</li>
              <li>Emotional impact</li>
              <li>Color psychology</li>
              <li>Platform-specific best practices</li>
            </ul>
            <p>
              Get actionable recommendations to improve click-through rates and stand out in crowded feeds.
            </p>
          </div>

          <div className="feature-detail-card">
            <div className="feature-detail-icon">✍️</div>
            <h2>AI Title Generator</h2>
            <p>
              Generate click-worthy titles optimized for your platform and audience:
            </p>
            <ul>
              <li>Platform-specific formatting (YouTube, TikTok, Instagram)</li>
              <li>Keyword optimization for discoverability</li>
              <li>Curiosity gaps that drive clicks</li>
              <li>A/B testing variations</li>
              <li>Character count optimization</li>
            </ul>
            <p>
              Never struggle with titles again. Get 5-10 variations instantly and choose the best performer.
            </p>
          </div>

          <div className="feature-detail-card">
            <div className="feature-detail-icon">🔍</div>
            <h2>Competitor Research</h2>
            <p>
              Analyze any public video to discover what makes successful content work:
            </p>
            <ul>
              <li>Success factors breakdown</li>
              <li>Content structure analysis</li>
              <li>Tactics and techniques used</li>
              <li>SEO and metadata insights</li>
              <li>Audience engagement patterns</li>
            </ul>
            <p>
              Learn from the best in your niche. Understand exactly why certain videos go viral and apply those insights to your own content.
            </p>
          </div>

          <div className="feature-detail-card">
            <div className="feature-detail-icon">🔥</div>
            <h2>Trending Detector</h2>
            <p>
              Stay ahead of trends with real-time trending video discovery:
            </p>
            <ul>
              <li>12 content categories to explore</li>
              <li>Real-time trending videos from YouTube</li>
              <li>Instant inspiration for your next video</li>
              <li>See what's working right now</li>
              <li>Analyze trending videos with one click</li>
            </ul>
            <p>
              Never run out of content ideas. See what's trending in your niche and create timely, relevant content that rides the wave.
            </p>
          </div>

          <div className="feature-detail-card">
            <div className="feature-detail-icon">📝</div>
            <h2>AI Script Writer</h2>
            <p>
              Generate complete video scripts tailored to your needs:
            </p>
            <ul>
              <li>Customizable length (30s to 10+ minutes)</li>
              <li>Multiple style options (educational, entertaining, promotional)</li>
              <li>Audience targeting (beginners, enthusiasts, experts)</li>
              <li>Platform optimization</li>
              <li>Hook, body, and CTA structure</li>
            </ul>
            <p>
              Beat writer's block and create engaging scripts in seconds. Perfect for planning your content or getting unstuck.
            </p>
          </div>

          <div className="feature-detail-card">
            <div className="feature-detail-icon">🎨</div>
            <h2>AI Thumbnail Generator</h2>
            <p>
              Create professional thumbnails with DALL-E 3 in multiple styles:
            </p>
            <ul>
              <li><strong>Photorealistic:</strong> Lifelike, professional images</li>
              <li><strong>Bold Graphic:</strong> High-contrast, eye-catching designs</li>
              <li><strong>Minimalist:</strong> Clean, modern aesthetics</li>
              <li><strong>Dramatic:</strong> Cinematic, emotional impact</li>
              <li><strong>Playful:</strong> Fun, engaging illustrations</li>
            </ul>
            <p>
              No design skills needed. Generate stunning thumbnails that drive clicks and match your brand style.
            </p>
          </div>
        </div>

        <div className="terms-section">
          <h2>Multi-Platform Support</h2>
          <p>
            All features work seamlessly across YouTube, TikTok, and Instagram. Get platform-specific recommendations tailored to each platform's unique algorithm and audience behavior.
          </p>
        </div>

        <div className="terms-section">
          <h2>Ready to Try It?</h2>
          <p>
            Start with 3 free analyses. No credit card required. Experience the full power of AI-driven video optimization.
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

export default FeaturesPage;
