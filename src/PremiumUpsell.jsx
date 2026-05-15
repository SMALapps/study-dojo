import forestImg from './assets/themes/daytime-waterfall/forest-sunbeams.png';

const FEATURES = [
  { icon: '🏔️', label: 'Forest Sunbeams premium theme'         },
  { icon: '🌿', label: 'Additional unlockable environments'     },
  { icon: '📊', label: 'Advanced focus stats'                   },
  { icon: '🎯', label: 'Custom session rituals'                 },
  { icon: '🥷', label: 'Extra ninja outfits'                    },
  { icon: '🎵', label: 'Premium soundscapes'                    },
];

export default function PremiumUpsell({ onClose, onStartPremium }) {
  return (
    <div className="screen pu-screen">

      {/* Hero image — forest sunbeams preview */}
      <div className="pu-hero">
        <img src={forestImg} alt="Forest Sunbeams" className="pu-hero-img" />
        <div className="pu-hero-overlay" />

        {/* Close button */}
        <button className="pu-close" onClick={onClose} aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable content card */}
      <div className="pu-scroll">

        {/* Crown + Title */}
        <div className="pu-title-block">
          <span className="pu-crown">👑</span>
          <span className="pu-title-top">FOCUS DOJO</span>
          <span className="pu-title-main">PREMIUM</span>
        </div>

        <p className="pu-subtitle">
          Unlock deeper focus environments, advanced stats, and more ways to personalize your dojo.
        </p>

        {/* Feature list */}
        <div className="pu-features">
          {FEATURES.map(({ icon, label }) => (
            <div key={label} className="pu-feature-row">
              <span className="pu-feature-icon">{icon}</span>
              <span className="pu-feature-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Pricing row */}
        <div className="pu-pricing-row">
          <div className="pu-price-card">
            <span className="pu-price-period">MONTHLY</span>
            <span className="pu-price-amount">$3.99</span>
          </div>
          <div className="pu-price-card pu-price-featured">
            <span className="pu-price-save">Save 38%</span>
            <span className="pu-price-period">YEARLY</span>
            <span className="pu-price-amount">$29.99</span>
          </div>
        </div>

        {/* CTA buttons */}
        <button className="pu-btn-primary" onClick={onStartPremium}>
          START PREMIUM
        </button>
        <button className="pu-btn-secondary" onClick={onClose}>
          MAYBE LATER
        </button>

      </div>
    </div>
  );
}
