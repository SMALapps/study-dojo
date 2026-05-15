import { useState } from 'react';

const TABS = [
  { id: 'dojo',     label: 'DOJO',     icon: '🥷'  },
  { id: 'train',    label: 'TRAIN',    icon: '⚔️'  },
  { id: 'progress', label: 'PROGRESS', icon: '📊'  },
  { id: 'themes',   label: 'THEMES',   icon: '🏔️' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙️'  },
];

function Toggle({ on, onChange }) {
  return (
    <button
      className={`sg-toggle${on ? ' sg-toggle-on' : ''}`}
      onClick={() => onChange(!on)}
      aria-pressed={on}
    >
      <span className="sg-toggle-thumb" />
    </button>
  );
}

function ChevronRight() {
  return (
    <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Settings({ xp = 0, onTabChange, onHamburger }) {
  const activeIdx = 4;
  const tabUnderlineLeft = `calc(${activeIdx} * 20% + 10% - 14px)`;

  const [autoBreaks,     setAutoBreaks]     = useState(true);
  const [trainingRem,    setTrainingRem]    = useState(true);
  const [streakRem,      setStreakRem]      = useState(true);
  const [sessionAlerts,  setSessionAlerts]  = useState(true);
  const [darkMode,       setDarkMode]       = useState(false);
  const [haptics,        setHaptics]        = useState(true);
  const [ambience,       setAmbience]       = useState(true);
  const [reducedMotion,  setReducedMotion]  = useState(false);

  return (
    <div className="screen sg-screen">

      {/* Header */}
      <div className="top-nav">
        <button className="hamburger-btn" aria-label="Menu" onClick={onHamburger}>
          <span /><span /><span />
        </button>
        <span className="app-title">SETTINGS</span>
        <div className="xp-badge">
          <span className="flame">🔥</span>
          <span className="xp-num">{xp} XP</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="sg-scroll">

        {/* ── Session Preferences ── */}
        <span className="sg-section-label">Session Preferences</span>
        <div className="sg-card">
          <div className="sg-row">
            <span className="sg-row-label">Default Duration</span>
            <span className="sg-row-value">25 min <ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Default Difficulty</span>
            <span className="sg-row-value">Disciplined <ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Auto-start breaks</span>
            <Toggle on={autoBreaks} onChange={setAutoBreaks} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Soundscape</span>
            <span className="sg-row-value">Waterfall <ChevronRight /></span>
          </div>
        </div>

        {/* ── Notifications ── */}
        <span className="sg-section-label">Notifications</span>
        <div className="sg-card">
          <div className="sg-row">
            <span className="sg-row-label">Training reminders</span>
            <Toggle on={trainingRem} onChange={setTrainingRem} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Streak reminders</span>
            <Toggle on={streakRem} onChange={setStreakRem} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Session complete alerts</span>
            <Toggle on={sessionAlerts} onChange={setSessionAlerts} />
          </div>
        </div>

        {/* ── Experience ── */}
        <span className="sg-section-label">Experience</span>
        <div className="sg-card">
          <div className="sg-row">
            <span className="sg-row-label">Dark Mode</span>
            <Toggle on={darkMode} onChange={setDarkMode} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Haptics</span>
            <Toggle on={haptics} onChange={setHaptics} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Waterfall Ambience</span>
            <Toggle on={ambience} onChange={setAmbience} />
          </div>
          <div className="sg-divider" />
          <div className="sg-row">
            <span className="sg-row-label">Reduced Motion</span>
            <Toggle on={reducedMotion} onChange={setReducedMotion} />
          </div>
        </div>

        {/* ── Account ── */}
        <span className="sg-section-label">Account</span>
        <div className="sg-card">
          <div className="sg-row sg-row-tappable">
            <span className="sg-row-label">Profile</span>
            <span className="sg-row-chevron"><ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row sg-row-tappable">
            <span className="sg-row-label">Sync Progress</span>
            <span className="sg-row-chevron"><ChevronRight /></span>
          </div>
          <div className="sg-divider" />
          <div className="sg-row sg-row-tappable">
            <span className="sg-row-label">Help &amp; Support</span>
            <span className="sg-row-chevron"><ChevronRight /></span>
          </div>
        </div>

        <div className="sg-bottom-pad" />
      </div>

      {/* Bottom tab bar */}
      <div className="tab-bar">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item${tab.id === 'settings' ? ' active' : ''}`}
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
