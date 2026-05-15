import forestImg from './assets/themes/daytime-waterfall/forest-sunbeams.png';

const FEATURES = [
  { icon: '🏔️', label: 'Forest Sunbeams premium theme' },
  { icon: '🌅', label: 'Additional unlockable environments' },
  { icon: '📊', label: 'Advanced focus stats & insights' },
  { icon: '🎋', label: 'Custom session rituals' },
  { icon: '🥷', label: 'Extra ninja outfits & gear' },
  { icon: '🎵', label: 'Premium soundscapes' },
];

export default function PremiumUpsell({ onClose, onStartPremium }) {
  return (
    <div className="screen pu-screen">

      {/* Hero — forest image */}
      <div className="pu-hero">
        <img src={forestImg} alt="Forest Sunbeams" className="pu-hero-img" />
        <div className="pu-hero-overlay" />
      </div>

      {/* Dark card sliding up from bottom */}
      <div className="pu-card">

        {/* Close button */}
        <button className="pu-close" onClick={onClose} aria-label="Close">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 1l9 9M10 1L1 10" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Crown + title */}
        <div className="pu-title-block">
          <span className="pu-crown">👑</span>
          <span className="pu-title-top">FOCUS DOJO</span>
          <span className="pu-title-main">PREMIUM</span>
          <p className="pu-subtitle">
            Unlock deeper focus environments, advanced stats, and more ways to personalize your dojo.
          </p>
        </div>

        {/* Feature list */}
        <ul className="pu-features">
          {FEATURES.map((f, i) => (
            <li key={i} className="pu-feature-item">
              <span className="pu-feature-icon">{f.icon}</span>
              <span className="pu-feature-label">{f.label}</span>
            </li>
          ))}
        </ul>

        {/* Pricing cards */}
        <div className="pu-pricing-row">
          <div className="pu-price-card">
            <span className="pu-price-period">Monthly</span>
            <span className="pu-price-amount">$3.99</span>
            <span className="pu-price-unit">/ mo</span>
          </div>
          <div className="pu-price-card pu-price-card-featured">
            <span className="pu-price-badge">Save 38%</span>
            <span className="pu-price-period">Yearly</span>
            <span className="pu-price-amount">$29.99</span>
            <span className="pu-price-unit">/ yr</span>
          </div>
        </div>

        {/* Buttons */}
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
