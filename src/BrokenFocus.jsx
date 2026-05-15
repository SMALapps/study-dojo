import activeBg  from './assets/themes/daytime-waterfall/active-background.png';
import fallbackBg from './assets/themes/daytime-waterfall/background.png';
import ninjaImg   from './assets/ninja/white-belt/meditating.png';

export default function BrokenFocus({
  timeFocused = 11,
  goal        = 25,
  onTryAgain,
  onReturnHome,
}) {
  return (
    <div className="screen bf-screen">

      {/* Single scroll column — hero + card travel together */}
      <div className="bf-scroll">

        {/* Hero: same waterfall, dark overlay for moody broken state */}
        <div className="bf-hero">
          <img
            src={activeBg} alt=""
            className="bf-hero-bg"
            onError={e => { e.currentTarget.src = fallbackBg; }}
          />
          {/* Dark blue-grey tint — conveys interruption without going black */}
          <div className="bf-hero-overlay" />
          <img src={ninjaImg} alt="Meditating ninja" className="bf-hero-ninja" />
        </div>

        {/* Cream card */}
        <div className="bf-card">
          <h2 className="bf-card-title">FOCUS BROKEN</h2>
          <div className="bf-card-divider" />
          <p className="bf-card-body">
            You stepped away from the waterfall.{'\n'}
            Return when you're ready to train again.
          </p>
          <div className="bf-card-divider" />

          <div className="bf-stats">
            <div className="bf-stat-row">
              <span className="bf-stat-label"><span className="bf-stat-icon">⏱</span>Time Focused</span>
              <span className="bf-stat-val">{timeFocused} min</span>
            </div>
            <div className="bf-stat-row">
              <span className="bf-stat-label"><span className="bf-stat-icon">🎯</span>Goal</span>
              <span className="bf-stat-val">{goal} min</span>
            </div>
            <div className="bf-stat-row">
              <span className="bf-stat-label"><span className="bf-stat-icon">🔥</span>XP Earned</span>
              <span className="bf-stat-val bf-stat-xp">+20 XP</span>
            </div>
          </div>

          <div className="bf-buttons">
            <button className="bf-btn bf-btn-primary"   onClick={onTryAgain}>TRY AGAIN</button>
            <button className="bf-btn bf-btn-secondary" onClick={onReturnHome}>RETURN TO DOJO</button>
          </div>
        </div>
      </div>

      {/* Header — fixed overlay above scroll */}
      <div className="as-header bf-header">
        <button className="as-back-btn" onClick={onReturnHome} aria-label="Back">‹</button>
        <div className="as-title-pill bf-pill">FOCUS BROKEN</div>
        <div className="as-xp-badge bf-xp-badge">🔥 <span>+20 XP</span></div>
      </div>

    </div>
  );
}
