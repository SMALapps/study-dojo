const TABS = [
  { id: 'dojo',     label: 'DOJO'     },
  { id: 'train',    label: 'TRAIN'    },
  { id: 'progress', label: 'PROGRESS' },
  { id: 'themes',   label: 'THEMES'   },
  { id: 'settings', label: 'SETTINGS' },
];

// Shared palette — mirrors CSS vars
const A = '#3a6030'; // active  (--tab-active)
const I = '#7a7a68'; // inactive (muted olive-gray)

// ── Dojo: torii gate ──────────────────────────────────────────────────────────
function DojoIcon({ active }) {
  const c = active ? A : I;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Upswept end caps on top beam */}
      <rect x="0"  y="2" width="5" height="3" rx="0.5" fill={c}/>
      <rect x="19" y="2" width="5" height="3" rx="0.5" fill={c}/>
      {/* Top crossbeam */}
      <rect x="0"  y="4" width="24" height="3" rx="0.5" fill={c}/>
      {/* Lower crossbeam */}
      <rect x="4"  y="9" width="16" height="2.5" rx="0.5" fill={c}/>
      {/* Left pillar */}
      <rect x="5"  y="11" width="3" height="12" rx="0.5" fill={c}/>
      {/* Right pillar */}
      <rect x="16" y="11" width="3" height="12" rx="0.5" fill={c}/>
    </svg>
  );
}

// ── Train: crossed bokken in ready stance ─────────────────────────────────────
// Rotated ±22° (44° total spread) so tips fan upward and handles angle down —
// reads as sparring/training, not a close/cancel X.
function TrainIcon({ active }) {
  const c = active ? A : I;
  const g = active ? '#5a8050' : '#9a9a88'; // tsuba guard — slightly lighter
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Bokken 1: leaning left */}
      <g transform="rotate(-22 12 12)">
        <rect x="11" y="1"  width="2" height="13" rx="0.8" fill={c}/>
        <rect x="8"  y="13" width="8" height="2"  rx="0.8" fill={g}/>
        <rect x="11" y="15" width="2" height="7"  rx="0.8" fill={c}/>
      </g>
      {/* Bokken 2: leaning right */}
      <g transform="rotate(22 12 12)">
        <rect x="11" y="1"  width="2" height="13" rx="0.8" fill={c}/>
        <rect x="8"  y="13" width="8" height="2"  rx="0.8" fill={g}/>
        <rect x="11" y="15" width="2" height="7"  rx="0.8" fill={c}/>
      </g>
    </svg>
  );
}

// ── Progress: three ascending bars with baseline ───────────────────────────────
function ProgressIcon({ active }) {
  const c1 = active ? '#6ab85e' : '#aaa898'; // short bar  — lightest
  const c2 = active ? '#4a8a3e' : '#8a8878'; // mid bar
  const c3 = active ? A        : '#6a6a58'; // tall bar   — darkest
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="1"   y="17" width="5" height="6"  rx="0.5" fill={c1}/>
      <rect x="9.5" y="11" width="5" height="12" rx="0.5" fill={c2}/>
      <rect x="18"  y="5"  width="5" height="18" rx="0.5" fill={c3}/>
      {/* Baseline */}
      <rect x="0" y="23" width="24" height="1.5" rx="0.5" fill={c3}/>
    </svg>
  );
}

// ── Themes: mountain landscape with sun ───────────────────────────────────────
function ThemesIcon({ active }) {
  const c    = active ? A        : I;
  const snow = active ? 'rgba(255,255,255,0.92)' : 'rgba(210,208,198,0.7)';
  const sun  = active ? '#c09820' : '#9a9888';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Sun */}
      <circle cx="19" cy="5" r="3" fill={sun}/>
      {/* Mountain body */}
      <polygon points="1,23 12,3 23,23" fill={c}/>
      {/* Snow cap */}
      <polygon points="12,3 15.5,11 8.5,11" fill={snow}/>
    </svg>
  );
}

// ── Settings: 8-tooth pixel gear ──────────────────────────────────────────────
function SettingsIcon({ active }) {
  const c  = active ? A       : I;
  const bg = '#faf7f0'; // --card-bg, matches tab bar background
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {teeth.map(a => (
        <rect key={a} x="11" y="0.5" width="2" height="5.5" rx="0.5"
              fill={c} transform={`rotate(${a} 12 12)`}/>
      ))}
      <circle cx="12" cy="12" r="6.5" fill={c}/>
      <circle cx="12" cy="12" r="3.5" fill={bg}/>
    </svg>
  );
}

const ICONS = {
  dojo:     DojoIcon,
  train:    TrainIcon,
  progress: ProgressIcon,
  themes:   ThemesIcon,
  settings: SettingsIcon,
};

export default function TabBar({ activeId, onTabChange }) {
  const activeIdx        = TABS.findIndex(t => t.id === activeId);
  const tabUnderlineLeft = `calc(${activeIdx} * 20% + 10% - 14px)`;

  return (
    <div className="tab-bar">
      {TABS.map((tab) => {
        const Icon     = ICONS[tab.id];
        const isActive = tab.id === activeId;
        return (
          <div
            key={tab.id}
            className={`tab-item${isActive ? ' active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon"><Icon active={isActive}/></span>
            <span className="tab-label">{tab.label}</span>
          </div>
        );
      })}
      <div className="tab-underline" style={{ left: tabUnderlineLeft }} />
      <div className="home-indicator" />
    </div>
  );
}
