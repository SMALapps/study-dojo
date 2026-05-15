const TABS = [
  { id: 'dojo',     label: 'DOJO',     icon: '🥷'  },
  { id: 'train',    label: 'TRAIN',    icon: '⚔️'  },
  { id: 'progress', label: 'PROGRESS', icon: '📊'  },
  { id: 'themes',   label: 'THEMES',   icon: '🏔️' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙️'  },
];

const WEEK_DATA = [
  { day: 'M', mins: 45 },
  { day: 'T', mins: 30 },
  { day: 'W', mins: 60 },
  { day: 'T', mins: 25 },
  { day: 'F', mins: 90 },
  { day: 'S', mins: 70 },
  { day: 'S', mins: 55 },
];

const MAX_MINS = 90;

const BELTS = [
  { name: 'White',  bg: '#f0ede6', border: '#c0bdb0', active: true  },
  { name: 'Yellow', bg: '#e8c832', border: '#b89810', active: false },
  { name: 'Orange', bg: '#e07820', border: '#b05010', active: false },
  { name: 'Green',  bg: '#3a7a42', border: '#2a5a30', active: false },
  { name: 'Blue',   bg: '#2850a8', border: '#1c3880', active: false },
  { name: 'Brown',  bg: '#7a4020', border: '#5a2c10', active: false },
  { name: 'Black',  bg: '#181818', border: '#000',    active: false },
];

export default function Progress({ onTabChange }) {
  const activeIdx = 2; // progress is index 2
  const tabUnderlineLeft = `calc(${activeIdx} * 20% + 10% - 14px)`;

  return (
    <div className="screen pr-screen">

      {/* Header */}
      <div className="top-nav">
        <button className="hamburger-btn" aria-label="Menu">
          <span /><span /><span />
        </button>
        <span className="app-title">PROGRESS</span>
        <div className="xp-badge">
          <span className="flame">🔥</span>
          <span className="xp-num">120 XP</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="pr-scroll">

        {/* 2×2 stat grid */}
        <div className="pr-stat-grid">
          <div className="pr-stat-card">
            <span className="pr-stat-label">TOTAL FOCUS</span>
            <span className="pr-stat-value">18.5</span>
            <span className="pr-stat-unit">hrs</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">CURRENT STREAK</span>
            <span className="pr-stat-value streak-val">6</span>
            <span className="pr-stat-unit">days</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">LONGEST STREAK</span>
            <span className="pr-stat-value">14</span>
            <span className="pr-stat-unit">days</span>
          </div>
          <div className="pr-stat-card">
            <span className="pr-stat-label">SESSIONS COMPLETED</span>
            <span className="pr-stat-value">42</span>
            <span className="pr-stat-unit">completed</span>
          </div>
        </div>

        {/* Focus This Week */}
        <div className="pr-section-card">
          <span className="pr-section-title">FOCUS THIS WEEK</span>
          <div className="pr-chart">
            <div className="pr-chart-yaxis">
              <span>90</span>
              <span>60</span>
              <span>30</span>
            </div>
            <div className="pr-chart-bars">
              {WEEK_DATA.map(({ day, mins }, i) => (
                <div key={i} className="pr-bar-col">
                  <div className="pr-bar-track">
                    <div
                      className="pr-bar-fill"
                      style={{ height: `${(mins / MAX_MINS) * 100}%` }}
                    />
                  </div>
                  <span className="pr-bar-label">{day}</span>
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
              <span className="pr-rank-name">Disciple</span>
              <span className="pr-rank-xp">340 / 600 XP</span>
              <div className="pr-rank-bar-track">
                <div className="pr-rank-bar-fill" style={{ width: '56.7%' }} />
              </div>
            </div>
            <div className="pr-rank-center">
              <span className="pr-rank-avatar">🥷</span>
            </div>
            <div className="pr-rank-side pr-rank-next">
              <span className="pr-rank-eyebrow">NEXT RANK</span>
              <span className="pr-rank-name">Shinobi</span>
            </div>
          </div>
        </div>

        {/* Belt Journey */}
        <div className="pr-section-card">
          <span className="pr-section-title">BELT JOURNEY</span>
          <div className="pr-belts">
            {BELTS.map((belt) => (
              <div key={belt.name} className={`pr-belt-item${belt.active ? ' pr-belt-active' : ''}`}>
                <div
                  className="pr-belt-pip"
                  style={{ background: belt.bg, borderColor: belt.border }}
                />
                <span className="pr-belt-label">{belt.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-bottom-pad" />
      </div>

      {/* Bottom tab bar */}
      <div className="tab-bar">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item${tab.id === 'progress' ? ' active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </div>
        ))}
        <div className="tab-underline" style={{ left: tabUnderlineLeft }} />
        <div className="home-indicator" />
      </div>
    </div>
  );
}
