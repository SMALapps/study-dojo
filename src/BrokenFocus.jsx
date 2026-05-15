import activeBg  from './assets/themes/daytime-waterfall/active-background.png';
import fallbackBg from './assets/themes/daytime-waterfall/background.png';
import ninjaImg   from './assets/ninja/white-belt/meditating.png';

export default function BrokenFocus({
  duration    = 25,
  timeFocused = 0,
  earnedXp    = 0,
  onTryAgain,
  onReturnHome,
}) {
  return (
    <div className="screen bf-screen">

      <div className="bf-scroll">

        <div className="bf-hero">
          <img
            src={activeBg} alt=""
            className="bf-hero-bg"
            onError={e => { e.currentTarget.src = fallbackBg; }}
          />
          <div className="bf-hero-overlay" />
          <img src={ninjaImg} alt="Meditating ninja" className="bf-hero-ninja" />
        </div>

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
              <span className="bf-stat-val">{duration} min</span>
            </div>
            <div className="bf-stat-row">
              <span className="bf-stat-label"><span className="bf-stat-icon">⚡</span>XP Earned</span>
              <span className="bf-stat-val bf-stat-xp">+{earnedXp} XP</span>
            </div>
          </div>

          <div className="bf-buttons">
            <button className="bf-btn bf-btn-primary"   onClick={onTryAgain}>TRY AGAIN</button>
            <button className="bf-btn bf-btn-secondary" onClick={onReturnHome}>RETURN TO DOJO</button>
          </div>
        </div>
      </div>

      <div className="as-header bf-header">
        <button className="as-back-btn" onClick={onReturnHome} aria-label="Back">‹</button>
        <div className="as-title-pill bf-pill">FOCUS BROKEN</div>
        <div className="as-xp-badge bf-xp-badge">⚡ <span>+{earnedXp} XP</span></div>
      </div>

    </div>
  );
}
