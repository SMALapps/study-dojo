import { getRankInfo, RANKS } from './gameLogic';
import TabBar from './TabBar';


const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const BELT_STYLES = {
  'White Belt':  { bg: '#f0ede6', border: '#aea89e', knot: '#ccc8c0' },
  'Yellow Belt': { bg: '#e8c832', border: '#b09010', knot: '#c4a010' },
  'Orange Belt': { bg: '#e07820', border: '#b05010', knot: '#c06010' },
  'Green Belt':  { bg: '#3a7a42', border: '#235a2a', knot: '#2a5a30' },
  'Blue Belt':   { bg: '#2850a8', border: '#1a3480', knot: '#1c3880' },
  'Brown Belt':  { bg: '#804020', border: '#5a2c10', knot: '#5a2c10' },
  'Black Belt':  { bg: '#1c1c1c', border: '#000',    knot: '#383838' },
};

export default function Progress({ stats = {}, onTabChange, onHamburger }) {

  const {
    totalFocusMinutes = 0,
    currentStreak     = 0,
    longestStreak     = 0,
    sessionsCompleted = 0,
    xp                = 0,
    weeklyFocusData   = [0, 0, 0, 0, 0, 0, 0],
  } = stats;

  const totalHrs  = Math.floor(totalFocusMinutes / 60);
  const totalMins = totalFocusMinutes % 60;
  const totalDisplay = totalHrs > 0
    ? `${totalHrs}.${String(Math.round((totalMins / 60) * 10)).padStart(1, '0')}`
    : String(totalMins);
  const totalUnit = totalHrs > 0 ? 'hrs' : 'min';

  const weekMax  = Math.max(...weeklyFocusData, 30); // floor at 30 so empty chart still renders
  const yLabels  = [weekMax, Math.round(weekMax * 0.66), Math.round(weekMax * 0.33)];

  const { current, next, rankXp, rankMax, progress } = getRankInfo(xp);

  return (
    <div className="screen pr-screen">

      <div className="top-nav">
        <button className="hamburger-btn" aria-label="Menu" onClick={onHamburger}>
          <span /><span /><span />
        </button>
        <span className="app-title">PROGRESS</span>
        <div className="xp-badge">
          <span className="flame">🔥</span>
          <span className="xp-num">{xp} XP</span>
        </div>
      </div>

      <div className="pr-scroll">

        {/* 2×2 stat grid */}
        <div className="pr-stat-grid">
          <div className="pr-stat-card">
            <span className="pr-stat-label">TOTAL FOCUS</span>
            <span className="pr-stat-value">{totalDisplay}</span>
            <span className="pr-stat-unit">{totalUnit}</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">CURRENT STREAK</span>
            <span className="pr-stat-value pr-streak">{currentStreak}</span>
            <span className="pr-stat-unit">days</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">LONGEST STREAK</span>
            <span className="pr-stat-value">{longestStreak}</span>
            <span className="pr-stat-unit">days</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">SESSIONS{'\n'}COMPLETED</span>
            <span className="pr-stat-value">{sessionsCompleted}</span>
            <span className="pr-stat-unit">sessions</span>
          </div>
        </div>

        {/* Focus This Week */}
        <div className="pr-section-card">
          <span className="pr-section-title">FOCUS THIS WEEK</span>
          <div className="pr-chart">
            <div className="pr-chart-yaxis">
              {yLabels.map((v, i) => <span key={i}>{v}</span>)}
            </div>
            <div className="pr-chart-bars">
              {weeklyFocusData.map((mins, i) => (
                <div key={i} className="pr-bar-col">
                  <div className="pr-bar-track">
                    <div
                      className="pr-bar-fill"
                      style={{ height: `${(mins / weekMax) * 100}%` }}
                    />
                  </div>
                  <span className="pr-bar-label">{DAY_LABELS[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rank Progress */}
        <div className="pr-section-card">
          <span className="pr-section-title">RANK PROGRESS</span>
          <div className="pr-rank-row">
            <div className="pr-rank-side">
              <span className="pr-rank-eyebrow">CURRENT RANK</span>
              <span className="pr-rank-name">{current.name}</span>
              <span className="pr-rank-xp">{rankXp} / {rankMax ?? rankXp} XP</span>
              <div className="pr-rank-bar-track">
                <div className="pr-rank-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="pr-rank-center">
              <span className="pr-rank-avatar">🥷</span>
            </div>
            <div className="pr-rank-side pr-rank-next">
              <span className="pr-rank-eyebrow">NEXT RANK</span>
              <span className="pr-rank-name">{next ? next.name : 'MAX RANK'}</span>
            </div>
          </div>
        </div>

        {/* Belt Journey */}
        <div className="pr-section-card pr-belts-card">
          <span className="pr-section-title">BELT JOURNEY</span>
          <div className="pr-belts">
            {RANKS.map((rank) => {
              const style  = BELT_STYLES[rank.name] || BELT_STYLES['White Belt'];
              const active = rank.name === current.name;
              return (
                <div key={rank.name} className={`pr-belt-item${active ? ' pr-belt-active' : ''}`}>
                  {active
                    ? <div className="pr-belt-marker" />
                    : <div className="pr-belt-spacer" />
                  }
                  <div
                    className="pr-belt-strip"
                    style={{ background: style.bg, borderColor: style.border }}
                  >
                    <div className="pr-belt-knot" style={{ background: style.knot }} />
                  </div>
                  <span className="pr-belt-label">{rank.name.replace(' Belt', '')}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <TabBar activeId="progress" onTabChange={onTabChange} />
    </div>
  );
}
