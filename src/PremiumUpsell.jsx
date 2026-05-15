import forestImg from './assets/themes/daytime-waterfall/forest-sunbeams.png';

export default function PremiumUpsell({ onClose, onStartPremium }) {
  return (
    <div className="screen pu-screen">

      {/* Hero — forest image with header overlay */}
      <div className="pu-hero">
        <img src={forestImg} alt="Forest Sunbeams" className="pu-hero-img" />
        <div className="pu-hero-overlay" />

        {/* Header overlaid on image */}
        <div className="pu-header">
          <div className="pu-header-text">
            <span className="pu-header-title">FOREST SUNBEAMS</span>
            <span className="pu-header-sub">Premium Focus Environment</span>
          </div>
          <button className="pu-close" onClick={onClose} aria-label="Close">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M1 1l9 9M10 1L1 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Cream content card */}
      <div className="pu-card">

        <p className="pu-desc">
          Train inside a quiet forest grove where sunlight cuts through the canopy and the waterfall fades into the trees.
        </p>

        <div className="pu-divider" />
        <span className="pu-unlock-header">UNLOCK OPTIONS</span>

        {/* Option 1 — Premium (highlighted) */}
        <div className="pu-option pu-option-premium">
          <span className="pu-option-icon">👑</span>
          <span className="pu-option-label">Unlock with Premium</span>
        </div>

        {/* Option 2 — Streak */}
        <div className="pu-option pu-option-streak">
          <span className="pu-option-icon">🔥</span>
          <div className="pu-streak-content">
            <span className="pu-option-label">Or unlock with a 7-day focus streak</span>
            <div className="pu-streak-bar-track">
              <div className="pu-streak-bar-fill" style={{ width: '85.7%' }} />
            </div>
            <span className="pu-streak-count">6 / 7 days</span>
          </div>
        </div>

        <button className="pu-btn-primary" onClick={onStartPremium}>
          START PREMIUM
        </button>
        <button className="pu-btn-secondary" onClick={onClose}>
          KEEP TRAINING
        </button>

      </div>
    </div>
  );
}
