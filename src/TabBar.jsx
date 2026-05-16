const TABS = [
  { id: 'dojo',     label: 'DOJO'     },
  { id: 'train',    label: 'TRAIN'    },
  { id: 'progress', label: 'PROGRESS' },
  { id: 'themes',   label: 'THEMES'   },
  { id: 'settings', label: 'SETTINGS' },
];

function NinjaTabIcon({ active }) {
  const c = active ? '#2a5020' : '#6a6a5a';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {/* Hood peak */}
      <rect x="9"  y="0" width="6"  height="3" rx="0.5" fill={c}/>
      <rect x="6"  y="2" width="12" height="3" rx="0.5" fill={c}/>
      {/* Head block */}
      <rect x="4"  y="4" width="16" height="11" rx="1"  fill={c}/>
      {/* White headband */}
      <rect x="3"  y="7" width="18" height="3"  rx="0.5" fill={active ? '#ffffff' : '#c8c8bc'}/>
      {/* Gold eyes */}
      <rect x="6"  y="11" width="4" height="2"  rx="0.5" fill="#c09820"/>
      <rect x="14" y="11" width="4" height="2"  rx="0.5" fill="#c09820"/>
      {/* Body */}
      <rect x="3"  y="15" width="18" height="8" rx="1"  fill={c}/>
      {/* Belt stripe */}
      <rect x="3"  y="17" width="18" height="2.5" rx="0.5" fill={active ? 'rgba(255,255,255,0.75)' : 'rgba(200,200,188,0.55)'}/>
    </svg>
  );
}

function SwordsTabIcon({ active }) {
  const c = active ? '#2a5020' : '#6a6a5a';
  const g = active ? '#3a7030' : '#8a8a78';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <line x1="2"  y1="2"  x2="22" y2="22" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="22" y1="2"  x2="2"  y2="22" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Crossguards */}
      <rect x="9.5" y="10" width="5" height="3" rx="1" fill={g}/>
    </svg>
  );
}

function ChartTabIcon({ active }) {
  const c1 = active ? '#5aaa50' : '#9a9a88';
  const c2 = active ? '#3a8030' : '#7a7a68';
  const c3 = active ? '#2a5820' : '#5a5a4a';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="1"   y="16" width="5" height="7"  rx="0.5" fill={c1}/>
      <rect x="9.5" y="10" width="5" height="13" rx="0.5" fill={c2}/>
      <rect x="18"  y="5"  width="5" height="18" rx="0.5" fill={c3}/>
      <rect x="0"   y="23" width="24" height="1.5" rx="0.5" fill={c3}/>
    </svg>
  );
}

function MountainTabIcon({ active }) {
  const c = active ? '#2a5020' : '#6a6a5a';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 24,22 0,22" fill={c}/>
      <polygon points="12,2 16.5,10 7.5,10" fill={active ? 'rgba(255,255,255,0.78)' : 'rgba(220,220,208,0.5)'}/>
    </svg>
  );
}

function GearTabIcon({ active }) {
  const c   = active ? '#2a5020' : '#6a6a5a';
  const bg  = '#f5f0e8'; // --cream
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {angles.map(a => (
        <rect key={a} x="11" y="0.5" width="2" height="5" rx="0.5"
              fill={c} transform={`rotate(${a} 12 12)`}/>
      ))}
      <circle cx="12" cy="12" r="6.5" fill={c}/>
      <circle cx="12" cy="12" r="3.5" fill={bg}/>
    </svg>
  );
}

const ICONS = {
  dojo:     NinjaTabIcon,
  train:    SwordsTabIcon,
  progress: ChartTabIcon,
  themes:   MountainTabIcon,
  settings: GearTabIcon,
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
