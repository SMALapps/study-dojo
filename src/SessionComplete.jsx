import activeBg  from './assets/themes/daytime-waterfall/active-background.png';
import fallbackBg from './assets/themes/daytime-waterfall/background.png';
import ninjaImg   from './assets/ninja/white-belt/meditating.png';
import { getRankInfo } from './gameLogic';

const CATEGORY_ICONS = {
  Study: '📖', Work: '💼', Reading: '📚', 'Deep Work': '🎯', Meditation: '🧘',
};

export default function SessionComplete({
  duration      = 25,
  category      = 'Study',
  earnedXp      = 0,
  currentStreak = 0,
  totalXp       = 0,
  onReturnHome,
  onStartAgain,
}) {
  const { current, next, rankXp, rankMax, progress } = getRankInfo(totalXp);

  return (
    <div className="screen sc-screen">

      <div className="sc-scroll">

        <div className="sc-hero">
          <img
            src={activeBg} alt=""
            className="sc-hero-bg"
            onError={e => { e.currentTarget.src = fallbackBg; }}
          />
          <img src={ninjaImg} alt="Meditating ninja" className="sc-hero-ninja" />
        </div>

        <div className="sc-card">

          <h2 className="sc-title">TRAINING COMPLETE!</h2>
          <div className="sc-divider" />

          <div className="sc-stats">
            <div className="sc-stat-row">
              <span className="sc-stat-label"><span className="sc-stat-icon">⏱</span>Focus Time</span>
              <span className="sc-stat-val">{duration} min</span>
            </div>
            <div className="sc-stat-row">
              <span className="sc-stat-label"><span className="sc-stat-icon">{CATEGORY_ICONS[category] || '📖'}</span>Category</span>
              <span className="sc-stat-val">{category}</span>
            </div>
            <div className="sc-stat-row">
              <span className="sc-stat-label"><span className="sc-stat-icon">⚡</span>XP Earned</span>
              <span className="sc-stat-val sc-stat-xp">+{earnedXp} XP</span>
            </div>
            <div className="sc-stat-row">
              <span className="sc-stat-label"><span className="sc-stat-icon">🔥</span>Streak</span>
              <span className="sc-stat-val">{currentStreak} {currentStreak === 1 ? 'day' : 'days'}</span>
            </div>
          </div>

          <div className="sc-divider" />

          <div className="sc-rank">
            <div className="sc-rank-col sc-rank-left">
              <span className="sc-rank-eyebrow">CURRENT RANK</span>
              <span className="sc-rank-name">{current.name}</span>
              <span className="sc-rank-xp">{rankXp} / {rankMax ?? rankXp} XP</span>
              <div className="sc-rank-bar-track">
                <div className="sc-rank-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="sc-rank-col sc-rank-center">
              <span className="sc-rank-star">⭐</span>
              <span className="sc-rank-avatar">🥷</span>
              <span className="sc-rank-avatar-label">{next ? next.name : current.name}</span>
            </div>
            <div className="sc-rank-col sc-rank-right">
              <span className="sc-rank-eyebrow">NEXT RANK</span>
              <span className="sc-rank-name">{next ? next.name : 'MAX RANK'}</span>
              {next && <span className="sc-rank-xp">{next.minXp} XP</span>}
            </div>
          </div>

          <div className="sc-divider" />

          <div className="sc-theme-row">
            <div className="sc-theme-text">
              <span className="sc-theme-eyebrow">Unlockable Theme Nearby</span>
              <span className="sc-theme-name">Forest Sunbeams</span>
              <span className="sc-theme-desc">Reach a 7-day streak or upgrade to Premium to unlock.</span>
            </div>
            <div className="sc-theme-lock">
              <span className="sc-theme-lock-icon">🔒</span>
            </div>
          </div>

          <div className="sc-buttons">
            <button className="sc-btn sc-btn-primary"   onClick={onReturnHome}>RETURN TO DOJO</button>
            <button className="sc-btn sc-btn-secondary" onClick={onStartAgain}>START ANOTHER SESSION</button>
          </div>

        </div>
      </div>

      <div className="as-header sc-header">
        <button className="as-back-btn" onClick={onReturnHome} aria-label="Back">‹</button>
        <div className="as-title-pill sc-pill">SESSION COMPLETE</div>
        <div className="as-xp-badge sc-xp-badge">⚡ <span>+{earnedXp} XP</span></div>
      </div>

    </div>
  );
}
