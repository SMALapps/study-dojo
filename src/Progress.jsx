import { getRankInfo, RANKS, BELT_IMG, todayWeekIndex } from './gameLogic';
import TabBar from './TabBar';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

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

  const weekMax   = Math.max(...weeklyFocusData, 30);
  const yLabels   = [weekMax, Math.round(weekMax * 0.66), Math.round(weekMax * 0.33)];
  const todayIdx  = todayWeekIndex();

  const { current, next, rankXp, rankMax, progress } = getRankInfo(xp);
  const currentRankIdx = RANKS.findIndex(r => r.name === current.name);
  const xpToNext = next && rankMax ? rankMax - rankXp : null;

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

        {/* ── 2×2 Stat grid ── */}
        <div className="pr-stat-grid">
          <div className="pr-stat-card">
            <span className="pr-stat-label">TOTAL{'\n'}FOCUS</span>
            <span className="pr-stat-value">{totalDisplay}</span>
            <span className="pr-stat-unit">{totalUnit}</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">CURRENT{'\n'}STREAK</span>
            <span className="pr-stat-value pr-streak">{currentStreak}</span>
            <span className="pr-stat-unit">days</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">LONGEST{'\n'}STREAK</span>
            <span className="pr-stat-value">{longestStreak}</span>
            <span className="pr-stat-unit">days</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">SESSIONS{'\n'}DONE</span>
            <span className="pr-stat-value">{sessionsCompleted}</span>
            <span className="pr-stat-unit">sessions</span>
          </div>
        </div>

        {/* ── Focus This Week ── */}
        <div className="pr-section-card">
          <span className="pr-section-title">FOCUS THIS WEEK</span>
          <div className="pr-chart">
            <div className="pr-chart-yaxis">
              {yLabels.map((v, i) => <span key={i}>{v}</span>)}
            </div>
            <div className="pr-chart-bars">
              {weeklyFocusData.map((mins, i) => (
                <div key={i} className={`pr-bar-col${i === todayIdx ? ' pr-bar-today' : ''}`}>
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

        {/* ── Rank Progress ── */}
        <div className="pr-section-card">
          <span className="pr-section-title">RANK PROGRESS</span>
          <div className="pr-rank-row">

            {/* Current belt */}
            <div className="pr-rank-belt-col">
              <img
                src={BELT_IMG[current.name] ?? BELT_IMG['White Belt']}
                alt={current.name}
                className="pr-rank-belt-img"
              />
              <span className="pr-rank-eyebrow">CURRENT</span>
              <span className="pr-rank-name">{current.name.replace(' Belt', '')}</span>
            </div>

            {/* Progress bar + XP info */}
            <div className="pr-rank-mid">
              <div className="pr-rank-bar-track">
                <div className="pr-rank-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="pr-rank-xp">{rankXp} / {rankMax ?? rankXp} XP</span>
              {xpToNext !== null && (
                <span className="pr-rank-to-next">{xpToNext} XP to go</span>
              )}
            </div>

            {/* Next belt */}
            <div className="pr-rank-belt-col pr-rank-belt-col-next">
              <img
                src={BELT_IMG[next ? next.name : current.name] ?? BELT_IMG['Black Belt']}
                alt={next ? next.name : 'Max Rank'}
                className="pr-rank-belt-img"
              />
              <span className="pr-rank-eyebrow">NEXT</span>
              <span className="pr-rank-name">{next ? next.name.replace(' Belt', '') : 'MAX'}</span>
            </div>

          </div>
        </div>

        {/* ── Belt Journey ── */}
        <div className="pr-section-card pr-belts-card">
          <span className="pr-section-title">BELT JOURNEY</span>
          <div className="pr-belts">
            {RANKS.map((rank, i) => {
              const isActive = i === currentRankIdx;
              const isEarned = i < currentRankIdx;
              const isLocked = i > currentRankIdx;
              return (
                <div
                  key={rank.name}
                  className={[
                    'pr-belt-item',
                    isActive ? 'pr-belt-active' : '',
                    isEarned ? 'pr-belt-earned' : '',
                    isLocked ? 'pr-belt-locked' : '',
                  ].join(' ').trim()}
                >
                  {isActive
                    ? <div className="pr-belt-marker" />
                    : <div className="pr-belt-spacer" />
                  }
                  <div className="pr-belt-frame">
                    <img
                      src={BELT_IMG[rank.name]}
                      alt={rank.name}
                      className="pr-belt-png"
                    />
                  </div>
                  <span className="pr-belt-label">{rank.name.replace(' Belt', '')}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pr-bottom-pad" />
      </div>

      <TabBar activeId="progress" onTabChange={onTabChange} />
    </div>
  );
}
