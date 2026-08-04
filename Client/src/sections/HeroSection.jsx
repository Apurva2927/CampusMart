import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CampusMartHero() {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="page-home">
        
        {/* Top Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
          <a href="#new" className="hero-section__badge">
            <span style={{ backgroundColor: '#fff', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '700', border: '1px solid #e2e8f0' }}>NEW</span>
            <span className="hero-section__badge-copy">Buy, sell, and trade safely within your university campus →</span>
          </a>
        </div>

        {/* Headline */}
        <h1 className="hero-section__title">
          Buy, sell, and connect on your campus <span style={{ color: 'var(--page-accent)' }}>faster</span>
        </h1>

        {/* Subheading */}
        <p className="hero-section__copy">
          Verified student profiles, secure on-campus exchanges, and effortless trading to help you get what you need, right where you study.
        </p>

        {/* Call to Actions */}
        <div className="hero-section__actions">
          <button 
            onClick={() => navigate('/marketplace')} 
            className="primary-button primary-button--wide"
          >
            Start Buying
          </button>
          
          {/* OPTION A: Navigate directly to Marketplace in current tab */}
          <button 
            onClick={() => navigate('/marketplace')} 
            className="secondary-button secondary-button--accent"
          >
            Browse Items
          </button>

          {/* OPTION B: Open Marketplace in a BRAND NEW browser tab */}
          {/* 
          <button 
            onClick={() => window.open('/marketplace', '_blank')} 
            className="secondary-button secondary-button--accent"
          >
            Browse Items
          </button> 
          */}
        </div>

      </div>
    </div>
  );
}